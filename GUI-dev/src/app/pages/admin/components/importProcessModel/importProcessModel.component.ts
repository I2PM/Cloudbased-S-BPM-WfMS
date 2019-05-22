import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProcessesService } from '../../../../allProcesses.service';
import * as $ from 'jquery';
import './importModelFormBuilder.loader.ts';
import {GatewayProvider} from "../../../../@theme/providers/backend-server/gateway";
import {User} from "../../../../../models/models";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'ngx-configure',
  styles: [require('./importProcessModel.scss')],
  template: require('./importProcessModel.html'),
  templateUrl: 'importProcessModel.html',
})
export class ImportProcessModel implements OnInit {
  processModel;
  roles;
  error = undefined;
  formBuilder;
  buildedBusinessObjects = {};
  currentSelectedBusinessObject;
  currentSelectedFieldId;
  currentBofms;
  buildedBofps = {};
  success;
  owlFile;
  version = 5;
  processfile;

  constructor(protected service: ProcessesService, private gateway: GatewayProvider) {
  }

  ngOnInit(): void {
    this.processModel = this.service.getCurrentProcessModel();
    console.log(this.processModel);
    this._getProcessFile();
  }

  onFileChange(event) {
    const that = this;
    this.owlFile = event.srcElement.files[0];
    const split = this.owlFile.name.split('.');
    if (split[split.length - 1] !== 'owl') {
      this.owlFile = undefined;
      event.target.value = '';
    }
  }

  _getProcessFile() {
    this.gateway.getProcessFileById(this.processModel.processId)
      .then((processesfile) => {
        this.processfile = processesfile;


        var reader = new FileReader();
        reader.readAsText(this.processfile);
        var that = this;
        reader.onloadend = function() {
          var base64data = reader.result;
          that.processfile = base64data.substr(base64data.indexOf(',')+1);
          console.log(that.processfile);

          that.uploadOWLModel();
        }







      }).catch( (error) =>{
      console.log("Error" + JSON.stringify(error));
    });
  }

  uploadOWLModel(): void {
    const that = this;
    //const reader = new FileReader();
    //if (this.owlFile) {
      //reader.onload = function (e) {
        const body = {owlContent: this.processfile, version: '0.7.2'}
        that.service.uploadOWLModel(body)
          .subscribe(
            data => {
              console.log(data);
              that.processModel = data;
              that.processModel.boms.forEach(businessObject => {
                that.buildedBusinessObjects[businessObject.id] = {};
              });
              that.initRoles();
            },
            err => {
              that.error = 'Die OWL Datei konnte nicht richtig interpretiert werden!';
              console.log(err);
            },
            () => {
            },
          );
      //}
     // reader.readAsText(this.processfile);
   // }
  }

  initRoles(): void {
    const that = this;
    this.gateway.getUser().then( (user) =>
    {
      console.log(user);
        this.gateway.getRolesOfOrganization(user.organization).then( (roles) =>
        {
          console.log(roles);
          console.log(roles[0])
          this.roles = roles;
          that.currentSelectedBusinessObject = that.processModel.boms[0];
          that.initFormBuilder(that.currentSelectedBusinessObject);
        }).catch( (err) =>
        {
          console.log(err);
        });
    }).catch( (err) =>{
        console.log(err);
    });
  }

  /*
  assignRoleIdsToSubjects(processModelResult)
  {
    for (let i = 0; i < processModelResult.subjectModels.length; i++)
    {
      for (let j = 0; j < processModelResult.subjectModels[i].assignedRoles.length; j++)
      {
        let roleId = -1;
        console.log('Role Name: ' + processModelResult.subjectModels[i].assignedRoles[j]);
        const roleName = processModelResult.subjectModels[i].assignedRoles[j];

        for (let x = 0; x < this.roles.length && roleId === -1; x++)
        {
          if (this.roles[x].name === roleName)
            roleId = this.roles[x].roleId;
        }

        if (roleId !== -1)
        {
          processModelResult.subjectModels[i].assignedRoles[j] = roleId;
        }
        console.log('Role ID: ' + roleId);
      }
    }

    return processModelResult;
  }
  */

  uploadProcessModel(form): void {
    const that = this;
    let processModelResult;
    this.getFormData(this.currentSelectedBusinessObject);

    processModelResult = this.processModel;
    processModelResult.bofms = this.getBofms();
    processModelResult.bofps = [];
    Object.keys(this.buildedBofps).forEach(a =>
      processModelResult.bofps = processModelResult.bofps.concat((<any>Object).values(this.buildedBofps[a])));

    console.log(processModelResult);

    //processModelResult = this.assignRoleIdsToSubjects(processModelResult);

    /*
    for (let i = 0; i < processModelResult.subjectModels.length; i++)
    {
      for(let j = 0; j < processModelResult.subjectModels[i].assignedRules.length; j++)
      {
          let roleId = -1;
          console.log('Role Name: ' + processModelResult.subjectModels[i].assignedRules[j]);
          const roleName = processModelResult.subjectModels[i].assignedRules[j];

          for(let x = 0; x < this.rules.length && roleId === -1; x++)
          {
            if(this.rules[x].name===roleName)
              roleId = this.rules[x].roleId;
          }

          if(roleId !== -1)
          {
            processModelResult.subjectModels[i].assignedRules[j]=roleId;
          }
          console.log('Role ID: ' + roleId);
      }
    }*/

    this.service.importProcessModel(processModelResult)
      .subscribe(
        processModelId => {

          console.log('Received data from import Model: '+processModelId);

          if (processModelId !== -1) {

            const another = that;
            this.gateway.getUser().then( (user) => {

              let processStoreModel = this.service.getCurrentProcessModel();
              this.gateway.mapProcessModelToProcess(processStoreModel.processId, processModelId,user.organization.oid);

            });
            that.processModel = undefined;
            that.roles = undefined;
            that.error = undefined;
            that.formBuilder = undefined;
            that.buildedBusinessObjects = {};
            that.currentSelectedBusinessObject = undefined;
            that.currentSelectedFieldId = undefined;
            that.currentBofms = undefined;
            that.buildedBofps = {};
            that.success = 'Das Prozessmodell wurde erfolgreich importiert!';
          } else {
            that.error = 'Das Prozessmodell konnte nicht importiert werden!';
            window.scrollTo(0, 0);
          }
        },
        err => that.error = 'Das Prozessmodell konnte nicht importiert werden!',
        () => console.log('Request Complete'),
      );
  }

