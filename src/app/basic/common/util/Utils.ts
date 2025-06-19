

  export class Utils {
    static deepCopyObjAndArray(obj: any) {
        let str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
          return;
        } else if (JSON) {
          str = JSON.stringify(obj),
            newobj = JSON.parse(str);
        } else {
          for (const i in obj) {
            if (obj.hasOwnProperty(i)) {
              newobj[i] = typeof obj[i] === 'object' ?
              Utils.deepCopyObjAndArray(obj[i]) : obj[i];
            }
          }
        }
        return newobj;
      }
  }
