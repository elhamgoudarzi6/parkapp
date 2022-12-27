import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:3368/api/v1/admin/';

  constructor(private http: HttpClient) { }

  login(data: any): any {
    return this.http.post(this.baseUrl + 'loginAdmin', data);
  }

  getToken(id: string): any {
    let body = {
      SecretKey: 'sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U',
    };
    return this.http.post(this.baseUrl + 'getToken/' + id, body);
  }

  //#region Files
  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  uploadFiles(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }

  deleteFile(data: any): any {
    return this.http.post(this.baseUrl + 'deleteFile', data);
  }
  //#endregion


  //#region Admins
  getAllAdmins(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllAdmin', { params });
  }
  getAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    // const params = new HttpParams({ fromObject: { token: token, id: id } })
    return this.http.get(this.baseUrl + 'getAdmin/' + id, { params });
  }
  addAdmin(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerAdmin', data, { params });
  }
  updateAdmin(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateAdmin/' + id, data, { params });
  }
  deleteAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteAdmin/' + id, { params });
  }
  changePassword(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changePassword/' + id, data, { params });
  }
  changeUsername(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changeUsername/' + id, data, { params });
  }
  resetPassword(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + '/resetPassword', data, { params });
  }
  //#endregion

  //#region Unit
  getAllUnit(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllUnit', { params });
  }
  getUnit(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUnit/' + id, { params });
  }
  registerUnit(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerUnit', data, { params });
  }
  updateUnit(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUnit/' + id, data, { params });
  }
  deleteUnit(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteUnit/' + id, { params });
  }
  advanceSearchUnit(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'advanceSearchUnit', data, { params });
  }
  //#endregion


  //#region PaidLoan
  getAllPaidLoan(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllPaidLoan', { params });
  }
  getPaidLoan(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getPaidLoan/' + id, { params });
  }
  registerPaidLoan(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerPaidLoan', data, { params });
  }
  updatePaidLoan(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updatePaidLoan/' + id, data, { params });
  }
  deletePaidLoan(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deletePaidLoan/' + id, { params });
  }
  //#endregion


  getTokenSms(): any {
    let data = {
      UserApiKey: 'f2a1c337366e0cd3ddffc337',
      SecretKey: 'it66)%#teBC!@*&',
    };
    return this.http.post('https://RestfulSms.com/api/Token', data);
  }

  sendSms(data: any, token: any): any {
    const headers = {
      'content-type': 'application/json',
      'x-sms-ir-secure-token': token,
    };
    return this.http.post('https://RestfulSms.com/api/UltraFastSend', data, { 'headers': headers });
  }

}
function params(arg0: string, params: any): any {
  throw new Error('Function not implemented.');
}

