import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FolderService {

  private bathPath = environment.apiUrl + 'admin-service';

  constructor(private http1: HttpClient) { }


  /**
   * 获取全部目录
   * @returns
   */

  getAllFolders():Promise<any>{
    return this.http1.get(`${this.bathPath}/baseFolders?folderName=`)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }
  move(param):Promise<any>{
    return this.http1.post(`${this.bathPath}/moveFolder`,param)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }
  getBasTemplateList(params){
    return this.http1.post(`${this.bathPath}/getBasTemplates`, params)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }
  mapDirTemplate(){
    return this.http1.post(`${this.bathPath}/mapDirTemplate`, {})
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  // del ======================


  searchBaseFolderListByParams(params: any): Promise<any> {
    return this.http1.get(`${this.bathPath}/baseFolders?folderName=${params}`)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  addBaseFolder(baseFolder: any): Promise<any> {
    return this.http1.post(`${this.bathPath}/baseFolder`, baseFolder)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  editBaseFolder(baseFolder: any): Promise<any> {
    return this.http1.post(`${this.bathPath}/baseFolder`, baseFolder)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  deleteBaseFolder(baseFolder: any): Promise<any> {
    return this.http1.delete(`${this.bathPath}/delBaseFolder?id=${baseFolder._id}`)
      .toPromise()
      .then((data) => data)
      .catch(this.handleError);
  }

  getBaseFolderList(): Promise<any> {
    return this.http1.get(`${this.bathPath}/baseFolders?folderName=`)
    .toPromise()
    .then(data => data)
    .catch(this.handleError);
  }

  searchBaseTemplateListByParams(params): Promise<any> {
    return this.http1.post(`${this.bathPath}/baseTemplates`, params)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  addBaseTemplate(baseTemplate,hosnum): Promise<any> {
    return this.http1.post(`${this.bathPath}/baseTemplate?hosnum=`+hosnum, baseTemplate)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  editBaseTemplate(baseTemplate,hosnum): Promise<any> {
    return this.http1.post(`${this.bathPath}/baseTemplate?hosnum=`+hosnum, baseTemplate)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  deleteBaseTemplate(baseTemplate): Promise<any> {
    return this.http1.post(`${this.bathPath}/delBaseTemplate`,{id:baseTemplate.idStr})
      .toPromise()
      .then((data) => data)
      .catch(this.handleError);
  }

  publishedDsSet(): Promise<any> {
    return this.http1.get(`${this.bathPath}/datasource/set/allPublishedDsSet`)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  /**
   * 获取模板数据集
   * @param templateName 模板名称
   */
  getTemplateDs(templateName: string): Promise<any> {
    return this.http1.get(`${this.bathPath}/templateDs?name=${templateName}`)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  /**
   * 获取动态字典数据
   */
  getDynamicDict(): Promise<any> {
    return this.http1.get(`${this.bathPath}/datasource/dynamicDict/allDynamicDict`)
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }
  /**
   * 获取模板HTML
   * @param idStr 模板ID
   */
  getBaseTemplateHtml(idStr: string): Promise<any> {
    return this.http1.post(`${this.bathPath}/getBaseTemplateHtml`,{id:idStr})
      .toPromise()
      .then(data => data)
      .catch(this.handleError);
  }

  /**
   * 保存模板HTML
   * @param params 包含id和html的对象
   */
  saveBaseTemplateHtml(params: { id: string, html: string }): Promise<any> {
    return this.http1.post(
      `${this.bathPath}/saveBaseTemplateHtml`,
      params
    )
    .toPromise()
    .then(data => data)
    .catch(this.handleError);
  }
}
