import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './basic/page-not-found/page-not-found.component';
import {MainComponent} from "./basic/main/main.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: 'main', component: MainComponent,
              children:[
                { path: '', redirectTo: 'business/welcome', pathMatch: 'full' },
                {path:'business',loadChildren: './business/business.module#BusinessModule'},
                { path: '**', component: PageNotFoundComponent }
              ]},

        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
