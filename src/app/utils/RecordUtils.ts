export class RecordUtils {
    public static getRealNameInfo(templateName):string {
    if (templateName && templateName.indexOf('@') == -1) {
      const template_name=templateName;
      return template_name;
    }else{
      const nameNoVersion = templateName.split('@')[0];   //不包含版本
      const nameArray = nameNoVersion.split('.');//标准化命名之后，每个病历名称的长度是确定的
      const template_name = nameArray[nameArray.length - 1];
      return template_name;
    }
  }
}