export class EmrDept {
  name: any;
  code: any;
  isArea: any;
  isHospital: any;
  isDepartment: any;
  children: any;

  constructor() {
    this.name = null;
    this.code = null;
    this.isArea = false;
    this.isHospital = false;
    this.isDepartment = true;
    this.children = [];
  }
}
