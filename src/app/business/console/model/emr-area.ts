import {EmrRegion} from './emr-region';
import {EmrHospital} from './emr-hospital';

export class EmrArea {
  areaName: string;
  areaCode: string;
  region: EmrRegion;
  description: string;
  hospitals: EmrHospital[];
  editDate: Date;
  createDate: Date;

  //
  treeJson: {};
  selectable: boolean;

  constructor() {
    this.areaName = '';
    this.areaCode = '';
    this.description = '';
    this.region = new EmrRegion();
    this.hospitals = [];
    this.editDate = null;
    this.createDate = null;

    //
    this.treeJson = null;
    this.selectable = true;
  }
}
