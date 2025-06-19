import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/primeng';
import { DateUtil } from '../../../basic/common/util/DateUtil';
import { UtilTools } from '../../../common/lib/Util';
import { DropDownClazz } from '../../../common/model/dropdown-class';
import { PageClazz } from '../../../common/model/page-clazz';
import { GrowlMessageService } from '../../../common/service/growl-message.service';
import { DataSourceService } from '../data-source.service';
import { EmrDataSource } from '../model/emr-data-source';
import * as _ from 'underscore';

interface DataSourceType {
  name: string;
  code: string;
  hasItems: boolean;
  placeHolder: string;
}
@Component({
  selector: 'hm-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent implements OnInit {
  breadcrumbItems: MenuItem[];

  searchParams = {
    key:'',
    page: new PageClazz(),
    templateTrueName:''
  };
  searchPage: object={};
  emrDataSourceList: EmrDataSource[] = [];
  dataSourceTypeList: DataSourceType[] = [];
  searchOptionList: DropDownClazz[] = [];
  printUnderlineList: DropDownClazz[] = [];
  printBorderList: DropDownClazz[] = [];
  printColorList: DropDownClazz[] = [];
  enterAutoGrowList: DropDownClazz[] = []; // 搜索控件增加该属性，从而使得在病历那边在搜索结果确认回车之后自动增加一个搜索控件
  autoshowcurtimeList: DropDownClazz[] = []; // 日期数据元增加该属性，在新建病历时，自动带入当前时间
  isdisabledList: DropDownClazz[] = [];
  dataSourceTypeMap: {};
  displayEmrDataSourceDialog = false;
  emrDataSource: EmrDataSource;
  isCreateEmrDataSource = false;
  emrDataSourceForm: FormGroup;

  timeBoxList: any[] = ['time', 'date', 'month_day', 'datetime']; // 时间类型选项

  templateNameList:any[];
  constructor(
    private fb: FormBuilder,
    private growlMessageService: GrowlMessageService,
    private dataSourceStoreService: DataSourceService
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      {label: '数据字典'},
      {label: '数据元仓库', url: '/emr-console-client/data-dictionary/data-source-store'}
    ];
    this.emrDataSourceForm = this.fb.group({
      'templateName': new FormControl('', Validators.required),
      'dataSourceName': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'dataSourceType': new FormControl('', Validators.required),
      'typeItems': new FormControl(''),
      'placeholder': new FormControl(''),
      'searchOption': new FormControl(''),
      'searchPair': new FormControl(''),
      'printReplacement': new FormControl(''),
      'printMinWidth': new FormControl(''),
      'printUnderline': new FormControl(''),
      'printBorder': new FormControl(''),
      'printColor': new FormControl(''),
      'enterAutoGrow': new FormControl(''),
      'autoshowcurtime': new FormControl(''),
      'isdisabled': new FormControl('')
    });
    this.searchOptionList = UtilTools.searchOptionList;
    this.printUnderlineList = [
      {name: '否', code: '0'},
      {name: '是', code: '1'},
    ];
    this.printBorderList = [
      {name: '否', code: '0'},
      {name: '是', code: '1'},
    ];
    this.printColorList = [
      {name: '-请选择-', code: ''},
      {name: 'black', code: 'black'},
      {name: 'red', code: 'red'},
    ];
    this.enterAutoGrowList = [
      {name: '否', code: '0'},
      {name: '是', code: '1'}
    ];
    this.autoshowcurtimeList = [
      {name: '否', code: '0'},
      {name: '是', code: '1'}
    ];
    this.isdisabledList = [
      {name: '否', code: '0'},
      {name: '是', code: '1'}
    ];
    this.initDataSourceTypeList();
    this.getEmrDataSourceList();
    this.initTemplateList();
  }

  initDataSourceTypeList() {
    this.dataSourceTypeList = UtilTools.dataSourceTypeArray;
    this.dataSourceTypeMap = _.object(_.pluck(this.dataSourceTypeList, 'code'), this.dataSourceTypeList);
  }

  initTemplateList(){

    this.templateNameList = [];
    this.dataSourceStoreService.getAllTemplate().then(ts => {
      if(ts['code'] != '10000'){
        this.growlMessageService.showError('error','获取模板列表异常');
        return;
      }
      let d = ts['data']['dataList'] || [];

      this.templateNameList = d.reduce((p,c) => {
        p.push({"label":c['templateName'],"value":c['templateName']});
        return p;
      },[{"label":'请选择',"value":''}])
    })
  }
  getEmrDataSourceList(){
    this.dataSourceStoreService.searchDataSourceListByParams(this.searchParams)
    .then(
      data => {
        if (data && data.code == '10000') {
          const newData = data.data || {};
          this.emrDataSourceList = newData.dataList || [];
          _.each(this.emrDataSourceList, (dataSource) => {
            dataSource.createDate = DateUtil.format(dataSource.createDate,"yyyy-MM-dd HH:mm:ss");
            dataSource.typeName = this.dataSourceTypeMap[dataSource.typeCode]['name'];
          });
          this.searchPage = newData.page || new PageClazz();
        } else {
          this.growlMessageService.showError('', data ? (data.msg || '查询失败') : '查询失败');
        }
      },
      (err) => {
        this.growlMessageService.showError('获取数据元列表失败：', err);
      }
    );
  }

  saveEmrDataSource(){
    this.emrDataSource.typeName = this.emrDataSource.dataSourceType.name;
    this.emrDataSource.typeCode = this.emrDataSource.dataSourceType.code;
    this.emrDataSource.searchOption = this.emrDataSource.searchOptionObj.code;
    this.emrDataSource.printUnderline = this.emrDataSource.printUnderlineObj.code;
    this.emrDataSource.printColor = this.emrDataSource.printColorObj.code;
    this.emrDataSource.printBorder = this.emrDataSource.printBorderObj.code;
    this.emrDataSource.enterAutoGrow = this.emrDataSource.enterAutoGrowObj.code;
    this.emrDataSource.autoshowcurtime = this.emrDataSource.autoshowcurtimeObj.code;
    this.emrDataSource.isdisabled = this.emrDataSource.isdisabledObj.code;
    this.emrDataSource.createDate = new Date();

    if (!this.emrDataSource.dataSourceType.hasItems) {
      this.emrDataSource.typeItems = '';
    }
    if (this.emrDataSource.typeCode !== 'textbox' && this.emrDataSource.typeCode !== 'newtextbox') {
      this.emrDataSource.placeholder = '';
    }
    if (this.emrDataSource.typeCode !== 'searchbox') {
      this.emrDataSource.searchOption = '';
      this.emrDataSource.searchPair = '';
    }

    if (this.isCreateEmrDataSource) {
      this.dataSourceStoreService.addDataSource(this.emrDataSource)
        .then(
          (data) => {
            if (data && data.code == '10000') {
              this.displayEmrDataSourceDialog = false;
              // this.growlMessageService.showSuccess(data.msg || '新建数据元成功！');
              this.getEmrDataSourceList();

            } else {
              this.growlMessageService.showError('', data ? (data.msg || '新建失败') : '新建失败');
            }
          },
          (err) => {
            this.growlMessageService.showError('新建数据元失败：', err);
          }
        );
    } else {
      this.dataSourceStoreService.editDataSource(this.emrDataSource)
        .then(
          (data) => {
            if (data && data.code == '10000') {
              this.displayEmrDataSourceDialog = false;
              this.getEmrDataSourceList();
              //this.growlMessageService.showSuccess(data.msg || '编辑数据元成功！');
            } else {
              this.growlMessageService.showError('', data ? (data.msg || '编辑失败') : '编辑失败');
            }
          },
          (err) => {
            this.growlMessageService.showError('编辑数据元失败：', err);
          }
        );
    }
  }

  showDialogToCreateEmrDataSource(){
    this.isCreateEmrDataSource = true;
    this.emrDataSource = new EmrDataSource();
    this.emrDataSource.dataSourceType = this.dataSourceTypeList[0];
    this.emrDataSource.searchOptionObj = this.searchOptionList[0];
    this.emrDataSource.printUnderlineObj = this.printUnderlineList[0];
    this.emrDataSource.printColorObj = this.printColorList[0];
    this.emrDataSource.printBorderObj = this.printBorderList[0];
    this.emrDataSource.enterAutoGrowObj = this.enterAutoGrowList[0];
    this.emrDataSource.autoshowcurtimeObj = this.autoshowcurtimeList[0];
    this.emrDataSource.isdisabledObj = this.isdisabledList[0];
    this.displayEmrDataSourceDialog = true;
  }

  showDialogToEditEmrDataSource(emrDataSource){
    this.isCreateEmrDataSource = false;
    this.emrDataSource = <EmrDataSource>UtilTools.deepCopyObjAndArray(emrDataSource);
    this.emrDataSource.dataSourceType = _.find(this.dataSourceTypeList, (dataSourceType) => {
      return dataSourceType.code === this.emrDataSource.typeCode;
    });

    this.emrDataSource.searchOptionObj = _.find(this.searchOptionList, (searchOption) => {
      return searchOption.code === this.emrDataSource.searchOption;
    }) || this.searchOptionList[0];

    this.emrDataSource.printUnderlineObj = _.find(this.printUnderlineList, (printUnderline) => {
      return printUnderline.code === this.emrDataSource.printUnderline;
    }) || this.printUnderlineList[0];

    this.emrDataSource.printColorObj = _.find(this.printColorList, (printColor) => {
      return printColor.code === this.emrDataSource.printColor;
    }) || this.printColorList[0];

    this.emrDataSource.printBorderObj = _.find(this.printBorderList, (printBorder) => {
      return printBorder.code === this.emrDataSource.printBorder;
    }) || this.printBorderList[0];

    if (this.emrDataSource.typeCode == 'searchbox') {
      this.emrDataSource.enterAutoGrowObj = _.find(this.enterAutoGrowList, (enterAutoGrow) => {
        return enterAutoGrow.code === this.emrDataSource.enterAutoGrow;
      }) || this.enterAutoGrowList[0];
    } else {
      this.emrDataSource.enterAutoGrowObj = this.enterAutoGrowList[0];
    }
    if (this.timeBoxList.indexOf(this.emrDataSource.typeCode) > -1) {
      this.emrDataSource.autoshowcurtimeObj = _.find(this.autoshowcurtimeList, (autoshowcurtime) => {
        return autoshowcurtime.code === this.emrDataSource.autoshowcurtime;
      }) || this.autoshowcurtimeList[0];
    } else {
      this.emrDataSource.autoshowcurtimeObj = this.autoshowcurtimeList[0];
    }

    if (this.emrDataSource.typeCode !== 'textbox') {
      this.emrDataSource.isdisabledObj = _.find(this.isdisabledList, (isdisabled) => {
        return isdisabled.code === this.emrDataSource.isdisabled;
      }) || this.isdisabledList[0];
    } else {
      this.emrDataSource.isdisabledObj = this.isdisabledList[0];
    }

    this.displayEmrDataSourceDialog = true;
  }

  removeEmrDataSource(emrDataSource: EmrDataSource){
    // this.confirmationService.confirm({
    //   message: `确定删除数据元${emrDataSource.dataSourceName}?`,
    //   header: '删除数据元',
    //   icon: 'fa fa-trash',
    //   accept: () => {
        this.dataSourceStoreService.deleteDataSource(emrDataSource).then(
          (data) => {
            if (data && data.code == '10000') {
              this.getEmrDataSourceList();
              this.growlMessageService.showSuccess(`数据元${emrDataSource.dataSourceName}${data.msg || '删除成功'}`);
            } else {
              this.growlMessageService.showError(`数据元${emrDataSource.dataSourceName}：`, data ? (data.msg || '删除失败') : '删除失败');
            }
          },
          (err) => {
            this.growlMessageService.showError(`删除数据元${emrDataSource.dataSourceName}失败：`, err);
          });
    //   }
    // });
  }

  onUploadError(event) {
    this.growlMessageService.showGrowl({severity: 'error', detail: event.xhr.status + ',' + event.xhr.statusText});
  }

  onUploadComplete(event) {
    const returnMsg = event.xhr.responseText || '{}';

    if (JSON.parse(returnMsg)['code'] == '10000') {
      this.getEmrDataSourceList();
      this.growlMessageService.showGrowl({severity: 'success', detail: "导入成功"});
    } else {
      this.growlMessageService.showGrowl({severity: 'error', detail: "导入失败"});
    }
  }

  paginate(event) {
    this.searchParams.page.currentPage = event.page + 1;
    this.getEmrDataSourceList();
  }

  /**
   * 数据元类型切换事件
   */
  changeDataSourceTypeEvt(emrDataSource: any) {
    if (emrDataSource.typeCode != 'searchbox' && this.timeBoxList.indexOf(emrDataSource.typeCode) == -1) {
      emrDataSource.enterAutoGrowObj = this.enterAutoGrowList[0];
      emrDataSource.autoshowcurtimeObj = this.autoshowcurtimeList[0];
    } else if (emrDataSource.typeCode != 'searchbox') {
      emrDataSource.enterAutoGrowObj = this.enterAutoGrowList[0];
    } else if (this.timeBoxList.indexOf(emrDataSource.typeCode) == -1) {
      emrDataSource.autoshowcurtimeObj = this.autoshowcurtimeList[0];
    } else if (emrDataSource.typeCode == 'textbox') {
      emrDataSource.isdisabledObj = this.isdisabledList[0];
    }
  }

}
