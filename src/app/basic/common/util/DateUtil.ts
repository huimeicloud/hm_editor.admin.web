export class DateUtil {

  static dateToString(date: Date): string {
    return date.getFullYear().toString()
      + "-" + (date.getMonth() + 1).toString()
      + "-" + (date.getDate());
  }

  static getPreMonth(date: Date): Date {
    var t=date.getTime()-1000*60*60*24*30;
    var fullDate=new Date(t);
    var yearMonthDay=new Date(fullDate.getFullYear(),fullDate.getMonth(),fullDate.getDate());
    return yearMonthDay;
  }

  static calendarFormat(){
    return {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
  }

  static format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
      switch(a){
        case 'yyyy':
            return tf(t.getFullYear());              
        case 'MM':
            return tf(t.getMonth() + 1);
        case 'mm':
            return tf(t.getMinutes());
        case 'dd':
            return tf(t.getDate());
        case 'HH':
            return tf(t.getHours());
        case 'ss':
            return tf(t.getSeconds());
        default:
            break;    
      }
    })
  }

}
