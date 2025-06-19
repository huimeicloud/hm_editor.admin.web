import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import {Headers, Http, RequestOptions, ResponseType, URLSearchParams} from '@angular/http';
import {Base64} from 'js-base64';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../../common/service/loading.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplateService {

  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});
  private baseUrl = environment.apiUrl+'admin-service';
  private api = environment.apiUrl;
  constructor(private http: Http,private http1:HttpClient, private loadingService: LoadingService) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}

//查询区域列表
searchAreaList(): Promise<any> {
    return this.http.get(`${this.baseUrl}/areas/condition/e30=`)
      .toPromise()
      .then(data => data.json())
      .catch(this.handleError);
}

//查询医院列表
getHospitals(params): Promise<any> {
    return this.http.post(`${this.baseUrl}/hospitals?test=123`,params)
      .toPromise()
      .then(data => data.json())
      .catch(this.handleError);
}


//根据区域编码查询医院科室列表
getHospitalsByCondition(condition): Promise<any> {
condition = Base64.encodeURI(condition);
return this.http.get(`${this.baseUrl}/hospitals/condition/${condition}`).toPromise()
    .then(data => data.json())
    .catch(this.handleError);
}
getTemplateByName(name){
  return this.http.get(`${this.baseUrl}/getTemplateByName?name=`+name)
    .toPromise()
    .then(data => data.json())
    .catch(this.handleError);
}
createTemplate(param){
  return this.http.post(`${this.baseUrl}/createTemplate`,param)
  .toPromise()
  .then(data => data.json())
  .catch(this.handleError);
}
getTemplateList(param){
  return this.http.post(`${this.baseUrl}/getTemplateList`,param)
  .toPromise()
  .then(data => data.json())
  .catch(this.handleError);
}
getTemplate(param){
  return this.http.post(`${this.baseUrl}/getTemplate`,param)
  .toPromise()
  .then(data => data.json())
  .catch(this.handleError);
}
// 历史版本模板 {name:,version:}
// getHistoryTemplateList(param){
//   return this.http.post(`${this.baseUrl}/getHistoryTemplateList`,param)
//   .toPromise()
//   .then(data => data.json())
//   .catch(this.handleError);
// }
getHistoryTemplateList(id,hosnum){
  return this.http.get(`${this.baseUrl}/getHistoryTemplateList?id=`+id+`&hosnum=`+hosnum)
  .toPromise()
  .then(data => data.json())
  .catch(this.handleError);
}
// 发布模板
disTemplates(param,areaCode,hosnum,dept){
  return this.http.post(`${this.baseUrl}/disTemplates?areaCode=${areaCode}&hosnum=${hosnum}&dept=${dept}`,param)
  .toPromise()
  .then(data => data.json())
  .catch(this.handleError);
}
disTemplate(param,areaCode,hosnum,hosname,dept,description){
  return this.http.post(`${this.baseUrl}/disTemplate?areaCode=${areaCode}&hosnum=${hosnum}&hosname=${hosname}&dept=${dept}&description=${description}`,param)
  .toPromise()
  .then(data => data.json())
  .catch(this.handleError);
}



exportTemplate(params): Observable<any> {
  return this.http1.post(`${this.baseUrl}/exportTemplates`, params, {responseType: 'blob'})
    .map(res => res);
}
isUsedTemplate(id): Promise<Object> {
  return this.http1.get(`${this.baseUrl}/isUsedTemplate?id=${id}`)
    .toPromise()
    .then(data => data)
    .catch(this.handleError);
}
deleteBaseTemplate(id): Promise<Object> {
  return this.http1.get(`${this.baseUrl}/deleteTemplate?id=${id}`)
    .toPromise()
    .then(data => data)
    .catch(this.handleError);
}
  revetBaseTemplate(id): Promise<Object> {
    return this.http1.get(`${this.baseUrl}/revetTemplate?id=${id}`)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  /**
    * 获取模板目录
    */
  getTemplateDirs(hosnum): Promise<Object> {
    return this.http1.get(this.api + 'admin-service/template/getTemplateDirs?hosnum='+hosnum)
    .toPromise()
    .then(res => {
        return res as Object;
    })
    .catch(this.handleError.bind(this));
  }
  moveTemplate(param): Promise<Object> {
    return this.http1.post(this.api + 'admin-service/moveTemplate',param)
    .toPromise()
    .then(res => {
        return res as Object;
    })
    .catch(this.handleError.bind(this));
  }

  // 移动目录、顺序调整
  // 获取模板目录(模板月目录的映射关系)
  queryDirAndTemplateList(searchParams: any): Promise<Object> {
    this.loadingService.show();
    // let urlParams = new URLSearchParams();
    // for (let key in searchParams) {
    //     if (searchParams.hasOwnProperty(key)) {
    //         urlParams.append(key, searchParams[key]);
    //     }
    // }
    const url = this.api + 'admin-service/template/getDirAndTemplateList';
    return this.http1.get(url, searchParams)
    .toPromise()
    .then(res => {
        this.loadingService.hide();
        return res as Object;
    })
    .catch(this.handleError.bind(this));
}
/**
     * 获取医院配置
     * @param searchParams
     */
getHospitalPrams(searchParams: any): Promise<Object> {
  this.loadingService.show();
  return this.http1.get(this.api + "admin-service/paramsConfig/getHospitalConfig", searchParams)
    .toPromise()
    .then(res => {
      this.loadingService.hide();
      return res as Object;
    })
    .catch(this.handleError.bind(this));
}
/**
     * 删除模板
     * @param params
     */
deleteTemplateByParams(params: any): Promise<any> {
  this.loadingService.show();
  const url = this.api + 'admin-service/template/deleteTemplate';
  return this.http1.post(url, params)
  .toPromise()
  .then((res) => {
      this.loadingService.hide();
      return res as Object;
  })
  .catch(this.handleError.bind(this));
}
/**
     * 上移或者下移模板顺序
     * @param emrTemplates
     */
updateEmrTemplateByExchange(emrTemplates: Object): Promise<any> {
  this.loadingService.show();
  const url = this.api + 'admin-service/template/updateEmrTemplateByExchange';
  return this.http1.post(url, emrTemplates)
  .toPromise()
  .then(() => {
      this.loadingService.hide();
  })
  .catch(this.handleError.bind(this));
}

/**
* 调整模板所属目录
* @param params
*/
adjustTemplateDir(params: any): Promise<any> {
  this.loadingService.show();
  const url = this.api + 'admin-service/template/adjustTemplateDir';
  return this.http1.post(url, params)
  .toPromise()
  .then((res) => {
      this.loadingService.hide();
      return res as Object;
  })
  .catch(this.handleError.bind(this));

}
}
