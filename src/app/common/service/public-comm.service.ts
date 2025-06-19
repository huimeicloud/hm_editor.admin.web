import {Injectable, OnDestroy, Renderer2} from '@angular/core';
import {StorageCacheService} from '../service/storage-cache.service';

// 公共方法
@Injectable()
export class PublicCommService {

    constructor(public storageservice: StorageCacheService) {
    }

    /**
     * 获取服务器时间
     */
    // public getServerTime(callbackfn: (date: Date) => void) {
    //     let url = 'Documents/Norm/Common?Msg=GetDatabaseTime';
    //     this.httpUtil.post(url, {},
    //         data => {
    //             if (data.success) {
    //                 callbackfn(new Date(data.ResultValue));
    //             } else {
    //                 this.showMsg('error', '错误', '获取服务器时间失败');
    //             }
    //         });
    // }

    /**
     * 获取系统主键序列
     */
    // public getNewId(callbackfn) {
    //     let url = 'Documents/Norm/Common?Msg=GetNewID';
    //     this.httpUtil.post(url, {},
    //         data => {
    //             if (data.success) {
    //                 callbackfn(data.ResultValue);
    //             } else {
    //                 this.showMsg('error', '错误', '获取系统主键序列失败');
    //             }
    //         });
    // }


    /***
     * localStorage写入缓存
     * @param {string} key
     * @param value
     */
    public setStorageCache(key: string, value: any) {
        let localStorage: any = this.storageservice.localStorageCache.get('rnsStorage');
        if (!localStorage) {
            localStorage = {};
        }
        localStorage[key] = value;
        this.storageservice.localStorageCache.set('rnsStorage', localStorage);
    }

    /***
     * localStorage获取值
     * @param {string} key
     * @returns {any}
     */
    public getStorageCache(key: string) {
        let localStorage: any = this.storageservice.localStorageCache.get('rnsStorage');
        if (localStorage) {
            return localStorage[key];
        } else {
            return null;
        }

    }

    /***
     * 移除区域文书缓存
     */
    public removeAllLocalStorage() {
        this.storageservice.localStorageCache.remove('rnsStorage');
    }

    /**
     * 根据键值移除对应缓存
     * @param {string} key
     */
    public removeStorageByKey(key: string) {
        let localStorage: any = this.storageservice.localStorageCache.get('rnsStorage');
        if (localStorage) {
            delete localStorage[key];
        }
        this.storageservice.localStorageCache.set('rnsStorage', localStorage);
    }

    /***
     * 判断缓存信息是否为空
     */
    public isEmptyToCache() {
        let isEmpty = false;
        let user: any = this.getStorageCache('userInfo');
        if (user === null || user === undefined || user === '' || user.USER_ID === null || user.USER_ID === undefined || user.USER_ID === '') {
            isEmpty = true;
        }
        return isEmpty;
    }

