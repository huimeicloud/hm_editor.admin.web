import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { DatasourceManageService } from '../datasource-manage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'hm-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['../datasource-manage.scss', './datasource.component.scss']
})
export class DatasourceComponent implements OnInit {

  constructor(private dsManageService: DatasourceManageService, private confirmationService: ConfirmationService,private datePipe:DatePipe) { }
  msgs: any[];

  _types = this.buildDropDown(['S','S1','S2','S3','N','L','DT','D','..','-']);
  types:any[] = [];
  selectType: any;
  stypes = this.buildDropDown(['','A','N','AN','D8','D15','N1','N2','N4','N8','T/F']);
  selectSType: any;
  dsLen:number;

  dicts = [{ 'label': '', value: '' }];
  selectDict: any;

  dsFilterText: string;

  dsFirst: number = 0;
  dsPageSize: number = 10;
  dsPageNo: number = 1;
  dsRecord: any = { "total": 0, "data": [] };
  selDs: any;


  dsDiag: boolean;
  dsDiagTitle: string;

  editorDs: any = {};


  verDataList:any[] = [];

  refrenceList:any[] = [];
  ngOnInit() {
    this.initAllDict();
  }

  initAllDict(){
    this.dsManageService.allUsedDict().then(d => {

      if(d['code'] == '10000'){

        this.dicts = (d['data'] || []).reduce((p,c) => {

          p.push({"label":c['name'],"value":c['code']});
          return p;
        },this.buildDropDown(['']));
        return;
      }
      this.showError('获取字段列表异常');

    })
  }
  buildDropDown(arr){
    return arr.reduce((p,c) => {
      p.push({"label":c,"value":c});
      return p;
    },[])
  }
  dsRowSel(event) {

    this.selDs = event.data;
    this.dsManageService.getDictVerDataByCode(this.selDs['dictCode']).then(d => {


      this.verDataList = d['data'] || [];
    })
    this.dsManageService.getDsRef(this.selDs['code']).then(d => {


      this.refrenceList = d['data'] || [];
    })
  }
  loadDsLazy($event) {
    this.dsFirst = $event.first;
    this.dsPageNo = ($event.first / $event.rows) + 1;
    this.dsPageSize = $event.rows;
    this.search();
  }

  dsFilterBlur(event) {
    if(event){
      if(event.keyCode != 13){
        return;
      }
    }
    this.dsFirst = 0;
    this.dsPageNo = 1;
    this.search();
  }


  search(){
    this.dsManageService.getDatasource(encodeURI(this.dsFilterText || ''), this.dsPageNo, this.dsPageSize).then(d => {
      if (d['code'] == 10000) {
        this.dsRecord = d['data'];
      } else {
        this.showMessage('error', '', '获取数据元列表异常');
      }
    })
  }
  addDsRow() {
    this.types = this._types;
    this.editorDs = {};
    this.dsDiagTitle = '新增数据元';
    this.dsDiag = true;
  }
  editorDsRow() {
    if(!this.checkSel()){
      return;
    }
    let curFormat = this.selDs['format'];
    if(curFormat == 'A' || curFormat == 'AN'){
      this.types = this.buildDropDown(['S','S1','S2','S3']);
    }else if(curFormat == 'N' || curFormat == 'N1' || curFormat == 'N2' || curFormat == 'N4' || curFormat == 'N8'){
      this.types = this.buildDropDown(['N']);
    }else if(curFormat == 'DT8' || curFormat == 'DT15'){
      this.types = this.buildDropDown(['D']);
    }else if(curFormat == 'T/F'){
      this.types = this.buildDropDown(['L']);
    }else{
      this.buildDropDown(['..','-']);
    }


    this.dsDiagTitle = '修改数据元';
    this.editorDs = Object.assign({},this.selDs);

    this.dsDiag = true;
  }

  delDsRow(){
    if(!this.checkSel()){
      return;
    }
    this.dsManageService.delDatasource(this.selDs['_id']).then(d => {
      if(d['code'] == '10000'){
        this.showInfo('删除成功');
        this.selDs = null;
        this.dsFilterBlur(null);
      }else{
        this.showInfo('删除失败');
      }

    })
  }
  checkSel(){
    if(!this.selDs){
      this.showInfo('请选择需要操作的行');
      return false;
    }
    return true;
  }
  checkDsLen(){
    let len = this.editorDs['length'] || '';
    let lens = len.split(',');
    let tl = [];
    for(let l of lens){

      let ld = l.replace(/[^\d]/g,'');
      if(ld){
        tl.push(ld);
      }
    }
    this.editorDs['length'] = tl.join(',');
  }
  confirmDsDiag(){
    if(!this.editorDs['type']){
      this.showInfo('请选择数据类型');
      return false;
    }
    if(!this.editorDs['code']){
      this.showInfo('数据元标识符不能为空');
      return false;
    }
    if(!this.editorDs['name']){
      this.showInfo('数据元名称不能为空');
      return false;
    }

    this.dsManageService.editorDatasource(this.editorDs).then(d => {

      let addFlag = !this.editorDs['_id'];
      if(d['code'] == '10000'){
        this.dsDiag = false;
        this.showSuccess((addFlag?'新增':'修改')+'成功');
        this.dsFilterBlur(null);
      }else if(d['code'] == '10006'){
        this.showError(d['msg']);
      }else{
        this.showError((addFlag?'新增':'修改')+'失败');
      }


    })

  }
  generalCode(ds){
    if(ds['code']){
      return;
    }
    if(!ds['name']){
      return;
    }
    this.dsManageService.generalCode(ds['name']).then(res => {
      if(res.code == '10000'){

        ds['code'] = res.data;
      }else if(res.code == '10006'){
        this.showError(res.msg || '生成编码异常，请重试！');
      }else{
        this.showError('生成编码异常，请重试！')
      }
    })
  }
  showFormat(data){
    if(data['format']){

      return data['format']+(data['length'] || '');
    }
    return '';
  }
    /**
  * 消息提醒
  */
    showMessage(severity: string, summary: string, detail: string) {
      this.msgs = [];
      this.msgs.push({ severity: severity, summary: summary, detail: detail });
    }

    showError(txt){
      this.showMessage('error','',txt);
    }
    showInfo(txt){
      this.showMessage('info','',txt);
    }
    showSuccess(txt){
      this.showMessage('success','',txt);
    }

}
