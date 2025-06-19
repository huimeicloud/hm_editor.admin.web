import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {CommonModule} from '@angular/common';
// import {LoadingBarComponent} from './loading-bar/loading-bar.component';
// import {PopupComponent} from './popup/popup.component';
//import {LoadingBarService} from './services/loading-bar.service';
//import {PopupService} from './services/popup.service';
//import {providerHttp} from './services/customHttp';
import {GrowlMessageComponent} from './growl-message/growl-message.component';
import {GrowlMessageService} from './services/growl-message.service';
import {GrowlModule} from 'primeng/primeng';
//import {AuthService} from './services/auth.service';
//import {PermissionDirective} from './directives/permission.directive';
//import {AuthGuardLogin} from './services/auth-guard-login.service';
//import {EmrUserService} from '../user-manage/services/emr-user.service';
//import {JsonEditorComponent} from './json-editor/json-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    GrowlModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    //LoadingBarComponent,
    //PopupComponent,
    GrowlMessageComponent,
    //PermissionDirective,
    //JsonEditorComponent,
  ],
  declarations: [
    //LoadingBarComponent,
    //PopupComponent,
    GrowlMessageComponent,
    //PermissionDirective,
    //JsonEditorComponent,
  ],
  providers: [
    //LoadingBarService,
    //PopupService,
    GrowlMessageService,
    //AuthService,
    //AuthGuardLogin,
    //EmrUserService,
    // {
    //   provide: Http,
    //   useFactory: providerHttp,
    //   //deps: [XHRBackend, RequestOptions, LoadingBarService, PopupService]
    //   deps: [XHRBackend, RequestOptions]
    // }
  ]
})
export class SharedModule {
}
