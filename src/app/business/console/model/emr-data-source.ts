export class EmrDataSource {
  dataSourceName: string;
  templateName: string;
  key: string;
  typeCode: string;
  typeItems: string; // 选项

  placeholder: string;

  searchOption: string;
  searchPair: string;

  printReplacement: string;
  printMinWidth: string;
  printUnderline: string;
  printColor: string;
  printBorder: string;
  enterAutoGrow: string;
  autoshowcurtime: string;
  isdisabled: string;

  description: string;
  createDate: Date;
  editDate: Date;

  searchOptionObj: any;
  dataSourceType: any;
  printUnderlineObj: any;
  printColorObj: any;
  printBorderObj: any;
  enterAutoGrowObj: any;
  autoshowcurtimeObj: any;
  isdisabledObj: any;
  typeName: string;

  constructor() {
    this.dataSourceName = '';
    this.templateName = '';
    this.key = '';
    this.typeCode = '';
    this.typeItems = '';

    this.placeholder = '';

    this.searchOption = '';
    this.searchPair = '';

    this.printReplacement = '';
    this.printMinWidth = '';
    this.printUnderline = '0';
    this.printColor = '';
    this.printBorder = '';
    this.enterAutoGrow = '0';
    this.autoshowcurtime = '0';
    this.isdisabled = '0';


    this.description = '';
    this.editDate = null;
    this.createDate = null;

    //
    this.searchOptionObj = null;
    this.printUnderlineObj = null;
    this.printColorObj = null;
    this.printBorderObj = null;
    this.enterAutoGrowObj = null;
    this.autoshowcurtimeObj = null;
    this.isdisabledObj = null;
    this.dataSourceType = null;
    this.typeName = '';
  }
}
