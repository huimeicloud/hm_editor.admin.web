import { FolderService } from './../folder.service';
import { Component, OnInit } from '@angular/core';
import { GrowlMessageService } from '../../../common/service/growl-message.service';
import { EmrBaseTemplate } from '../model/emr-base-template';
import { PageClazz } from '../../../common/model/page-clazz';
import { LoadingService } from '../../../common/service/loading.service';
import * as _ from 'underscore';

import { Utils } from '../../../basic/common/util/Utils';
import { ConfirmationService } from 'primeng/primeng';

declare const HMEditorLoader: any;

@Component({
  selector: 'hm-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  treeNodes:object[];
  curFolder:object;

  emrBaseTemplateList: EmrBaseTemplate[] = [];
  searchParams = {page: new PageClazz(), folder: '', templateName: ''};
  first: number = 0;
  templateSearchName: String;
  emrBaseTemplate:EmrBaseTemplate;
  isCreateEmrBaseTemplate = false;
  displayEmrBaseTemplateDialog = false;
  templateTypeList = [
    {name: '住院', code: '住院'},
    {name: '门诊', code: '门诊'},
    {name: '急诊', code: '急诊'},
  ];
  searchTemplateTypeList = [{name: '请选择', code: ''}].concat(this.templateTypeList);
  folderList = [];
  editorNameFlag:boolean;
  currentUserInfo: any;
  hosnum: string;

  dsSet:any[] = [];
  selSet:any;
  dsSetObj:object = {};
  constructor(private folderService:FolderService,private growlMessageService: GrowlMessageService,private loadingService: LoadingService,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllFolders();
    this.initAllDsSet();
    this.getDynamicDict();
  }
  getAllFolders(){
    this.folderList = [];
    this.treeNodes = [];
    this.folderService.getAllFolders().then(d => {
      if(d.code == 10000){
        this.treeNodes = d.data.reduce((p,c) => {
          // 保存_id字段的副本，避免删除后无法访问
          const originalId = c['_id'];
          delete c['_id'];
          
          // 简化数据结构，只保留必要的字段
          const folderItem = {
            "label": c.name || '',
            "value": c.idStr || '',
            "folder": c.name || '',
            "idStr": c.idStr || '',
            "_id": originalId
          };
          
          this.folderList.push(folderItem);
          let _d = {"name":c.name,"value":c};
          p.push(_d);
          return p;
        },[]);      
        if(this.treeNodes.length > 0){
        this.curFolder = this.treeNodes[0];
        this.getEmrBaseTemplateList('');
      }
      }else{
        console.log('获取目录异常：'+d.msg);
      }
    }).catch(e => {

      console.log('获取目录异常：'+e);
    })
  }
  initAllDsSet(){
    // 初始化数据集
    this.folderService.publishedDsSet().then(res => {
      if(res['code'] != 10000){
        this.growlMessageService.showErrorInfo('获取数据集列表异常','');
        return;
      }

      this.dsSet = [];

      this.dsSetObj = {};
      (res.data || []).forEach(c => {
        this.dsSet.push({"label":c['name'],"value":c['code']});
        this.dsSetObj[c['code']] = c['name'];
      });
      // this.dsSet = (res.data || []).reduce((p,c) => {
      //   p.push({"label":c['name'],"value":c['code']});
      //   return p;
      // },[])
    })
  }
  nodeSelect($event){
    this.curFolder = $event;
    this.searchParams = {page: new PageClazz(), folder: '', templateName: ''};
    this.templateSearchName = '';
    this.getEmrBaseTemplateList('');
  }
  mup(cur){
    let next = cur - 1;
    let p = [{"idStr":this.treeNodes[cur]['value']['idStr'],"order":cur},{"idStr":this.treeNodes[next]['value']['idStr'],"order":cur + 1}];
    this.move(cur,next,p);
  }
  mdown(cur){
    let next = cur + 1;
    let p = [{"idStr":this.treeNodes[cur]['value']['idStr'],"order":next + 1},{"idStr":this.treeNodes[next]['value']['idStr'],"order":next}];
    this.move(cur,next,p);
  }
  move(cur,next,p){
    const treeNodesClone = [...this.treeNodes];
    [treeNodesClone[cur], treeNodesClone[next]] = [treeNodesClone[next], treeNodesClone[cur]];
    this.folderService.move(p).then(d => {
      if(d.code == 10000){
        this.treeNodes = treeNodesClone;
      }else{
        this.growlMessageService.showErrorInfo('移动失败!','');
      }

    })
  }
  // 模板目录

  loadCarsLazy(evt: any) {
    if (evt && evt.first >= 0 && evt.rows) {
      this.searchParams.page.currentPage = (evt.first / evt.rows) + 1;
    }else if (!evt) {
      this.first = 0;
    }
    this.getEmrBaseTemplateList('');
  }
  getEmrBaseTemplateList(searchName) {
    if(!this.curFolder){
      return;
    }
    this.searchParams.folder = this.curFolder['value']['idStr'];
    this.searchParams.templateName = searchName;
    this.loadingService.show();
    this.folderService.searchBaseTemplateListByParams(this.searchParams)
      .then(
        data => {
          if (data && data.code == '10000') {
            const tmpData = data.data || {};
            this.emrBaseTemplateList = tmpData.dataList || [];
            this.searchParams.page = tmpData.page || new PageClazz();
            this.first = 0;
          } else {
            this.growlMessageService.showErrorInfo('', data ? (data.msg || '获取模板列表失败') : '获取模板列表失败');
          }
        },
        (err) => {
          this.growlMessageService.showErrorInfo('获取模板列表失败：', err);
        }
      ).then(() => {
        this.loadingService.hide();
      });
  }

  showDialogToCreateEmrBaseTemplate() {
    this.editorNameFlag = false;
    this.isCreateEmrBaseTemplate = true;
    this.emrBaseTemplate = new EmrBaseTemplate();
    if (!_.isEmpty(this.treeNodes)) {
      this.emrBaseTemplate.folderStr = this.curFolder['value']['idStr'];
      // 修复：使用与folderList匹配的数据结构
      this.emrBaseTemplate.folder = {
        "label": this.curFolder['value']['name'],
        "value": this.curFolder['value']['idStr'],
        "folder": this.curFolder['value']['name'],
        "idStr": this.curFolder['value']['idStr'],
        "_id": this.curFolder['value']['_id']
      };
    }
    this.emrBaseTemplate.typeObject = this.templateTypeList[0];
    this.displayEmrBaseTemplateDialog = true;
  }
  saveEmrBaseTemplate() {
    if(!this.emrBaseTemplate.templateName){
      this.growlMessageService.showWarningInfo('模板名称不能为空');
      return;
    }

    if((this.emrBaseTemplate.dsSet || []).length == 0 && this.emrBaseTemplate.templateName != '体温单' && this.emrBaseTemplate.templateName != '新生儿体温单'){
      this.growlMessageService.showWarningInfo('数据集不能为空');
      return;
    }
    this.emrBaseTemplate.type = this.emrBaseTemplate.typeObject.code;
    // 修复：确保正确访问folder的idStr属性
    this.emrBaseTemplate.folderStr = (this.emrBaseTemplate.folder as any)['idStr'];

    if (this.isCreateEmrBaseTemplate) {
      this.folderService.addBaseTemplate(this.emrBaseTemplate,this.hosnum)
        .then(
          (data) => {
            if (data && data.code == '10000') {
              this.displayEmrBaseTemplateDialog = false;
              this.getEmrBaseTemplateList('');
              this.growlMessageService.showSuccessInfo('新建模板成功！');
            } else {
              this.growlMessageService.showErrorInfo('新建模板失败', data ? data.msg : '新建模板失败');
            }
          },
          (err) => {
            this.growlMessageService.showErrorInfo('新建模板失败：', err);
          }
        );
    } else {
      this.folderService.editBaseTemplate(this.emrBaseTemplate,this.hosnum)
        .then(
          (data) => {
            if (data && data.code == '10000') {
              this.displayEmrBaseTemplateDialog = false;
              this.getEmrBaseTemplateList('');
              this.growlMessageService.showSuccessInfo('编辑模板成功！');
            } else {
              this.growlMessageService.showErrorInfo('', data ? data.msg : '编辑模板失败');
            }
          },
          (err) => {
            this.growlMessageService.showErrorInfo('编辑模板失败：', err);
          }
        );
    }
  }
  showDialogToEditEmrBaseTemplate(emrBaseTemplate) {
    this.isCreateEmrBaseTemplate = false;
    this.emrBaseTemplate = <EmrBaseTemplate>Utils.deepCopyObjAndArray(emrBaseTemplate);
    this.emrBaseTemplate.typeObject = _.find(this.templateTypeList, type => {
      return type.code === emrBaseTemplate.type;
    }) || this.templateTypeList[0];
    this.displayEmrBaseTemplateDialog = true;
  }
  removeEmrBaseTemplate(emrBaseTemplate: EmrBaseTemplate) {
    this.confirmationService.confirm({
      message: `确定删除模板${emrBaseTemplate.templateName}?`,
      header: '删除模板',
      icon: 'fa fa-trash',
      accept: () => {
        this.folderService.deleteBaseTemplate(emrBaseTemplate).then(
          (data) => {
            if (data && data.code == '10000') {
              this.getEmrBaseTemplateList('');
              this.growlMessageService.showSuccessInfo(`删除模板${emrBaseTemplate.templateName}成功！`);
            } else {
              this.growlMessageService.showErrorInfo(`删除模板${emrBaseTemplate.templateName}失败`, data ? data.msg : '');
            }
          },
          (err) => {
            this.growlMessageService.showErrorInfo(`删除模板${emrBaseTemplate.templateName}失败：`, err);
          });
      }
    });
  }
  searchName() {
    let searchName = this.templateSearchName;
    this.searchParams.page.currentPage = 1;
    this.first = 0 ;
    this.getEmrBaseTemplateList(searchName);
  }
  formatDSet(dsSet){
    if(!dsSet || dsSet.length == 0){
      return '';
    }

    let names = [];
    dsSet.forEach(e => {
      if(this.dsSetObj[e]){

        names.push(this.dsSetObj[e]);
      }
    });

    return names.join(',');
  }
  editorDisplay = false;
  editorTemplateName = '';
  editorId = '';
  dynamicDictList = [];
  editorInstance: any; // 保存编辑器实例的引用

  // 制作模板
  makeTemplate(template) {
    this.editorDisplay = true;
    this.editorTemplateName = template.templateName;

    this.getBaseTemplateHtml(template.idStr, template.templateName, (htmlData) => {
      this.getTemplateDs(template.templateName, (datasources) => {
        setTimeout(() => {
          this.createTab(this.editorTemplateName, template.idStr, datasources, [
            {
              "code": template.idStr,
              "docContent": htmlData
            }
          ]);
        }, 10);
      });
    });
  }

  // 打开文件选择对话框
  importTemplate() {
    const fileInput = document.getElementById('fileImport') as HTMLInputElement;
    fileInput.click();
  }

  // 处理文件导入
  handleFileImport(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // 检查文件类型，排除二进制文件
    if (file.type && !file.type.startsWith('text/') &&
       !['application/json', 'application/xml', 'application/javascript', 'application/typescript'].includes(file.type)) {
      // 对于没有明确类型的文件，通过扩展名判断
      const fileExt = file.name.split('.').pop().toLowerCase();
      const textExtensions = ['txt', 'html', 'htm', 'xml', 'json', 'js', 'ts', 'css', 'scss', 'less', 'md', 'svg', 'vue', 'jsx', 'tsx'];

      if (!textExtensions.includes(fileExt)) {
        this.growlMessageService.showErrorInfo('文件类型不支持', '请选择文本文件');
        event.target.value = '';
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;

      // 简单检查内容是否包含不可打印字符（二进制文件的特征）
      if (this.containsBinaryContent(content)) {
        this.growlMessageService.showErrorInfo('文件内容不支持', '请选择纯文本文件');
        event.target.value = '';
        return;
      }

      try {
        // 获取当前编辑的模板ID
        const templateId = this.editorId.replace('editor_', '');

        // 组装JSON参数，确保包含code字段
        const docContent = [
          {
            "code": templateId,
            "docContent": content
          }
        ];

        // 调用编辑器实例的setDocContent方法
        if (this.editorInstance) {
          this.editorInstance.setDocContent(docContent);
          this.growlMessageService.showSuccessInfo('导入成功！');
        } else {
          this.growlMessageService.showErrorInfo('编辑器实例未初始化', '请先等待编辑器加载完成');
        }
      } catch (error) {
        console.error('导入文件内容错误:', error);
        this.growlMessageService.showErrorInfo('导入失败', '文件内容格式不正确');
      }

      // 清空文件输入，以便再次选择同一文件
      event.target.value = '';
    };

    reader.onerror = () => {
      this.growlMessageService.showErrorInfo('导入失败', '读取文件时发生错误');
      event.target.value = '';
    };

    reader.readAsText(file);
  }

  // 导出模板
  exportTemplate() {
    if (!this.editorInstance) {
      this.growlMessageService.showErrorInfo('导出失败', '编辑器实例未初始化');
      return;
    }

    try {
      // 获取当前编辑的模板ID
      const templateId = this.editorId.replace('editor_', '');

      // 调用编辑器实例的getDocHtml方法获取内容
      const docContent = this.editorInstance.getDocHtml(templateId);

      if (docContent && docContent.length > 0 && docContent[0]['html']) {
        // 创建Blob对象
        const blob = new Blob([docContent[0]['html']], { type: 'text/html' });

        // 创建下载链接
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${'模板_' + (this.editorTemplateName || 'template')}.html`;

        // 模拟点击下载
        document.body.appendChild(a);
        a.click();

        // 清理
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.growlMessageService.showSuccessInfo('导出成功！');
      } else {
        this.growlMessageService.showErrorInfo('导出失败', '未获取到模板内容');
      }
    } catch (error) {
      console.error('导出模板内容错误:', error);
      this.growlMessageService.showErrorInfo('导出失败', '处理模板内容时发生错误');
    }
  }

  // 检查内容是否包含二进制数据
  containsBinaryContent(text: string): boolean {
    // 检查是否包含不可打印字符（ASCII控制字符，不包括常见的换行、制表符等）
    const controlChars = text.match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g);
    // 如果包含较多控制字符，可能是二进制文件
    return controlChars && controlChars.length > text.length * 0.05; // 如果控制字符超过5%，认为是二进制
  }

  // 创建编辑器
  createTab(title,id, datasources, content) {
    this.editorId = 'editor_' + id;
    const _this = this;  // 保存 this 引用
    try {
        // 创建编辑器
        HMEditorLoader.createEditorAsync({
          container: "#editorContainer",
          sdkHost: window.location.protocol + '//' + window.location.host + '/hmEditor',
          style: {
              width: '100%',
              height: '100%',
              border: '1px solid #ddd'
          },
          editorConfig: {
              // 编辑器配置项
          },
          // 模式设置
          designMode: true,  // 是否启用设计模式
          reviseMode: false,  // 是否启用修订模式
          readOnly: false,     // 是否启用只读模式
          customParams: {     // 自定义参数

          }
        })
        .then(function(result) {
            // 编辑器初始化完成
            var editorInstance = result;
            _this.editorInstance = editorInstance; // 保存编辑器实例

            if (content) {
              // 如果有内容，则设置文档内容
              editorInstance.setDocContent(content);
              editorInstance.setTemplateDatasource({
                'datasource': datasources,
                'dynamicDict': _this.dynamicDictList || []
              });
              editorInstance.onToolbarCommandComplete = function(command, type, data) {
                // 根据命令类型执行不同操作
                if (command === 'save') {
                  console.log('保存命令执行完成');
                  let obj = editorInstance.getDocHtml(id);
                  if(obj && obj.length > 0){
                    _this.saveBaseTemplateHtml({id: id, html: obj[0]['html']});
                  }
                }
              };
            } else {
                // 否则设置默认内容
                editorInstance.editor.setData(`<p style='height:300px;position:relative;'>这是${title}的内容</p>`);
            }
        })
        .catch(function(error) {
            console.error("编辑器初始化失败:", error);
        });
    } catch (error) {
        console.error('创建编辑器失败:', error);
        throw error;
    }
  }

  // 关闭编辑器
  backToList() {
    this.editorDisplay = false;
    this.editorInstance = null; // 清空编辑器实例引用
    HMEditorLoader.destroyEditor(this.editorId);
  }

  /**
   * 获取模板数据集
   * @param templateName 模板名称
   * @param callback 回调函数
   */
  getTemplateDs(templateName: string, callback?: (data: any) => void) {
    this.loadingService.show();
    this.folderService.getTemplateDs(templateName)
      .then(data => {
        this.loadingService.hide();
        if (data && data.code === 10000) {
          if (callback) {
            callback(data.data);
          }
        } else {
          this.growlMessageService.showErrorInfo('获取模板数据集失败', data ? data.msg : '');
        }
      })
      .catch(error => {
        this.loadingService.hide();
        this.growlMessageService.showErrorInfo('获取模板数据集失败', error);
        return null;
      });
  }

  /**
   * 获取动态字典数据
   */
  getDynamicDict() {
    this.loadingService.show();
    this.folderService.getDynamicDict()
      .then(data => {
        this.loadingService.hide();
        if (data && data.code === 10000) {
          this.dynamicDictList = data['data'] || [];
        } else {
          this.growlMessageService.showErrorInfo('获取动态字典失败', data ? data.msg : '');
        }
      })
      .catch(error => {
        this.loadingService.hide();
        this.growlMessageService.showErrorInfo('获取动态字典失败', error);
      });
  }
  // 获取模板HTML
  getBaseTemplateHtml(id: string, templateName: string, callback?: (htmlData: any) => void) {
    this.loadingService.show();
    this.folderService.getBaseTemplateHtml(id)
      .then(data => {
        this.loadingService.hide();
        if (data && data.code === 10000) {
          if (callback) {
            callback(data.data);
          }
        } else {
          callback("");
          // this.growlMessageService.showErrorInfo('获取模板HTML失败', data ? data.msg : '');
        }
      })
      .catch(error => {
        this.loadingService.hide();
        this.growlMessageService.showErrorInfo('获取模板HTML失败', error);
      });
  }
  // 保存模板HTML
  saveBaseTemplateHtml(params: { id: string, html: string }) {
    this.folderService.saveBaseTemplateHtml(params)
      .then(data => {
        if (data && data.code === 10000) {
          this.growlMessageService.showSuccessInfo('保存模板HTML成功！');
        } else {
          this.growlMessageService.showErrorInfo('保存模板HTML失败', data ? data.msg : '');
        }
      })
      .catch(error => {
        this.growlMessageService.showErrorInfo('保存模板HTML失败', error);
      });
  }
}
