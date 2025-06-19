import { Component, OnInit } from '@angular/core';
import { DatasourceManageService } from '../datasource-manage.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'hm-dynamic-dict',
  templateUrl: './dynamic-dict.component.html',
  styleUrls: ['../datasource-manage.scss', './dynamic-dict.component.scss']
})
export class DynamicDictComponent implements OnInit {
  // 动态值域列表
  dynamicDictList: any[] = [];
  // 选中的动态值域
  selectedDynamicDict: any;
  // 对话框显示控制
  displayDialog: boolean = false;
  // 对话框标题
  dialogTitle: string = '';
  // 编辑对象
  editDynamicDict: any = {};
  // 是否为新增记录
  isNewRecord: boolean = false;

  // 分页相关
  pageSize: number = 10;
  pageNo: number = 1;
  totalRecords: number = 0;
  filterText: string = '';
  first: number = 0;

  // 消息提示
  msgs: any[] = [];

  constructor(
    private datasourceManageService: DatasourceManageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadDynamicDictList();
  }

  // 加载动态值域列表
  loadDynamicDictList() {
    this.datasourceManageService.getDynamicDict(this.filterText, this.pageNo, this.pageSize)
      .then(res => {
        if (res['code'] === 10000) {
          this.dynamicDictList = res['data']['data'] || [];
          this.totalRecords = res['data']['total'] || 0;
        } else {
          this.showMessage('error', '', res['message'] || '加载动态值域列表失败');
        }
      })
      .catch(error => {
        this.showMessage('error', '', '加载动态值域列表失败');
        console.error('加载动态值域列表失败', error);
      });
  }

  // 懒加载数据处理
  loadLazy(event) {
    this.first = event.first;
    this.pageNo = Math.floor(event.first / event.rows) + 1;
    this.pageSize = event.rows;
    this.loadDynamicDictList();
  }

  // 新增动态值域
  addDynamicDict() {
    this.dialogTitle = '新增动态值域';
    // 初始化所有字段，包括隐藏字段的默认值
    this.editDynamicDict = {
      returnCode: 'code',
      returnName: 'name',
      returnExt1: '',
      returnExt2: '',
      displayContent: '{name}'
    };
    this.isNewRecord = true;
    this.displayDialog = true;
  }

  // 编辑动态值域
  editDynamicDictRow() {
    if (!this.selectedDynamicDict) {
      this.showMessage('warn', '', '请先选择一条记录');
      return;
    }
    this.dialogTitle = '编辑动态值域';
    this.editDynamicDict = { ...this.selectedDynamicDict };

    // 确保隐藏字段有默认值
    if (!this.editDynamicDict.returnCode) this.editDynamicDict.returnCode = 'code';
    if (!this.editDynamicDict.returnName) this.editDynamicDict.returnName = 'name';
    if (!this.editDynamicDict.displayContent) this.editDynamicDict.displayContent = '{name}';

    this.isNewRecord = false;
    this.displayDialog = true;
  }

  // 删除动态值域
  deleteDynamicDict() {
    if (!this.selectedDynamicDict) {
      this.showMessage('warn', '', '请先选择一条记录');
      return;
    }

    let me = this;
    this.confirmationService.confirm({
      header: '确认删除',
      icon: 'fa fa-trash',
      message: '确认删除吗？',
      accept: () => {
        me.datasourceManageService.delDynamicDict(me.selectedDynamicDict._id)
          .then(res => {
            if (res['code'] === 10000) {
              me.showMessage('success', '', '删除成功');
              me.loadDynamicDictList();
            } else {
              me.showMessage('error', '', res['message'] || '删除失败');
            }
          })
          .catch(error => {
            me.showMessage('error', '', '删除失败');
            console.error('删除失败', error);
          });
      }
    });
  }

  // 保存动态值域
  saveDynamicDict() {
    if (!this.validateDynamicDict()) {
      return;
    }

    // 初始化所有可能的字段，确保都会传递给后台
    const allFields = [
      'code', 'name', 'url', 'returnCode', 'returnName',
      'returnExt1', 'returnExt2', 'displayContent', 'tag', 'paramExample'
    ];

    // 复制当前编辑对象
    const saveData = {...this.editDynamicDict};

    // 新增时不传递编码，由后台自动生成
    if (this.isNewRecord) {
      delete saveData.code;
    }

    // 确保所有字段都存在，即使值为空
    allFields.forEach(field => {
      if (field === 'code' && this.isNewRecord) {
        return; // 新增时不需要设置code字段
      }

      // 设置隐藏字段的默认值（如果未设置）
      if (field === 'returnCode' && !saveData.returnCode) {
        saveData.returnCode = 'code';
      }
      if (field === 'returnName' && !saveData.returnName) {
        saveData.returnName = 'name';
      }
      if (field === 'displayContent' && !saveData.displayContent) {
        saveData.displayContent = '{name}';
      }

      // 如果字段不存在或为undefined，设置为空字符串
      if (saveData[field] === undefined) {
        saveData[field] = '';
      }
    });

    console.log('发送到后台的数据:', saveData);

    this.datasourceManageService.editorDynamicDict(saveData)
      .then(res => {
        if (res['code'] === 10000) {
          this.displayDialog = false;
          this.showMessage('success', '', '保存成功');
          this.loadDynamicDictList();
        } else {
          this.showMessage('error', '', res['message'] || '保存失败');
        }
      })
      .catch(error => {
        this.showMessage('error', '', '保存失败');
        console.error('保存失败', error);
      });
  }

  // 取消对话框
  cancelDialog() {
    this.displayDialog = false;
  }

  // 验证动态值域信息
  validateDynamicDict(): boolean {
    if (!this.isNewRecord && !this.editDynamicDict.code) {
      this.showMessage('warn', '', '请输入值域编码');
      return false;
    }
    if (!this.editDynamicDict.name) {
      this.showMessage('warn', '', '请输入值域名称');
      return false;
    }
    if (!this.editDynamicDict.url) {
      this.showMessage('warn', '', '请输入请求URL');
      return false;
    }
    return true;
  }

  // 过滤值域
  filterDynamicDict(event) {
    if (event.keyCode === 13) {
      this.pageNo = 1;
      this.first = 0;
      this.loadDynamicDictList();
    }
  }

  // 显示消息
  showMessage(severity: string, summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
    setTimeout(() => {
      this.msgs = [];
    }, 3000);
  }
}