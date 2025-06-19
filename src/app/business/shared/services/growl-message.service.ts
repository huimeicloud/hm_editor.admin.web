import {Injectable} from '@angular/core';
import {GrowlMessageComponent} from '../growl-message/growl-message.component';
import {Message} from 'primeng/primeng';


/**
 * Popup，弹出提示层
 * Usage: 注入service后，调用open方法
 */
@Injectable()
export class GrowlMessageService {
  public static growlMessage: GrowlMessageComponent;

  constructor() {
  }

  showGrowl(growlMessage: Message) {
    GrowlMessageService.growlMessage.showGrowl(growlMessage);
  }

  showSuccess(detail: string) {
    GrowlMessageService.growlMessage.showGrowl({severity: 'success', detail: detail});
  }

  showWarning(detail: string) {
    GrowlMessageService.growlMessage.showGrowl({severity: 'warn', detail: detail});
  }

  showError(detail: string, error) {
    GrowlMessageService.growlMessage.showGrowl({
      severity: 'error',
      detail: detail + (error ? (error._body || error.data || error.message || error) : '稍后重试')
    });
  }
}
