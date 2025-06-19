import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FolderComponent } from './folder/folder.component';
import { DatasourceComponent } from './datasource/datasource.component';
@NgModule({
    imports: [
      RouterModule.forChild([
        {
          path: '',
          component: FolderComponent
        }, {
          path: 'folder',
          component: FolderComponent
        }
      ])
    ]
  })
  export class ConsoleRoutingModule {}
