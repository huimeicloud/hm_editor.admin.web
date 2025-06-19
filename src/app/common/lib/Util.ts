export class UtilTools {
  static deepCopyObjAndArray(obj) {
    let str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (JSON) {
      str = JSON.stringify(obj),
        newobj = JSON.parse(str);
    } else {
      for (const i in obj) {
        newobj[i] = typeof obj[i] === 'object' ?
          UtilTools.deepCopyObjAndArray(obj[i]) : obj[i];
      }
    }
    return newobj;
  }

  static getRegExp(str: string) {
    const specialArray = ['\\', '$', '(', ')', '*', '+', '.', '[', ']', '?', '^', '{', '}', '|'];
    for (const special of specialArray) {
      const _special = '\\' + special;
      str = str.replace(new RegExp(_special, 'g'), _special);
    }
    return new RegExp(str);
  }

  static prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  }

  public static get dataSourceTypeArray() {
    return [
      // {name: '文本输入框', code: 'textbox', hasItems: false, placeHolder: ''},
      {name: '新文本输入框', code: 'newtextbox', hasItems: false, placeHolder: ''},
      {name: '数字控件', code: 'numbox', hasItems: false, placeHolder: ''},
      {name: '文本控件', code: 'textboxwidget', hasItems: false, placeHolder: ''},
      {name: '单选', code: 'radiobox', hasItems: true, placeHolder: '选项1#选项2'},
      {name: '多选', code: 'checkbox', hasItems: true, placeHolder: '选项1#选项2'},
      {name: '下拉菜单', code: 'dropbox', hasItems: true, placeHolder: '显示1(内容1)#显示2(内容2)'},
      {name: '单元', code: 'cellbox', hasItems: false, placeHolder: ''},
      {name: '搜索', code: 'searchbox', hasItems: false, placeHolder: ''},
      {name: '时间', code: 'time', hasItems: false, placeHolder: ''},
      {name: '日期', code: 'date', hasItems: false, placeHolder: ''},
      {name: '月/日', code: 'month_day', hasItems: false, placeHolder: ''},
      {name: '日期 时间', code: 'datetime', hasItems: false, placeHolder: ''},
      {name: '时:分:秒', code: 'fullTime', hasItems: false, placeHolder: ''},
      {name: '年-月-日 时:分:秒', code: 'fullDateTime', hasItems: false, placeHolder: ''},
      {name: 'yyyy年MM月dd日', code: 'date_han', hasItems: false, placeHolder: ''},
      {name: 'yyyy年MM月dd日HH时mm分', code: 'datetime_han', hasItems: false, placeHolder: ''},
      {name: '按钮', code: 'button', hasItems: false, placeHolder: ''}
    ];
  }

  public static get searchOptionList() {
    return [
      {name: '手术名称', code: '手术名称'},
      {name: '手术编码', code: '手术编码'},
      {name: '诊断名称', code: '诊断名称'},
      {name: '诊断编码', code: '诊断编码'},
      {name: '损伤中毒外因名称', code: '损伤中毒外因名称'},
      {name: '损伤中毒外因编码', code: '损伤中毒外因编码'},
      {name: '病理诊断名称', code: '病理诊断名称'},
      {name: '病理诊断编码', code: '病理诊断编码'},
      {name: '中医诊断名称', code: '中医诊断名称'},
      {name: '中医诊断编码', code: '中医诊断编码'},
      {name: '医护名称', code: '医护名称'},
      {name: '职业资格编码', code: '职业资格编码'},
      {name: '科室名称', code: '科室名称'},
      {name: '科室代码', code: '科室代码'},
      {name: '地址名称', code: '地址名称'}
    ];
  }

}
