import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GetTrueName} from "./get-true-name";



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GetTrueName
  ],
  declarations: [GetTrueName]
})
export class hmPipeModule { }