    /***
     * 计算表格高度
     * @param boolean[] hasFooter 表格是否包含底部
     * @param boolean[] headerHeight 表格包含顶部按钮高度
     * @returns string[]对应高度
     */
    public calcTableBodyHeight(hasBreadcrumb: boolean[] = [true], hasFooter: boolean[], headerHeightArr: number[] = []) {
        let titleHeight = 43; // 顶部按钮默认高度
        let headerHeight = 37; // 表格头部高度
        let footerHeight = 49; // 表格底部高度 61
        let fontSize = this.getStorageCache('fontSize');
        if (fontSize === '12px') {
            titleHeight = 43;
            headerHeight = 32;
            footerHeight = 42;
        } else if (fontSize === '16px') {
            titleHeight = 43;
            headerHeight = 41;
            footerHeight = 54;
        } else if (fontSize === '18px') {
            titleHeight = 43;
            headerHeight = 46;
            footerHeight = 61;
        }
        let breadcrumbHeight = 45;
        let fatherDoms: HTMLCollectionOf<Element> = document.getElementsByClassName('tableFather'); // 页面中参考高度DOM
        let heightResult: string[] = []; // 结果
        let bread = document.getElementsByClassName('ui-breadcrumb');
        if (bread.length > 0) {
            for (let i = 0; i < hasBreadcrumb.length; i++) {
                hasBreadcrumb[i] = false;
            }
        }
        for (let index = 0; index < fatherDoms.length; index++) {
            let buttonHeight: number = headerHeightArr[index] === undefined ? titleHeight : headerHeightArr[index]; // 每一个表格顶部按钮高度
            if (hasFooter[index]) {
                if (headerHeightArr[index]) {
                    if (hasBreadcrumb[index]) {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - buttonHeight - headerHeight - breadcrumbHeight - footerHeight + 'px';
                    } else {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - buttonHeight - headerHeight - footerHeight + 'px';
                    }
                } else {
                    if (hasBreadcrumb[index]) {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - headerHeight - breadcrumbHeight - footerHeight + 'px';
                    } else {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - headerHeight - footerHeight + 'px';
                    }
                }
            } else {
                if (headerHeightArr[index]) {
                    if (hasBreadcrumb[index]) {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - buttonHeight - breadcrumbHeight - headerHeight + 'px';
                    } else {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - buttonHeight - headerHeight + 'px';
                    }
                } else {
                    if (hasBreadcrumb[index]) {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - breadcrumbHeight - headerHeight + 'px';
                    } else {
                        heightResult[index] = fatherDoms[index]['offsetHeight'] - headerHeight + 'px';
                    }
                }
            }
        }
        return heightResult;
    }

    /**
     * 切换病人或模块时判断界面是否可以离开，在需要离开校验的模块中实现
     */
    public leaveCheckFn() {
        return true;
    }

    /**
     * 保存用户离开的操作，校验失败确认离开时使用的方法
     */
    public saveLeaveFn() {

    }

    /**
     * 切换科室时刷新模块的方法，在各个模块中实现
     */
    public changeDeptRefreshFn() {
    }

    /**
     * 修改字体大小时刷新模块的方法，在各个模块中实现
     */
    public changeFontsizeRef() {
    }

    /**
     * 切换显示面包屑
     * @param flag 是否显示
     */
    public changeShowBreadcrumb(flag) {
    }

    /**
     * 切换显示病人快速选择框
     * @param flag 是否显示
     */
    public changeShowQuitePatient(flag) {
    }

    /**
     * 切换至首页查询提醒数据
     */
    public changeMianPage() {
    }

    /**
     * 全科体征提醒选择时间点
     */
    public selectRemindSign() {
    }

    /**
     * 获取字典列表
     * @param param
     */
    // public getDictInfoGrid(param, dictCODE) {
    //     let url = 'SystemManagement/Norm/Dict?';
    //     this.httpUtil.post(url,
    //         {
    //             Msg: 'getDictInfoGrid',
    //             dictCODE: dictCODE,
    //             hosNum: this.getStorageCache('hospital').HOSNUM,
    //             productCode: this.getStorageCache('sysFlag')
    //         },
    //         data => {
    //             if (data.success) {
    //                 param.getDictInfoGridSuccess(data.ResultValue);
    //             } else {
    //                 param.getDictInfoGridError('查询失败');
    //             }
    //         }, (msg) => {
    //             param.getDictInfoGridError(msg);
    //         }
    //     );
    // }

    /**
     * 根据字典编号获取相关字典数据
     * @param {any} pointer
     * @param {string} haveAll 是否有全部
     * @param {string} dictIdStrs 字典ID字符串
     * @param {string} isAllDict true 显示所有的字典，不过滤不启用的 false 过滤不启用的字典
     * @returns {any[]}
     */
    // public getDictItemByDictId(pointer: any, haveAll: boolean, dictIdStrs: string, isAllDict: boolean[]) {
    //     let url = 'SystemManagement/Norm/Dict?Msg=getDictItemByDictId';
    //     let dictItem = [];
    //     this.httpUtil.post(url,
    //         {
    //             dictCODE: dictIdStrs,
    //             hosNum: this.getStorageCache('hospital').HOSNUM,
    //             productCode: this.getStorageCache('sysFlag')
    //         },
    //         data => {
    //             if (data.success) {
    //                 this.dealDictItemData(pointer, data.ResultValue, haveAll, dictIdStrs, isAllDict);

