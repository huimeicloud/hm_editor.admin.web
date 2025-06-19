
import ObjectID from 'bson-objectid';


export class EmrTemplate {
    _id:ObjectID;
    templateName:string;
    version:number;
    description:string;
    fileID:string;
    status:string;
    editDate:Date;
    createDate:Date;
    createUser:string;
    isDel:string;
    templateTrueName:string;
    type:string;
    hosnum:string;
    hosname:string;
    inpType:string;
    disUserName:string;
    disTime:Date;
    editorDataSource:string;
    idStr:string;
    applySystem:string;


    constructor() {
        this.editDate = new Date();
        this.createDate = new Date();
        this.isDel = '0';
        this.status = '0';
        this.version = 0;
        this.hosname = '';
        this.hosnum = '';
    }
}
