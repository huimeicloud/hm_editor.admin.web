import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Base64 } from 'js-base64';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
@Injectable()
export class DatasourceManageService {

  private baseUrl = environment.apiUrl + 'admin-service/datasource';
  private api = environment.apiUrl;
  constructor(private http: Http,  private http1: HttpClient) {

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getDict(text:string,pageNo:number,pageSize:number){
    return this.http1.get(`${this.baseUrl}/dict/getDict?text=${text}&pageSize=${pageSize}&pageNo=${pageNo}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  //编辑值域
  editDict(data): Promise<any> {
    return this.http1.post(`${this.baseUrl}/dict/editorDict`, data)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  delDict(id){
    return this.http1.get(`${this.baseUrl}/dict/delDict?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  allDict(){
    return this.http1.get(`${this.baseUrl}/dict/allDict`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  allUsedDict(){
    return this.http1.get(`${this.baseUrl}/dict/allUsedDict`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  addDictVersion(id,version){
    return this.http1.get(`${this.baseUrl}/dict/addDictVersion?id=${id}&version=${version}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  getDictVersion(id){
    return this.http1.get(`${this.baseUrl}/dict/getDictVersion?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  getDictRef(id){
    return this.http1.get(`${this.baseUrl}/dict/refData?code=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  publishDictVersion(d,uid,uname){
    return this.http1.post(`${this.baseUrl}/dict/publishDictVersion?userId=${uid}&userName=${uname}`,d)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  getDictVerDataByCode(code){
    return this.http1.get(`${this.baseUrl}/dict/getDictVerDataByCode?code=${code}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  getDictVerData(id){
    return this.http1.get(`${this.baseUrl}/dict/getDictVerData?dictVerId=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }


  editorDictVerData(data,id){
    return this.http1.post(`${this.baseUrl}/dict/editorDictVerData?dictVerId=${id}`,data)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  delDictVerData(id){
    return this.http1.get(`${this.baseUrl}/dict/delDictVerData?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  /**
   *  数据元
   */

  getDatasource(text:string,pageNo:number,pageSize:number){
    return this.http1.get(`${this.baseUrl}/ds/getDs?text=${text}&pageSize=${pageSize}&pageNo=${pageNo}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  //
  editorDatasource(data){
    return this.http1.post(`${this.baseUrl}/ds/editorDs`,data)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  delDatasource(id){
    return this.http1.get(`${this.baseUrl}/ds/delDs?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  allDs(){
    return this.http1.get(`${this.baseUrl}/ds/getAllDs`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  getDsRef(id){
    return this.http1.get(`${this.baseUrl}/ds/refData?code=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  /**
   * 数据集
   */

  getDsSet(text:string,pageNo:number,pageSize:number){
    return this.http1.get(`${this.baseUrl}/set/getDsSet?text=${text}&pageSize=${pageSize}&pageNo=${pageNo}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  //编辑值域
  editDsSet(data): Promise<any> {
    return this.http1.post(`${this.baseUrl}/set/editorDsSet`, data)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  delDsSet(id){
    return this.http1.get(`${this.baseUrl}/set/delDsSet?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  addSetVersion(id,version){
    return this.http1.get(`${this.baseUrl}/set/addSetVersion?id=${id}&version=${version}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  getSetVersion(id){
    return this.http1.get(`${this.baseUrl}/set/getSetVersion?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  getSetRef(code){
    return this.http1.get(`${this.baseUrl}/set/refData?code=${code}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  getSetVerData(id){
    return this.http1.get(`${this.baseUrl}/set/getSetVerData?dictVerId=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  editorSettVerData(data,id){
    return this.http1.post(`${this.baseUrl}/set/editorSetVerData?dictVerId=${id}`,data)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  publishSetVersion(d,uid,uname){
    return this.http1.post(`${this.baseUrl}/set/publishSetVersion?userId=${uid}&userName=${uname}`,d)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  delDsSetVerData(id){
    return this.http1.get(`${this.baseUrl}/set/delDsSetVerData?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  generalCode(text:string){
    return this.http1.post(`${this.baseUrl}/ds/generalCode`,{"name":text})
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
  checkData(d){
    if(!d['code']){
      return '编码不能为空';
    }
    if(!d['name']){
      return '名称不能为空';
    }
    return '';
  }

  /**
   * 动态值域
   */

  // 获取动态值域分页列表
  getDynamicDict(text: string, pageNo: number, pageSize: number){
    return this.http1.get(`${this.baseUrl}/dynamicDict/getDynamicDict?text=${text}&pageNo=${pageNo}&pageSize=${pageSize}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  // 编辑/新增动态值域
  editorDynamicDict(data): Promise<any> {
    return this.http1.post(`${this.baseUrl}/dynamicDict/editorDynamicDict`, data)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  // 删除动态值域
  delDynamicDict(id){
    return this.http1.get(`${this.baseUrl}/dynamicDict/delDynamicDict?id=${id}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  // 获取所有动态值域
  allDynamicDict(){
    return this.http1.get(`${this.baseUrl}/dynamicDict/allDynamicDict`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }

  // 根据编码获取动态值域
  getDynamicDictByCode(code){
    return this.http1.get(`${this.baseUrl}/dynamicDict/getDynamicDictByCode?code=${code}`)
      .toPromise()
      .then(data => data as object)
      .catch(this.handleError);
  }
}
