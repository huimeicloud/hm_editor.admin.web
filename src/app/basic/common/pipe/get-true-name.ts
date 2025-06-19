import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name:'getTrueName'
})

export class GetTrueName implements PipeTransform{
  transform(templateName: string):string{

      if (templateName.indexOf('@') == -1) {
        console.log(templateName+':该病历命名不规范');
        return templateName;
      }else{
        let nameNoVersion = templateName.split('@')[0];   //不包含版本
        let nameArray = nameNoVersion.split('.');//标准化命名之后，每个病历名称的长度是确定的

        let standardName = nameArray[nameArray.length - 1];
        return standardName;
      }

  }
}
