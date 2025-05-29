import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import {WidgetsModule, ConfirmationService} from "portalface/widgets";
import { BusinessComponent } from './business.component';
import { SharedModule } from '../basic/shared/shared.module';
import { GrowlMessageService } from '../common/service/growl-message.service';
import { PublicCommService } from '../common/service/public-comm.service';
import { AllDatatsourceDpComponent, AllDatatsourceDpModule } from './all-datatsource-dp/all-datatsource-dp.component';


@NgModule({
  imports: [
    CommonModule,
    BusinessRoutingModule,
    WidgetsModule,
    HttpClientModule,
    AllDatatsourceDpModule,
    SharedModule
  ],
  declarations: [
    BusinessComponent
  ],
  providers: [
    GrowlMessageService,
    ConfirmationService,
    PublicCommService
  ]
})
export class BusinessModule { }
