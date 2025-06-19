import { CurrentUserInfo } from './../../../basic/common/model/currentUserInfo.model';
import { Component, OnInit } from '@angular/core';
import { DatasourceManageService } from '../datasource-manage.service';
import { ConfirmationService } from 'primeng/primeng';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'hm-datasource-dict',
  templateUrl: './datasource-dict.component.html',
  styleUrls: ['../datasource-manage.scss', './datasource-dict.component.scss']
})
export class DatasourceDictComponent implements OnInit {

   curUser:CurrentUserInfo;

  msgs: any[];

  dictFilterText: string = '';
  dictFirst: number = 0;
  dictRecord: any = { "data": [], "total": 0 };
  selDict: any;

  dictPageSize: number = 20;
  dictPageNo: number = 1;

  dsDictDiagTitle: string;
  dsDictDiag: boolean;
  editorDsDict: any = {};

  // 字典列表
  verDataList: any[];
  selVersionData: any;
  dsDictVerDataDiag: boolean;
  dsDictVerDataDiagTitle: string;

  editorDsDictVerData: any = {};


  // 引用情况
  refrenceList: any[] = [];
  constructor(private dsManageService: DatasourceManageService, private confirmationService: ConfirmationService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.dictFilterBlur(null);
  }
  // 新增值域
  addDsDict() {
    this.editorDsDict = { "code": "", "name": "", "status": false };
    this.dsDictDiagTitle = '新增值域';
    this.dsDictDiag = true;
  }
  // 修改值域
  editDsDict() {
    if (!this.checkSel()) {
      return;
    }
    this.editorDsDict = Object.assign({}, this.selDict);
    this.dsDictDiagTitle = '修改值域';
    this.dsDictDiag = true;
  }

  delDict() {
    if (!this.checkSel()) {
      return;
    }
    if(this.selDict['count']){

      this.showMessage('info','','当前值域已被数据元引用，不可删除');
      return;
    }
    let me = this;
    this.confirmationService.confirm({
      header: '确认删除',
      icon: 'fa fa-trash',
      message: '确认删除吗？',
      accept: () => {
        me.dsManageService.delDict(me.selDict['_id']).then(d => {
          if (d['code'] == 10000) {
            me.showMessage('success', '', '删除成功');
            me.dictFilterBlur(null);
          } else {
            me.showMessage('success', '', '删除失败');
          }
        })
      }
    });
  }

  checkSel() {
    if (!this.selDict) {
      this.showMessage('info', '', '请先选择数据');
      return false;
    }
    return true;
  }
  loadDictLazy($event) {
    this.dictFirst = $event.first;
    this.dictPageNo = ($event.first / $event.rows) + 1;
    this.dictPageSize = $event.rows;
    this.searchDict();
  }

  dictFilterBlur(event) {
    if(event){
      if(event.keyCode != 13){
        return;
      }
    }
    this.selDict = null;
    this.dictFirst = 0;
    this.dictPageNo = 1;
    this.verDataList = [];
    this.refrenceList = [];
    this.searchDict();
  }
  searchDict() {
    this.dsManageService.getDict(this.dictFilterText || '', this.dictPageNo, this.dictPageSize).then(d => {
      if (d['code'] == 10000) {
        this.dictRecord = d['data'];
      } else {
        this.showMessage('error', '', '获取值域列表异常');
      }
    })

  }
  confirmEditDict() {
    let msg = this.dsManageService.checkData(this.editorDsDict);

    if(msg){

      this.showMessage('info','',msg);
      return;
    }
    this.dsManageService.editDict(this.editorDsDict).then(d => {
      let code = d['code'];
      if (code == '10000') {
        this.showMessage('success', '', this.editorDsDict['_id'] ? '修改成功' : '新增成功');
        this.dsDictDiag = false;
        if (this.editorDsDict['_id']) {
          // 修改
          this.selDict['name'] = this.editorDsDict['name'];
          this.selDict['status'] = this.editorDsDict['status'];
          this.selDict['showStatus'] = this.editorDsDict['status'] ? '是' : '否';
        }else{
          this.searchDict();
        }
        return;
      }
      this.showMessage('error', '', code == '10006' ? d['msg'] : (this.editorDsDict['_id'] ? '修改失败' : '新增失败'));
    })
  }
  dictRowSel(event) {
    this.selDict = event.data;
    this.selVersionData = null;
    this.verDataList = [];
    this.dsManageService.getDictVerData(this.selDict['code']).then(d => {
      if (d['code'] == 10000) {
        this.verDataList = d['data'] || [];
      } else {
        this.showMessage('error', '', '获取值域版本异常');
      }
    })

    // 引用情况
    this.dsManageService.getDictRef(this.selDict['code']).then(d => {
      if (d['code'] == 10000) {
        this.refrenceList = d['data'] || [];
      } else {
        this.showMessage('error', '', '获取值域版本异常');
      }
    })
  }

  /**
   * 值域数据项
   */

  addDictVerDataRow() {
    if(!this.selDict){
      this.showMessage('info','','请选择值域版本数据');

      return ;
    }
    this.editorDsDictVerData = { "order": (this.verDataList || []).length + 1 };
    this.dsDictVerDataDiagTitle = '新增数据项';
    this.dsDictVerDataDiag = true;
  }
  editorDictVerDataRow() {
    if (!this.checkSelDictVerData()) {
      return;
    }
    this.editorDsDictVerData = Object.assign({}, this.selVersionData);
    this.dsDictVerDataDiagTitle = '修改数据项';
    this.dsDictVerDataDiag = true;
  }

  checkSelDictVerData() {
    if (!this.selVersionData) {
      this.showMessage('info', '', '请选择值域数据项');
      return false;
    }
    return true;
  }

  confirmDictVerData() {

    this.dsManageService.editorDictVerData(this.editorDsDictVerData, this.selDict['code']).then(d => {

      let code = d['code'];
      if (code == '10000') {
        this.showMessage('success', '', this.editorDsDictVerData['_id'] ? '修改成功' : '新增成功');
        this.dsDictVerDataDiag = false;
        this.verDataList = d['data'] || [];
        return;
      }
      this.showMessage('error', '', code == '10006' ? d['msg'] : (this.editorDsDict['_id'] ? '修改失败' : '新增失败'));
    }

    )
  }

  delDictVerData(){
    if (!this.checkSelDictVerData()) {
      return;
    }
    this.dsManageService.delDictVerData(this.selVersionData['_id']).then(d => {
      if(d['code'] != '10000'){
        this.showMessage('error', '', '删除失败');
        return;
      }
      this.selVersionData = null;
      this.dsManageService.getDictVerData(this.selDict['code']).then(d => {
        if (d['code'] == 10000) {
          this.verDataList = d['data'] || [];
        } else {
          this.showMessage('error', '', '获取值域版本异常');
        }
      })
    })
  }
  /**
  * 消息提醒
  */
  showMessage(severity: string, summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
  }
}
