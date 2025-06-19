import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Message } from 'primeng/primeng';

@Injectable()
export class GrowlMessageService {
    static INFO = 'info';
    static SUCCESS = 'success';
    static WARNING = 'warn';
    static ERROR = 'error';

    private growlSubject = new Subject<Message>();
    constructor() { }

    /**
     * 获得提示广播对象
     */
    public getGrowlSubject(): Subject<Message> {
        return this.growlSubject;
    }

    /**
     * 更新提示消息
     * @param newMessage 新的提示消息
     */
    private _growlMessage(newMessage: Message): void {
        this.growlSubject.next(newMessage);
    }

    /**
     * 弹出提示信息
     * @param msg 提示信息
     * @param type 提示类型
     */
    private growlMessage(msg: string, type: string): void {
        let title = '';
        switch (type) {
            case GrowlMessageService.INFO:
                title = '提示';
                break;
            case GrowlMessageService.SUCCESS:
                title = '成功';
                break;
            case GrowlMessageService.WARNING:
                title = '警告';
                break;
            case GrowlMessageService.ERROR:
                title = '错误';
                break;
            default:
                title = '提示';
                break;
        }

        this._growlMessage(
            { severity: type, summary: title, detail: msg }
        );
    }

    /**
     * 提示成功信息
     */
    public showSuccessInfo(msg: string) {
        this.growlMessage(msg, GrowlMessageService.SUCCESS);
    }

    /**
     * 提示告警信息
     */
    public showWarningInfo(msg: string) {
        this.growlMessage(msg, GrowlMessageService.WARNING);
    }

    /**
     * 提示异常信息
     */
    public showErrorInfo(msg: string, error) {
      let newMsg = msg + (error ? (error.msg || error.message || error) : '网络失败');
        this.growlMessage(newMsg, GrowlMessageService.ERROR);
    }

    /**
     * 默认提示信息
     */
    public showDefaultInfo(msg: string) {
        this.growlMessage(msg, GrowlMessageService.INFO);
    }
    /**
     * 提示成功信息
     */
    public showSuccess(msg: string) {
        this.growlMessage(msg, GrowlMessageService.SUCCESS);
    }

    /**
     * 提示告警信息
     */
    public showWarning(msg: string) {
        this.growlMessage(msg, GrowlMessageService.WARNING);
    }

    /**
     * 提示异常信息
     */
    public showError(msg: string, error) {
      let newMsg = msg + (error ? (error.msg || error.message || error) : '网络失败');
        this.growlMessage(newMsg, GrowlMessageService.ERROR);
    }

    /**
     * 默认提示信息
     */
    public showDefault(msg: string) {
        this.growlMessage(msg, GrowlMessageService.INFO);
    }

    showGrowl(growlMessage: Message) {
        this.growlMessage(growlMessage.detail, growlMessage.severity);
  }
  // showGrowl(growlMessage: Message) {
  //   GrowlMessageService.growlMessage.showGrowl(growlMessage);
  // }

  // showSuccess(detail: string) {
  //   GrowlMessageService.growlMessage.showGrowl({severity: 'success', detail: detail});
  // }

  // showWarning(detail: string) {
  //   GrowlMessageService.growlMessage.showGrowl({severity: 'warn', detail: detail});
  // }

  // showError(detail: string, error) {
  //   GrowlMessageService.growlMessage.showGrowl({
  //     severity: 'error',
  //     detail: detail + (error ? (error.msg || error.message || error) : '网络失败')
  //   });
  // }
}
