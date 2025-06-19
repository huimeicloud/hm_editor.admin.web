import { HttpClientModule } from '@angular/common/http';
import { FolderService } from './folder.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FolderComponent } from './folder/folder.component';
import { DatasourceComponent } from './datasource/datasource.component';
import { ConsoleRoutingModule } from './console-routing.module';
import { DataSourceService } from './data-source.service';
import { TemplateService } from './template.service';
import { LoadingService } from './../../common/service/loading.service';
import { hmPipeModule } from './../../basic/common/pipe/hm-pipe.module';
import { PrimengModule } from '../../basic/shared/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    hmPipeModule
  ],
  declarations: [FolderComponent, DatasourceComponent],
  providers: [FolderService, DataSourceService, TemplateService, LoadingService]
})
export class ConsoleModule { }
