import { Component, Input, OnInit, Output, EventEmitter, NgModule, forwardRef } from '@angular/core';
import { DatasourceManageService } from '../datasource-manage/datasource-manage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/primeng';

@Component({
  selector: 'hm-all-datatsource-dp',
  templateUrl: './all-datatsource-dp.component.html',
  styleUrls: ['./all-datatsource-dp.component.scss'],
  providers: [DatasourceManageService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AllDatatsourceDpComponent),  // replace name as appropriate
      multi: true
    }
  ]
})
export class AllDatatsourceDpComponent implements OnInit, ControlValueAccessor {

  get value(){
    return this.selDs;
  }

  set value(v){
    this.selDs = v;
  }

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };
  @Input() width = '140px';
  @Input() height = '22px';
  selDs: any;
  filterDs: any = [];
  searchDsTimeout: any;

  @Input() notShowCode:any = [];

  ngOnInit() {
  }

  constructor(private dsMangeService: DatasourceManageService) { }
  filterDsFun(event) {
    if (this.searchDsTimeout) {
      clearTimeout(this.searchDsTimeout);
    }
    let text = event.query || '';
    var th = this;
    this.searchDsTimeout = setTimeout(function () {
      th.searchDs(text);
    }, 200);
  }
  searchDs(text) {
    if(text){
      text = encodeURI(text);
    }
    this.dsMangeService.getDatasource(text, 1, 100).then(d => {
      this.filterDs = (d['data']['data'] || []).filter(d => this.notShowCode.indexOf(d['code']) == -1);
    })
  }
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
  selDsFun() {
    this.value = this.selDs;
    this.onModelChange(this.value);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule, AutoCompleteModule],
  exports: [AllDatatsourceDpComponent],
  declarations: [AllDatatsourceDpComponent]
})
export class AllDatatsourceDpModule { }