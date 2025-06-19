import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {
    constructor(private router: Router) { }

    /**
     * 导航到指定路由
     * @param commands 路由路径
     * @param extras 额外参数
     */
    navigate(commands: any[], extras?: any): Promise<boolean> {
        return this.router.navigate(commands, extras);
    }

    /**
     * 导航到指定页面
     * @param url 页面路径
     * @param params 参数
     */
    gotoPage(url: string, params?: any): Promise<boolean> {
        if (params) {
            return this.router.navigate([url], { queryParams: params });
        } else {
            return this.router.navigate([url]);
        }
    }
}