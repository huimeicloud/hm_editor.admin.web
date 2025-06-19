
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, ResponseType} from '@angular/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class DataSourceService{

    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});
    private baseUrl = environment.apiUrl;
    constructor(private http: Http,private http1:HttpClient) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    //查询数据元
    searchDataSourceListByParams(params): Promise<any> {
        return this.http.post(`${this.baseUrl}admin-service/dataElement/search`, JSON.stringify(params), this.options)
          .toPromise()
          .then(data => data.json())
          .catch(this.handleError);
    }

    //新增数据元
    addDataSource(dataSource): Promise<any> {
        return this.http.post(`${this.baseUrl}admin-service/dataElement/editDataElement`, JSON.stringify(dataSource), this.options)
            .toPromise()
            .then(data => data.json())
            .catch(this.handleError);
    }

    //编辑数据元
    editDataSource(dataSource): Promise<any> {
        return this.http.post(`${this.baseUrl}admin-service/dataElement/updDataElenment`, JSON.stringify(dataSource), this.options)
          .toPromise()
          .then(data => data.json())
          .catch(this.handleError);
    }

    //删除数据元
    deleteDataSource(dataSource): Promise<any> {
        return this.http.post(`${this.baseUrl}admin-service/dataElement/delDataElenment?id=${dataSource._id}`, this.options)
          .toPromise()
          .then((data) => data.json())
          .catch(this.handleError);
    }

    public getAllTemplate(): Promise<object> {
      let url = this.baseUrl + 'admin-service/baseTemplates';
      return this.http1.post(url,{page:{currentPage:1,pageSize:10000}})
        .toPromise()
        .then(res => res as object)
        .catch(this.handleError);
    }

}
