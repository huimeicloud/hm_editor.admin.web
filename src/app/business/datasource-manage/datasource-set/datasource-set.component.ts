import { CurrentUserInfo } from './../../../basic/common/model/currentUserInfo.model';
import { Component, OnInit } from '@angular/core';
import { DatasourceManageService } from '../datasource-manage.service';
import { ConfirmationService } from 'primeng/primeng';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'hm-datasource-set',
  templateUrl: './datasource-set.component.html',
  styleUrls: ['../datasource-manage.scss', './datasource-set.component.scss']
})
export class DatasourceSetComponent implements OnInit {

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
  verDataList: any[] = [];
  verDataListBak: any[] = [];
  selVersionData: any;
  dsDictVerDataDiag: boolean;
  dsDictVerDataDiagTitle: string;

  verShowDataList: any[] = [];
  editorDsDictVerData: any = {};


  // 引用情况
  refrenceList: any[] = [];


  //types = [{'label':'数据元','value':'数据元'},{'label':'数据组','value':'数据组'}];
  types = [{'label':'数据元','value':'数据元'}];
  selType = '数据元';
  allDs:any[];
  allGroup:any[];
  dropDs:any[];
  dropGroup:any[];
  selDs:any;
  loadAllDs:boolean;

  verDataFilterTxt:string;

  filterDs:any = [];
  searchDsTimeout:any;


  paginateInfo = {
    totalNum: 0,
    pageSize: 10,
    pageNo: 1,
    first: 0
  };

  notShowCode = [];
  constructor(private dsManageService: DatasourceManageService, private confirmationService: ConfirmationService,private datePipe:DatePipe) { }

  ngOnInit() {
    // this.curUser = JSON.parse(this.authToken.getCurrentUserInfo());
    this.dictFilterBlur(null);
    //this.initAllDs();
    this.initAllGroup();
  }

  initAllDs(){
    if(this.loadAllDs){
      return;
    }
    this.dsManageService.allDs().then(d => {
      this.allDs = (d['data']||[]).reduce((p,c) => {
        p.push({"label":c['name'],"value":c['code']});
        return p;
      },[{"label":'',"value":''}]);
      if(d['code'] != 10000){
        this.showMessage('error','','获取数据元列表异常');
        return;
      }
      this.loadAllDs = true;
    })
  }
  initAllGroup(){

    // this.dsManageService.allGroup().then(d => {
    //   this.allGroup = (d['data']||[]).reduce((p,c) => {
    //     p.push({"label":c['name'],"value":c['code']});
    //     return p;
    //   },[{"label":'',"value":''}]);
    //   if(d['code'] != 10000){
    //     this.showMessage('error','','获取数据元列表异常');
    //     return;
    //   }

    // })
  }
  addDsDict() {
    this.editorDsDict = { "code": "", "name": "" };
    this.dsDictDiagTitle = '新增数据集';
    this.dsDictDiag = true;
  }

  editDsDict() {
    if (!this.checkSel()) {
      return;
    }
    this.editorDsDict = Object.assign({}, this.selDict);
    this.dsDictDiagTitle = '修改数据集';
    this.dsDictDiag = true;
  }

