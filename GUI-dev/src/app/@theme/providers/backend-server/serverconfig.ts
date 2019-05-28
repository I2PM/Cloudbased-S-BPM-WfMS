import { Injectable } from '@angular/core';

@Injectable()
export class ServerConfigProvider {
  private _host = 'http://localhost:10000/';
  private _checkIfMailTaken = `${this._host}user/register/checkIfMailTaken/`;
  private _getUser = `${this._host}api/me/`;
  private _getProcess = `${this._host}api/store/process/`;
  private _getOrgProcesses = `${this._host}api/store/processes/byOrga/`;
  private _getStoreProcesses = `${this._host}api/store/processes`;
  private _getOrPostStoreProcessRatings = `${this._host}api/store/processRating`;
  private _uploadOWL = `${this._host}api/store/process/`;
  private _mapProcessModelIdToProcessStoreId = `${this._host}api/store/process/map`;
  private _createProcess = `${this._host}api/store/process/create`;
  private _getUserProcesses = `${this._host}api/store/processes/byUser`;
  private _getProcessById = `${this._host}api/store/process/{processId}`;
  private _getApprovedProcessesByUser = `${this._host}api/store/processes/approved`;
  private _getNotApprovedProcessesByUser = `${this._host}api/store/processes/notApproved`;
  private _getApprovedProcesses = `${this._host}api/store/processes/approved`;
  private _createOrganization = `${this._host}api/organization`;
  private _editOrganization = `${this._host}api/organization`;
  private _getRolesOfOrganization = `${this._host}api/organization`;
  private _getOrgaProcesses = `${this._host}api/store/processes/byOrga`;
  private _getUsersOfMyOrg = `${this._host}api/user/myOrg`;
  private _getProcessFile = `${this._host}api/store/process/`;

  private _getUnapprovedStoreProcesses = `${this._host}api/store/processes/notApproved`;
  private _postStoreProcessApproved = `${this._host}api/store/process`;
  private _postStoreProcessUnapproved = `${this._host}api/store/process`;
  private _getStoreProcessById = `${this._host}api/store/process`;
  private _postStoreProcessComment = `${this._host}api/store/process`;
  private _getAverageRating = `${this._host}api/store/processRating`;
  private _addUserToOrg = `${this._host}api/user`;
  private _getUserByEmail = `${this._host}api/user/getUserByEmail`;
  private _getRolesOfOrganization = `${this._host}api/organization`;
  public get checkIfMailTaken(): string {return this._checkIfMailTaken};
  public get getUser(): string {return this._getUser};
  public get getProcess(): string {return this._getProcess};
  public get getOrgProcesses(): string {return this._getOrgProcesses};
  public get getStoreProcesses(): string {return this._getStoreProcesses};
  public get getStoreProcessRatings(): string {return this._getOrPostStoreProcessRatings};
  public get postStoreProcessRating(): string {return this._getOrPostStoreProcessRatings};
  public get uploadOWL(): string {return this._uploadOWL};
  public get createProcess(): string {return this._createProcess};
  public get mapProcessModelIdToProcessStoreId(): string {return this._mapProcessModelIdToProcessStoreId};

  public get getUserProcesses(): string {return this._getUserProcesses};
  public get getProcessById(): string {return this._getProcessById};
  public get getApprovedProcessesByUser(): string {return this._getApprovedProcessesByUser};
  public get getApprovedProcesses(): string {return this._getApprovedProcesses};
  public get getNotApprovedProcessesByUser(): string {return this._getNotApprovedProcessesByUser};

  public get createOrganization(): string {    return this._createOrganization  };
  public get getRolesOfOrganization(): string {    return this._getRolesOfOrganization  };

  public get getProcessFile(): string {return this._getProcessFile};


  public get editOrganization(): string {
    return this._editOrganization
  };
  public get getOrgaProcesses(): string {return this._getOrgaProcesses};

  public get getUnapprovedStoreProcesses(): string {return this._getUnapprovedStoreProcesses};
  public get postStoreProcessApproved(): string {return this._postStoreProcessApproved};
  public get postStoreProcessUnapproved(): string {return this._postStoreProcessUnapproved};
  public get getStoreProcessById(): string {return this._getStoreProcessById};
  public get postStoreProcessComment(): string {return this._postStoreProcessComment}
  public get getAverageRating(): string {return this._getAverageRating};

  public get getUsersOfMyOrg(): string {
    return this._getUsersOfMyOrg
  };
  public get getUserByEmail(): string {return this._getUserByEmail};
  public get getRolesOfOrganization(): string {return this._getRolesOfOrganization};
  public get addUserToOrg(): string {return this._addUserToOrg};

}
