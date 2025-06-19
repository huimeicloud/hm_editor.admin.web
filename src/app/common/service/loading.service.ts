import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/**
 * 加载状态
 */
@Injectable()
export class LoadingService {
    private loadingSubject = new Subject<boolean>();
    loadingState = this.loadingSubject.asObservable();

    constructor() { }

    /**
     * 获得加载多路推送对象
     */
    getLoadingState(): Observable<boolean> {
        return this.loadingState;
    }

    /**
     * 切换加载状态
     * @param showLoading 是否处于加载状态
     */
    show() {
        this.loadingSubject.next(true);
    }

    hide() {
        this.loadingSubject.next(false);
    }
}
