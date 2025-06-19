import {EmrArea} from './emr-area';

export class EmrHospital {
  name: string;
  code: string;
  area: EmrArea;
  areaCode: string;
  hosCode: string;//院区编码
  isArea: boolean;
  isHospital: boolean;
  isDepartment: boolean;
  children: any[];
  editDate: Date;
  createDate: Date;

  constructor() {
    this.name = '';
    this.code = '';
    this.hosCode = '';
    this.area = new EmrArea();
    this.areaCode = '';
    this.isArea = false;
    this.isHospital = true;
    this.isDepartment = false;
    this.children = [];
    this.editDate = null;
    this.createDate = null;
  }
}
