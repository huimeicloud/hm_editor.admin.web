import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { StorageCacheService } from "../../common/service/storage-cache.service";
import { RouterService } from "../../common/service/router.service";
import { CommonFooterService } from "../common-footer/common-footer.service";
import { NavToggledService } from '../../common/service/nav-toggled.service';

@Component({
  selector: 'hm-common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.scss']
})

export class CommonSidebarComponent implements OnInit {

  items:MenuItem[];
  navDisplay:boolean = true;
  activeLink:string = '';
  menuPopup:any = {
    top:0,
    label: '',
    popupDisplay: false
};
  constructor(
    private navToggledService: NavToggledService,
    private storageCacheService:StorageCacheService,
    private routerService:RouterService,
    private commonFooterService:CommonFooterService
  ) { }

  ngOnInit() {
    this.items = [
      {
        "label": "首页",
        // "icon": "icon iconfont icon-home",
        "url": "/main/business/welcome",
        "routerLink": "/main/business/welcome",
        "expanded": false,
        "visible": true
      },
      {
        "label":"模板管理",
        // "icon": "icon iconfont icon-edit1",
        "url": "",
        "routerLink": "",
        "expanded": true,
        "visible": true,
        "items": [
          {
            "label":"数据集",
            "icon":"",
            "routerLink":"/main/business/datasource/datasource-set",
            "expanded": false,
            "visible": true
          },{
            "label":"数据元",
            "icon":"",
            "routerLink":"/main/business/datasource/datasource",
            "expanded": false,
            "visible": true
          },{
            "label":"字典值域",
            "icon":"",
            "routerLink":"/main/business/datasource/datasource-dict",
            "expanded": false,
            "visible": true
          },{
            "label":"动态值域",
            "icon":"",
            "routerLink":"/main/business/datasource/dynamic-dict",
            "expanded": false,
            "visible": true
          },{
            "label":"模板制作",
            "icon":"",
            "routerLink":"/main/business/console/folder",
            "expanded": false,
            "visible": true
          }
        ]
      }
    ];

    // 立即保存菜单到本地存储，以便底部组件能够访问
    this.storageCacheService.localStorageCache.set('menu', this.items);

    this.navToggledService.getNavDisplaySub().subscribe(navDisplay => {
      this.navDisplay = navDisplay;
      this.menuPopup.popupDisplay = false;
    });

    // 检查当前URL是否是首页，如果是则选中首页菜单项
    const currentUrl = location.hash.substr(1);
    if (currentUrl === '/main/business/welcome' || currentUrl === '/main/business') {
      this.setItemActive(0, null, null);
      this.activeLink = '/main/business/welcome';
    }

    let urlParams = this.storageCacheService.sessionStorageCache.get('urlParams');
    let expandedIndex = null;

    if(expandedIndex !== null){
      this.setItemActive(expandedIndex, 0, undefined);
    }
  }

  menuItemClickHandler(event, menuitem) {
    if(!this.navDisplay) {
        const top=event.target.getBoundingClientRect().top;
        this.menuPopup.top=top-90;
        if(this.menuPopup.label != menuitem.label) {
            this.menuPopup.popupDisplay = true;
        } else {
            this.menuPopup.popupDisplay = !this.menuPopup.popupDisplay;
        }

        this.menuPopup.label = menuitem.label;
    }
}

  handleClick(event, item, index, childIndex, grandchildIndex) {

    // 如果该选项被禁止、则return
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    // 修改折叠、展开状态
    if (item && item.items && item.items.length > 0) {
      item.expanded = !item.expanded;
    }
    // 确保一级标签只有一个是展开状态
    for (let i = 0; i < this.items.length; i++) {
      if (i !== index) {
        this.items[i].expanded = false;
      }
    }
    if(!this.navDisplay){
      this.menuItemClickHandler(event,item);
    }
    // 处理点击跳转事件
    if (!item.url) {
      event.preventDefault();
    } else {
      this.setItemActive(index, childIndex, grandchildIndex);
    }
    if (!item.routerLink) {
      event.preventDefault();
    } else {
      this.storageCacheService.localStorageCache.set('item',item);
      this.storageCacheService.localStorageCache.set('index',index);
      this.storageCacheService.localStorageCache.set('childIndex',childIndex);
      this.storageCacheService.localStorageCache.set('grandchildIndex',grandchildIndex);
      this.setItemActive(index, childIndex, grandchildIndex);
      let menuData = {};
      menuData['text'] = item.label;
      menuData['URL'] = item.routerLink;

      // 标记首页
      if (item.routerLink === '/main/business/welcome') {
        menuData['isHomePage'] = true;
      }

      let menus = this.commonFooterService.footer.menus;
      let isExist = false;
      for(let i=0;i<menus.length;i++){
        let menu = menus[i];
        if(menu['URL']==menuData['URL']){
          isExist = true;
          this.commonFooterService.footer.selectedIndex = i;
        }
      }
      if(!isExist){
        menus.push(menuData);
        this.commonFooterService.footer.selectedIndex = menus.length-1;
        this.commonFooterService.footer.firstOpenMove();
      }else{
        this.commonFooterService.footer.clickMove();
      }
      this.activeLink = item.routerLink;
      this.routerService.gotoPage(item.routerLink);//页面跳转
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }
  }

  /**
   *
   * @param index 一级菜单下标
   * @param childIndex 二级菜单下标
   * @param grandchildIndex 三级菜单下标
   */
  public setItemActive(index, childIndex, grandchildIndex) {
    // 确保一级标签只有一个是展开状态
    for (let i = 0; i < this.items.length; i++) {
      if (i !== index) {
        this.items[i].expanded = false;
      }
    }
  }

}
