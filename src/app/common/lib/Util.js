"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UtilTools = /** @class */ (function () {
    function UtilTools() {
    }
    UtilTools.deepCopyObjAndArray = function (obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        }
        else if (JSON) {
            str = JSON.stringify(obj),
                newobj = JSON.parse(str);
        }
        else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    UtilTools.deepCopyObjAndArray(obj[i]) : obj[i];
            }
        }
        return newobj;
    };
    UtilTools.getRegExp = function (str) {
        var specialArray = ['\\', '$', '(', ')', '*', '+', '.', '[', ']', '?', '^', '{', '}', '|'];
        for (var _i = 0, specialArray_1 = specialArray; _i < specialArray_1.length; _i++) {
            var special = specialArray_1[_i];
            var _special = '\\' + special;
            str = str.replace(new RegExp(_special, 'g'), _special);
        }
        return new RegExp(str);
    };
    UtilTools.prefixInteger = function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    };
    Object.defineProperty(UtilTools, "dataSourceTypeArray", {
        get: function () {
            return [
                // { name: '文本输入框', code: 'textbox', hasItems: false, placeHolder: '' },
                { name: '新文本输入框', code: 'newtextbox', hasItems: false, placeHolder: '' },
                { name: '单选', code: 'radiobox', hasItems: true, placeHolder: '选项1#选项2' },
                { name: '多选', code: 'checkbox', hasItems: true, placeHolder: '选项1#选项2' },
                { name: '下拉菜单', code: 'dropbox', hasItems: true, placeHolder: '显示1(内容1)#显示2(内容2)' },
                { name: '单元', code: 'cellbox', hasItems: false, placeHolder: '' },
                { name: '搜索', code: 'searchbox', hasItems: false, placeHolder: '' },
                { name: '时间', code: 'time', hasItems: false, placeHolder: '' },
                { name: '日期', code: 'date', hasItems: false, placeHolder: '' },
                { name: '月/日', code: 'month_day', hasItems: false, placeHolder: '' },
                { name: '日期 时间', code: 'datetime', hasItems: false, placeHolder: '' },
                { name: '按钮', code: 'button', hasItems: false, placeHolder: '' }
            ];
        },
        enumerable: true,
        configurable: true
    });
    return UtilTools;
}());
exports.UtilTools = UtilTools;
