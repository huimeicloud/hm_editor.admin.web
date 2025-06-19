import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavToggledService {
    private navDisplaySubject = new Subject<boolean>();
    constructor() { }

    /**
     * 获得菜单隐藏显示对象
     */
    getNavDisplaySub(): Subject<boolean> {
        return this.navDisplaySubject;
    }

    /**
     * 切换菜单状态
     * @param display nav显示状态
     */
    changeNavDisplay(display: boolean): void {
        this.navDisplaySubject.next(display);
    }
}
