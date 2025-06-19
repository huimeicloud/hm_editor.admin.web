
import ObjectID from 'bson-objectid';

export class BasFolder {
  _id:ObjectID;
  idStr:string;
  name:string;
  order:number;
}
