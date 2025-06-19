import { Component, OnInit } from '@angular/core';
import { LoadingService } from "../../common/service/loading.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  // 标识
  showLoadingFlag = false;

  // 数量
  count = 0;
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.getLoadingState().subscribe((showLoading: boolean) => {
      if (showLoading) {
        this.openLoading();
      } else {
        this.showLoading();
      }
    });
  }


  /**
   * 显示加载动画
   */
  private openLoading() {
    if (!this.showLoadingFlag) {
      this.showLoadingFlag = true;
    }
    this.count++;
  }

  /**
   * 关闭加载动画
   */
  private showLoading() {
    this.count--;
    if (this.count <= 0) {
      this.showLoadingFlag = false;
      this.count = 0;
    }

  }
}
