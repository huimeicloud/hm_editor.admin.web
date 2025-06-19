export class EmrRegion {
  regionName: string;
  description: string;
  editDate: Date;
  createDate: Date;

  constructor() {
    this.regionName = '';
    this.description = '';
    this.editDate = null;
    this.createDate = null;
  }
}
