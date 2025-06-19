import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './basic/header/header.component';
import { PageNotFoundComponent } from './basic/page-not-found/page-not-found.component';
import { LoadingComponent } from './basic/loading/loading.component';
import { SharedModule } from './basic/shared/shared.module';

import { MainComponent } from './basic/main/main.component';
import { NavToggledService} from './common/service/nav-toggled.service'
import { LoadingService } from './common/service/loading.service';
import { StorageService } from './common/service/storage.service';
import { RouterService } from './common/service/router.service';
import { StorageCacheService } from './common/service/storage-cache.service';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HeaderComponent,
        LoadingComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        NavToggledService,
        LoadingService,
        StorageService,
        StorageCacheService,
        RouterService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