  getBofms() {
    const result = [];
    if (this.currentSelectedBusinessObject) {
      for (const bom in this.buildedBusinessObjects) {
        if (Object.keys(this.buildedBusinessObjects[bom]).length > 0) {
          const values = JSON.parse(this.buildedBusinessObjects[bom]);
          values.forEach(value => {
            if (value.type !== 'paragraph') {
              let type;
              switch (value.type) {
                case 'text':
                  type = 'STRING';
                  break;
                case 'number':
                  type = 'NUMBER';
                  break;
                case 'date':
                  type = 'DATE';
                  break;
                case 'checkbox':
                  type = 'CHECKBOX';
                  break;
                default:
                  type = 'STRING';
                  break;
              }
              result.push({
                name: value.label,
                type: type,
                bomId: bom,
                id: value.name,
              })
            }
          });
        }
      }
    }
    return result;
  }

  initFormBuilder(businessObject): void {
    const that = this;
    const options = {
      dataType: 'json', // default: 'xml',
      disableFields: ['autocomplete', 'button', 'checkbox-group', 'file', 'header', 'hidden', 'paragraph', 'select', 'textarea'],
      showActionButtons: false,
      controlPosition: 'left'
    };
    this.formBuilder = (<any>jQuery('.formBuilder')).formBuilder(options); //.data('formBuilder');
    // (<any>jQuery('.formBuilder')).formBuilder(options).data('formBuilder');

    /*//Timeout, otherwise the formData will still be the old value
    document.addEventListener('fieldAdded', function(e){
      setTimeout(function(){
        that.getFormData(that.currentSelectedBusinessObject, true);
      }, 250);
    });
    document.addEventListener('fieldRemoved', function(e){
      setTimeout(function(){
        that.getFormData(that.currentSelectedBusinessObject, true);
      }, 250);
    });*/
  }

  // @ts-ignore
  // @ts-ignore
  getFormData(businessObject, internal?: boolean): void {
    const that = this;
    if (this.currentSelectedBusinessObject !== businessObject) {
      this.buildedBusinessObjects[this.currentSelectedBusinessObject.id] = this.formBuilder.formData;
      let formData = this.buildedBusinessObjects[businessObject.id];
      formData = jQuery.isEmptyObject(formData) ? undefined : formData === '[]' ? undefined : formData;
      if (formData !== undefined && !internal) {
        //This is a necessary thing, otherwise setData will not work correctly
        this.formBuilder.actions.addField(
          {
            'type': 'paragraph',
            'subtype': 'p',
            'label': 'Paragraph',
            'className': 'paragraph',
          },
        );
        this.formBuilder.actions.setData(formData);
      } else {
        this.formBuilder.actions.clearFields();
      }
    } else {
      this.buildedBusinessObjects[businessObject.id] = this.formBuilder.formData;
    }
    this.currentSelectedBusinessObject = businessObject;
    this.currentBofms = this.getBofms().filter(b => b.bomId === this.currentSelectedBusinessObject.id);
    //Add new fields
    const allBofms = this.getBofms();
    allBofms.forEach(field => {
      const boms = that.processModel.boms.filter(bom => bom.id === field.bomId);
      if (!that.buildedBofps[field.id]) {
        that.buildedBofps[field.id] = {};
        boms.forEach(bom => {
          bom.stateIds.forEach(stateId => {
            that.buildedBofps[field.id][stateId] = {
              read: true,
              write: true,
              mandatory: false,
              stateId: stateId,
              bofmId: field.id,
            }
          })
        })
      }
    });

    //remove deleted fields
    Object.keys(this.buildedBofps).forEach(fieldId => {
      if (allBofms.filter(b => b.id === fieldId).length < 1) {
        delete this.buildedBofps[fieldId];
      }
    });
  }

  getStateName(stateId): string {
    return this.processModel.states.filter(s => s.id === stateId)[0].name;
  }

  getSubjectModelName(stateId): string {
    const subjectModelId = this.processModel.states.filter(s => s.id === stateId)[0].subjectModelId;
    return this.processModel.subjectModels.filter(sm => sm.id === subjectModelId)[0].name;
  }
}
