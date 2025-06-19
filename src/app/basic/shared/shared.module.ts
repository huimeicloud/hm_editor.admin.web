import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonSidebarComponent } from '../common-sidebar/common-sidebar.component';
import { CommonFooterComponent } from '../common-footer/common-footer.component';
import { CommonFooterService } from '../common-footer/common-footer.service';
import { PrimengModule } from './primeng.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule
  ],
  declarations: [
    CommonSidebarComponent,
    CommonFooterComponent
  ],
  exports: [
    CommonSidebarComponent,
    CommonFooterComponent,
    RouterModule,
    PrimengModule
  ],
  providers: [
    CommonFooterService
  ]
})
export class SharedModule { }