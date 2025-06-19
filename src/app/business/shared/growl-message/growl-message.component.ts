import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/primeng';
import {GrowlMessageService} from '../services/growl-message.service';

@Component({
  selector: 'app-growl-message',
  templateUrl: './growl-message.component.html',
  styleUrls: ['./growl-message.component.scss']
})
export class GrowlMessageComponent implements OnInit {
  msgs: Message[] = [];

  constructor() {
  }

  ngOnInit() {
    GrowlMessageService.growlMessage = this;
  }

  showGrowl(growlMessage: Message) {
    this.msgs = [];
    this.msgs.push(growlMessage);
  }

}
