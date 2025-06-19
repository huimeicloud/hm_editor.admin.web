
import ObjectID from 'bson-objectid';
import { DropDownClazz } from '../../../common/model/dropdown-class';

export class EmrBaseTemplate {
    _id?: ObjectID;
    templateName?: string;
    isForbidMultiple?: string;
    type?: string;
    folder?: object;
    createDate?: Date;
    editDate?: Date;

    typeObject?: DropDownClazz;
    idStr:string;
    folderStr:string;
    folderId?: ObjectID;
    applySystem:string

    dsSet:any;
    constructor() {
       
        this.templateName = '';
        this.isForbidMultiple = '0';
        this.type = '';
       
        this.editDate = new Date();
        this.createDate = new Date();

        this.typeObject = null;
    }
}
