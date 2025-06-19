import { Component, OnInit } from '@angular/core';
import { CommonFooterService } from "./common-footer.service";
import { NavToggledService } from '../../common/service/nav-toggled.service';
import { StorageService } from '../../common/service/storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hm-common-footer',
  templateUrl: './common-footer.component.html',
  styleUrls: ['./common-footer.component.scss']
})
export class CommonFooterComponent implements OnInit {
  moveLength:String;
  imgIdex:boolean = false;
  mouseOverIndex:number;
  navDisplay:boolean = true;
  constructor(
    private navToggledService: NavToggledService,
    private commonFooterService: CommonFooterService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient) { }

  menus=[];
  selectedIndex=0;

  items=[];

  ngOnInit() {
    this.commonFooterService.footer = this;
    const that = this;
    this.navToggledService.getNavDisplaySub().subscribe(navDisplay => {
      this.navDisplay = navDisplay;
    });
    setTimeout(function () {
      that.loadMenu();
    }, 500);
  }

  loadMenu() {
    let leftMenu = this.storageService.getLocalStorage('menu');

    // 始终添加首页标签
    let homeTab = {
      'text': '首页',
      'URL': '/main/business/welcome',
      'isHomePage': true
    };
    this.menus.push(homeTab);

    // 添加当前页面标签（如果不是首页）
    let currentUrl = location.hash.substr(1);
    if (currentUrl !== '/main/business/welcome' && currentUrl !== '/main/business') {
      let menuData = {};

      // 检查URL是否包含console/folder
      if(location.hash.indexOf('console/folder') > -1) {
        // 如果是模板制作页面，直接设置正确的页签
        menuData['text'] = '模板制作';
        menuData['URL'] = '/main/business/console/folder';
        this.menus.push(menuData);
      } else if(currentUrl.split('/').length-1 < 4 && leftMenu && leftMenu.length > 0 && leftMenu[0].items && leftMenu[0].items.length > 0){
        // 添加安全检查，确保 leftMenu 存在且有值
        menuData['text'] = leftMenu[0].items[0].label;
        menuData['URL'] = leftMenu[0].items[0].routerLink;
        this.menus.push(menuData);
      } else if(leftMenu && leftMenu.length > 0) {
        // 添加安全检查，确保 leftMenu 存在且有值
        let foundMenuItem = false;

        for(let i=0; i < leftMenu.length; i++){
          if(leftMenu[i].items && leftMenu[i].items.length > 0){
            for(let j=0; j < leftMenu[i].items.length; j++){
              if(leftMenu[i].items[j].routerLink == currentUrl){
                menuData['text'] = leftMenu[i].items[j].label;
                menuData['URL'] = leftMenu[i].items[j].routerLink;
                this.menus.push(menuData);
                foundMenuItem = true;
                break;
              }
            }
            if(foundMenuItem) break;
          } else if(leftMenu[i].routerLink == currentUrl) {
            menuData['text'] = leftMenu[i].label;
            menuData['URL'] = leftMenu[i].routerLink;
            this.menus.push(menuData);
            foundMenuItem = true;
            break;
          }
        }
      }
    }

    // 设置选中的标签
    if (currentUrl === '/main/business/welcome' || currentUrl === '/main/business') {
      this.selectedIndex = 0; // 选中首页
    } else {
      this.selectedIndex = this.menus.length > 1 ? 1 : 0; // 如果有其他标签则选中，否则选中首页
    }
  }

  menuClick(index){
    this.selectedIndex = index;
    this.storageService.setLocalStorage('selectedStatus', "");
  }

  closeMenu(index){
    // 检查是否为首页标签，如果是则不允许关闭
    if (this.menus[index] && this.menus[index]['isHomePage']) {
      return; // 不关闭首页标签
    }

    this.menus.splice(index, 1);
    if(index==this.selectedIndex){
      if(this.menus.length>0){
        if(!this.menus[this.selectedIndex]){
          this.selectedIndex--;
        }
        this.router.navigateByUrl(this.menus[this.selectedIndex]['URL']);
      }
    }else if(index<this.selectedIndex){
      this.selectedIndex--;
    }
  }
// 通过头部一级菜单，点开二级菜单时首次打开时，可能会由于已经打开的二级菜单过多，页面展示不全，需要移动。
  firstOpenMove(){
    let footerMune = document.querySelector('#footerMenu');
    let commonFooter = document.querySelector('.common-footer');
    let outerWidth = footerMune['offsetWidth'] + 140;
    let visibleWidth = commonFooter['offsetWidth'] - 20 * 2;
    if(outerWidth > visibleWidth){
      let needToMoveWidth = visibleWidth - outerWidth;
      this.moveLength = 'translateX(' + needToMoveWidth  + 'px)';
    }
  }

  //头部已有该菜单，点击时滚动至该菜单处
  clickMove(){
    let currentMenuRight=(this.menus.length-this.selectedIndex)*142;
    let currentMenuLeft=this.selectedIndex*142;
    let footerMune = document.querySelector('#footerMenu');
    let outerWidth = footerMune['offsetWidth'];
    let commonFooter = document.querySelector('.common-footer');
    let visibleWidth = commonFooter['offsetWidth'] - 20 * 2;
    if(currentMenuLeft<visibleWidth){
      this.moveLength = 'translateX(0px)';
    }else if(currentMenuRight>visibleWidth){
      this.moveLength = 'translateX(' + this.selectedIndex*-142  + 'px)';
    }else{
      let needToMoveWidth = visibleWidth - outerWidth;
      this.moveLength = 'translateX(' + needToMoveWidth  + 'px)';
    }
}

  leftMoveMenu(){
    let footerMune = document.querySelector('#footerMenu');
    let commonFooter = document.querySelector('.common-footer');
    let outerWidth = footerMune['offsetWidth'];
    let visibleWidth = commonFooter['offsetWidth'] - 20 * 2;
    if(outerWidth > visibleWidth){
      let needToMoveWidth = visibleWidth - outerWidth;
      this.moveLength = 'translateX(' + needToMoveWidth  + 'px)';
    }
  }

  rightMoveMenu(){
      this.moveLength = 'translateX(0px)';
  }

  mouseOver(index){
    this.mouseOverIndex = index;
  }

  mouseLeave(){
    this.mouseOverIndex = -1;
  }

}
