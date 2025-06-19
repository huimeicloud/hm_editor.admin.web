import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DatasourceSetComponent } from './datasource-set/datasource-set.component';
import { DatasourceComponent } from './datasource/datasource.component';
import { DatasourceDictComponent } from './datasource-dict/datasource-dict.component';
import { DynamicDictComponent } from './dynamic-dict/dynamic-dict.component';


@NgModule({
    imports: [
      RouterModule.forChild([
        {
          path: '',
          component: DatasourceSetComponent
        }, {
          path: 'datasource-set',
          component: DatasourceSetComponent
        }, {
          path: 'datasource',
          component: DatasourceComponent
        }, {
          path: 'datasource-dict',
          component: DatasourceDictComponent
        }, {
          path: 'dynamic-dict',
          component: DynamicDictComponent
        }
      ])
    ]
  })
  export class DatasourceManageRoutingModule {}