  delDict() {
    if (!this.checkSel()) {
      return;
    }
    let me = this;
    this.confirmationService.confirm({
      header: '确认删除',
      icon: 'fa fa-trash',
      message: '确认删除【'+this.selDict['name']+'】吗？',
      accept: () => {
        me.dsManageService.delDsSet(me.selDict['_id']).then(d => {
          if (d['code'] == 10000) {
            me.showMessage('success', '', '删除成功');
            me.dictFilterBlur(null);
          } else {
            me.showMessage('success', '', d['code'] == '10006'?d['msg']||'删除失败':'删除失败');
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
    this.dictFirst = 0;
    this.dictPageNo = 1;
    this.verDataList = [];
    this.refrenceList = [];
    this.searchDict();
  }
  searchDict() {
    this.searchDictCall(null);
  }
  searchDictCall(callback) {
    this.selDict = null;
    this.selVersionData = null;
    this.verDataList = [];

    this.dsManageService.getDsSet(this.dictFilterText || '', this.dictPageNo, this.dictPageSize).then(d => {
      if (d['code'] == 10000) {
        this.dictRecord = d['data'];
        callback && callback();
        //this.selDict = this.dictRecord['data'][0];
      } else {
        this.showMessage('error', '', '获取列表异常');
      }
    })

  }
  confirmEditDict() {
    let msg = this.dsManageService.checkData(this.editorDsDict);
    if(msg){
      this.showMessage('info','',msg);
      return;
    }
    this.dsManageService.editDsSet(this.editorDsDict).then(d => {
      let code = d['code'];
      if (code == '10000') {
        this.showMessage('success', '', this.editorDsDict['_id'] ? '修改成功' : '新增成功');
        this.dsDictDiag = false;
        // 新增
        let res = d['data'];
        if(res['addData']){
          this.dictFilterText = '';
          let dataIndex = res['index'];

          this.dictPageNo = Math.floor(dataIndex / this.dictPageSize) + 1;

          this.searchDictCall(() => {
            this.dictFirst = (this.dictPageNo - 1) * this.dictPageSize;
            setTimeout(() => {
              this.dictRowSel({"data":res['addData']});
            },100)


          });


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
    this.verDataListBak = [];
    this.verDataList = [];
    this.verShowDataList = [];
    this.selVersionData = null;
    this.doSearch();
    // 引用情况
    this.dsManageService.getSetRef(this.selDict['code']).then(d => {
      if (d['code'] == 10000) {
        this.refrenceList = d['data'] || [];
      } else {
        this.showMessage('error', '', '获取引用列表异常');
      }
    })
  }

  /*
   * 版本
   */

  // addDsDictVersion() {
  //   if (!this.checkSel()) {
  //     return;
  //   }
  //   this.dsManageService.addSetVersion(this.selDict['code'] , this.versionList.length + 1).then(d => {
  //     if (d['code'] == 10000) {
  //       this.versionList = d['data'] || [];
  //     } else {
  //       this.showMessage('error', '', '添加失败');
  //     }
  //   })
  // }

  lazyVerData($event){
    this.paginateInfo.first = $event.first;
    this.paginateInfo.pageNo = ($event.first / $event.rows) + 1;
    this.paginateInfo.pageSize = $event.rows;
    this.doSearch('page');
  }
  doSearch(type = null) {
    if(type == 'page'){
      this.pageData();
      return;
    }
    this.paginateInfo.pageNo = 1;
    this.paginateInfo.first = 0;
    if(type == 'filter'){
      this.buildVerData();
      return;
    }
    this.verDataListBak = [];
    this.dsManageService.getSetVerData(this.selDict['code']).then(d => {
      if (d['code'] == 10000) {
        this.verDataListBak = d['data']['data'] || [];
        this.buildVerData();
      } else {
        this.showMessage('error', '', '获取值域版本异常');
      }
    })
  }
  pageData(){
    this.paginateInfo.totalNum = this.verDataList.length;
    this.verShowDataList = [];
    let to  = this.paginateInfo.pageNo * this.paginateInfo.pageSize;
    let from = to - this.paginateInfo.pageSize;
    let len = this.paginateInfo.totalNum;
    if(len > from){
      this.verShowDataList = this.verDataList.slice(from,to > len?len:to);
    }
  }



  /**
   * 值域数据项
   */

  addDictVerDataRow() {
    if(!this.selDict){
      this.showMessage('info','','请先选择版本');
      return;
    }
    this.selType = '数据元';
    this.selDs = null;
    this.editorDsDictVerData = { "order": (this.verDataList || []).length + 1 };
    this.dsDictVerDataDiagTitle = '新增数据元';
    this.dsDictVerDataDiag = true;
  }
  editorDictVerDataRow() {
    if (!this.checkSelDictVerData()) {
      return;
    }
    this.selType = this.selVersionData['remark'];
    this.selDs = null;
    this.editorDsDictVerData = Object.assign({}, this.selVersionData);
    this.dsDictVerDataDiagTitle = '修改数据元';
    this.dsDictVerDataDiag = true;
  }

  checkSelDictVerData() {
    if (!this.selVersionData) {
      this.showMessage('info', '', '请选择值域数据项');
      return false;
    }
    return true;
  }
  delVerDataRow(){
    if(!this.selVersionData){
      this.showMessage('info','','请先选择数据');
      return;
    }
    this.dsManageService.delDsSetVerData(this.selVersionData['_id']).then(d => {

      if(d['code'] != 10000){
        this.showMessage('error', '', '删除失败');
        return;
      }
      this.showMessage('error', '', '删除成功');
      this.selVersionData = null;

      this.doSearch();
    })
  }

  confirmDictVerData() {
    if(!this.selDs){
      this.showMessage('info', '', '请先选择数据元');
      return;
    }
    let d = {};
    d['type'] = this.selType;
    if(this.selType == '数据元'){
      d['code'] = this.selDs['code'];
      if(!this.selDs['code']){
        this.showMessage('info', '', '请先选择数据元');
        return;
      }
    }else{
      d['code'] = this.selDs;
    }

    if(this.dsDictVerDataDiagTitle.indexOf('修改') == 0){

      d['_id'] = this.selVersionData['_id'];
    }

    var exists = this.verDataListBak.find(vd => vd['_id'] != d['_id'] && vd['code'] == d['code']);
    if(exists){
      this.showMessage('info', '', '已包含'+(this.selType)+'【'+exists['name']+'】');
      return;
    }
    this.dsManageService.editorSettVerData(d, this.selDict['code']).then(d => {

      let code = d['code'];
      if (code == '10000') {
        this.showMessage('success', '', this.editorDsDictVerData['_id'] ? '修改成功' : '新增成功');
        this.dsDictVerDataDiag = false;
    this.verDataListBak = d['data']['data'] || [];
        this.buildVerData();
        return;
      }
      this.showMessage('error', '', code == '10006' ? d['msg'] : (this.editorDsDict['_id'] ? '修改失败' : '新增失败'));
    }

    )
  }

  buildVerData(){
    // filter
    if(!this.verDataFilterTxt){
      this.verDataList = this.verDataListBak;
    }else{
      this.verDataList = this.verDataListBak.filter(d => {
        let dsFlag = (((d['refCode'] || '').indexOf(this.verDataFilterTxt) > -1 || (d['name'] || '').indexOf(this.verDataFilterTxt) > -1));
        return dsFlag;
      })
    }
    this.pageData();
  }

  verDataBlur(event) {
    if(event){
      if(event.keyCode != 13){
        return;
      }
    }
    this.doSearch('filter');
  }
  /**
  * 消息提醒
  */
  showMessage(severity: string, summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
  }
  filterDsFun(event){
    if(this.searchDsTimeout){
      clearTimeout(this.searchDsTimeout);
    }
    let text = event.query || '';
    var th = this;
    this.searchDsTimeout = setTimeout(function(){
      th.searchDs(text);
    },200);
  }
  searchDs(text){

    this.dsManageService.getDatasource(text,1,100).then(d => {
      this.filterDs = d['data']['data'] || [];
    })
  }
}