    //             } else {
    //                 this.showMsg('error', '错误', '获取字典失败！');
    //             }
    //         }, (msg) => {
    //             this.showMsg('error', '错误', msg);
    //         }
    //     );
    // }

    /**
     * 根据传递的参数处理返回的数据集
     * @param pointer
     * @param {any[]} data
     * @param {boolean} haveAll
     * @param {boolean} isAllDict 是否过滤不启用的字典
     */
    public dealDictItemData(pointer: any, data: any[], haveAll: boolean, dictIdStrs: string, isAllDict: boolean[]) {
        let dictItemArr = new Array();
        let dictIdArr = dictIdStrs.split(',');

        for (let i = 0; i < dictIdArr.length; i++) {
            let arr = [];
            data.forEach(function (item) {
                // 过滤不启用的字典
                if (!isAllDict[i]) {
                    if ((item.DICT_CODE.toString() === dictIdArr[i]) && (item.IS_USE === '1')) {
                        arr.push({label: item.ITEM_NAME, value: item.ITEM_CODE, remark: item.备注});
                    }
                } else { // 不过滤不启用的字典
                    if (item.DICT_CODE.toString() === dictIdArr[i]) {
                        arr.push({label: item.ITEM_NAME, value: item.ITEM_CODE, remark: item.备注});
                    }
                }

            });
            dictItemArr.push(arr);
        }
        pointer.getCommonDictData(dictItemArr);
    }

    // ===================修改treeTable数据后，保留之前的子项打开状态和滚动条位置=======================
    public setWidget(beforeNodes, nodes) {
        this.scrollTreeBody();
        // let widgetExpand = {};
        // this.getWidgetExpand(widgetExpand, beforeNodes);
        // this.serializeNodes(widgetExpand, nodes);
        return nodes;
    }

    // 获取treeTable之前的子项打开状态
    // getWidgetExpand(widgetExpand, nodes) {
    //     if (nodes && nodes.length) {
    //         for (let node of nodes) {
    //             if (!widgetExpand.hasOwnProperty(node.data['_id'])) {
    //                 widgetExpand[node.data['_id']] = node.expanded;
    //             }
    //             this.getWidgetExpand(widgetExpand, node.children);
    //         }
    //     }
    // }

    // 保留treeTable之前的子项打开状态
    // serializeNodes(widgetExpand, nodes) {
    //     if (nodes && nodes.length) {
    //         for (let node of nodes) {
    //             if (widgetExpand.hasOwnProperty(node['_id'])) {
    //                 node.expanded = widgetExpand[node['_id']];
    //             }
    //             this.serializeNodes(widgetExpand, node.children);
    //         }
    //     }
    // }

    // 保留treeTable之前的滚动条位置
    scrollTreeBody() {
        let fatherDom = document.getElementById('treeTableFather');
        if (fatherDom) {
            let dom = fatherDom.getElementsByClassName('ui-treetable-scrollable-body');
            if (dom && dom[0]) {
                let scrollTop = dom[0].scrollTop;
                setTimeout(() => {
                    dom[0].scrollTop = scrollTop;
                });
            }
        }
    }

    // 重置treeTable之前的滚动条位置
    resetScrollTreeBody() {
        let fatherDom = document.getElementById('treeTableFather');
        if (fatherDom) {
            let dom = fatherDom.getElementsByClassName('ui-treetable-scrollable-body');
            if (dom && dom[0]) {
                dom[0].scrollTop = 0;
            }
        }
    }
}
