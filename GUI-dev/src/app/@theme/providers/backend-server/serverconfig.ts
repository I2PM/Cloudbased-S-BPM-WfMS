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
  private _addRoleToUser = `${this._host}api/user`;
  private _deleteRole = `${this._host}api/roles`;
  private _createOrganization = `${this._host}api/organization`;
  private _editOrganization = `${this._host}api/organization`;
  private _getRolesOfOrganization = `${this._host}api/organization`;
  private _getRules = `${this._host}api/rules`;
  private _getRoles = `${this._host}api/roles`;
  private _createRole = `${this._host}api/roles`;
  private _editRole = `${this._host}api/roles`;
  private _getPublicAndOwnRoles = `${this._host}api/roles/publicAndOwn`;
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
  private _getPayAsYouGo = `${this._host}api/processes/payasyougo/`;
  private _addPayAsYouGo = `${this._host}api/processes/payasyougo/addEntry/`;
  private _updatePayAsYouGoEntry = `${this._host}api/processes/payasyougo/updateEntry/`;


  public get checkIfMailTaken(): string {return this._checkIfMailTaken};
  public get getUser(): string {return this._getUser};
  public get getProcess(): string {return this._getProcess};
  public get getOrgProcesses(): string {return this._getOrgProcesses};
  public get getStoreProcesses(): string {return this._getStoreProcesses};
  public get getStoreProcessRatings(): string {return this._getOrPostStoreProcessRatings};
  public get postStoreProcessRating(): string {return this._getOrPostStoreProcessRatings};
  public get uploadOWL(): string {return this._uploadOWL};
  public get createProcess(): string {return this._createProcess};
  public get createRole(): string {return this._createRole};
  public get editRole(): string {return this._editRole};
  public get mapProcessModelIdToProcessStoreId(): string {return this._mapProcessModelIdToProcessStoreId};


  public get getUserProcesses(): string {return this._getUserProcesses};
  public get getProcessById(): string {return this._getProcessById};
  public get getApprovedProcessesByUser(): string {return this._getApprovedProcessesByUser};
  public get getNotApprovedProcessesByUser(): string {return this._getNotApprovedProcessesByUser};

  public get createOrganization(): string {    return this._createOrganization  };
  public get addRoleToUser(): string {    return this._addRoleToUser  };
  public get deleteRole(): string {    return this._deleteRole  };

  public get getProcessFile(): string {return this._getProcessFile};


  public get editOrganization(): string {
    return this._editOrganization
  };

  public get getApprovedProcesses(): string {return this._getApprovedProcesses};
  public get createOrganizaion(): string {return this._createOrganization};
  public get getOrgaProcesses(): string {return this._getOrgaProcesses};
  public get getUnapprovedStoreProcesses(): string {return this._getUnapprovedStoreProcesses};
  public get postStoreProcessApproved(): string {return this._postStoreProcessApproved};
  public get postStoreProcessUnapproved(): string {return this._postStoreProcessUnapproved};
  public get getStoreProcessById(): string {return this._getStoreProcessById};
  public get postStoreProcessComment(): string {return this._postStoreProcessComment}
  public get getAverageRating(): string {return this._getAverageRating};
  public get getPayAsYouGo(): string {return this._getPayAsYouGo};
  public get addPayAsYouGo(): string{return this._addPayAsYouGo};
  public get updatePayAsYouGoEntry(): string{return this._updatePayAsYouGoEntry};

  public get getUsersOfMyOrg(): string {
    return this._getUsersOfMyOrg
  };
  public get getUserByEmail(): string {return this._getUserByEmail};
  public get getRolesOfOrganization(): string {return this._getRolesOfOrganization};
  public get getRules(): string {return this._getRules};
  public get getRoles(): string {return this._getRoles};
  public get getPublicAndOwnRoles(): string {return this._getPublicAndOwnRoles};
  public get addUserToOrg(): string {return this._addUserToOrg};

}
