import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../basic/shared/primeng.module';

import { LoadingService } from './../../common/service/loading.service';
import { DatasourceSetComponent } from './datasource-set/datasource-set.component';
import { DatasourceComponent } from './datasource/datasource.component';
import { DatasourceManageRoutingModule } from './datasource-manage-routing.module';
import { DatasourceDictComponent } from './datasource-dict/datasource-dict.component';
import { DatasourceManageService } from './datasource-manage.service';
import { AllDatatsourceDpModule } from '../all-datatsource-dp/all-datatsource-dp.component';
import { DynamicDictComponent } from './dynamic-dict/dynamic-dict.component';

@NgModule({
  imports: [
    CommonModule,
    DatasourceManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    HttpModule,
    AllDatatsourceDpModule
  ],
  declarations: [DatasourceDictComponent, DatasourceSetComponent, DatasourceComponent, DynamicDictComponent],
  providers: [LoadingService, DatasourceManageService, DatePipe]
})
export class DatasourceManageModule { }
