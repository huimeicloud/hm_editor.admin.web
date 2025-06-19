import { Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { StorageCacheService } from "../common/service/storage-cache.service";
import { GrowlMessageService } from '../common/service/growl-message.service';
import { NavToggledService } from '../common/service/nav-toggled.service';

@Component({
  selector: 'hm-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  msgs: Message[];
  navDisplay:boolean = true;
  constructor(private navToggledService: NavToggledService,private storageCacheService:StorageCacheService, private growlMessageService: GrowlMessageService) { }

  ngOnInit() {
    this.navToggledService.getNavDisplaySub().subscribe(navDisplay => {
      this.navDisplay = navDisplay;
    });

    this.growlMessageService.getGrowlSubject().subscribe(
      massage => {
        this.msgs = [];
        this.msgs.push(massage);
      }
    );
  }
}
