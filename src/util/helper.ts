const toDateString = (value:number) => {
    const d = new Date(value);
    const year = `${d.getFullYear()}`;
    let month = `${d.getMonth() + 1}`;
    let date = `${d.getDate()}`;
    month = month.length === 1 ? `0${month}` : month;
    date = date.length === 1 ? `0${date}` : date;
    return [year, month, date].join('-');
};

const toShortDateString = (value:number) => {
    const d = new Date(value);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1);
    // return year + strings.get('ext.years') + month + strings.get('util.month');
    return year + month;
};

const toTimeString = (value:number, unit:string) => {
    const d = new Date(value);
    let hour = `${d.getHours()}`;
    let min = `${d.getMinutes()}`;
    let sec = `${d.getSeconds()}`;
    hour = hour.length === 1 ? `0${hour}` : hour;
    min = min.length === 1 ? `0${min}` : min;
    sec = sec.length === 1 ? `0${sec}` : sec;
    if (unit === 'minute') {
        return [hour, min].join(':');
    }
    return [hour, min, sec].join(':');
};


export default {
    date(value:number) {
        if (!value) return '-';
        return toDateString(value);
    },

    time(value:number, unit:string) {
        if (!value) return '';
        return toTimeString(value, unit);
    },
    monthDay(value:any) {
        let v = value;
        let arr = [];
        if (!v) return '';
        v = toDateString(value);
        arr = v.split('-');
        return `${arr[1]}-${arr[2]}`;
    },
    dateTime(value:number) {
        if (!value) return '';
        return `${toDateString(value)} ${toTimeString(value, '')}`;
    },

    dateMinute(value:number) {
        let v = value;
        if (!v) return '';
        v = Number(new Date(value).getTime());
        return `${toDateString(v)} ${toTimeString(v, 'minute')}`;
    },
    // xxxx年xx月
    yearMonth(value:any) {
        const v = value;
        if (!v) return '';
        return toShortDateString(value);
    },
    // value: yyyy-MM
    firstDay(value:any) {
        let v = value;
        if (!v) return '';
        v = Number(new Date(value).getTime());
        return toDateString(v);
    },
    // value: yyyy-MM
    lastDay(value:any) {
        const v = value;
        let tempDate;
        if (!v) return '';
        tempDate = new Date(value);
        tempDate.setMonth(tempDate.getMonth() + 1);
        tempDate = tempDate.getTime() - (1000 * 60 * 60 * 24);
        return toDateString(tempDate);
    },
    restoreNumber(value:any, n:number) {
        /* eslint-disable */
        if (value && !isNaN(n)) return value / n;
        return parseFloat((value / 100).toFixed(2));
    },

    // 数字保留n位小数点的时候
    restoreNumberFixed(val:number, m:number, n:number):string|number {
        let value;
        if (!val) return '-';
        if (val && n && m) {
            value = `${val / m}`;
            return value.indexOf('.') > 0 ? Number(value).toFixed(n) : Number(value);
        }
        value = `${val / 100}`;
        return value.indexOf('.') > 0 ? Number(value).toFixed(2) : Number(value);
    },
    // 数字保留n位小数点的时候 带提醒的
    restoreNumberFixedWarn(val:number, m:number, n:number, w:any) {
        let value;
        if (!val) return w;
        if (val && n && m) {
            value = `${val / m}`;
            return value.indexOf('.') > 0 ? Number(value).toFixed(n) : Number(value);
        }
        value = `${val / 100}`;
        return value.indexOf('.') > 0 ? Number(value).toFixed(2) : Number(value);
    },
    secondToMinute: function(time:number) {
        var second = time;
        var min = 0; // 分
        var hour = 0; // 小时
        var supple = function(str:number) {
            if (str <= 9) return '0' + str;
            return str;
        };
        if (!time) return '-';
        if (time >= 60) {
            second = parseInt((time % 60).toString());
            min = parseInt((time / 60).toString());
            if (min >= 60) {
                min = parseInt((time / 60).toString()) % 60;
                hour = parseInt((time / 60 / 60).toString());
            }
        }
        return supple(hour) + ':' + supple(min) + ':' + supple(second);
    },
    dateMinuteTrend: function(value:any) { // 按照动态时间格式化时间显示：今日、昨日等
        var v = value;
        if (!v) return '';
        if (!/^\d+$/.test(v)) v = v.replace(/-/g, '/');
        var date = new Date(v);
        v = Number(date.getTime());
        var todayDate = new Date();
        var days = parseInt(((todayDate.getTime() - v) / 86400000).toString());
        var today = todayDate.getDate();
        var year = date.getFullYear();
        var currentYear = todayDate.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var result, offset;
        offset = Math.abs(today - day);
        if (days < 2 && offset < 2 ) {
            if (offset === 0) {
                result = "今日 " + toTimeString(v, 'minute');
            } else if (offset === 1) {
                result = "昨日 " + toTimeString(v, 'minute');
            }
        } else if ( year === currentYear ) { // 同一年的显示：月-日 时：分
            result = month + "-" + day + ' ' + toTimeString(v, 'minute');
        } else { // 年-月-日 时：分
            result = toDateString(v) + ' ' + toTimeString(v, 'minute');
        }
        return result;
    },
    // 转时间戳
    dateToTimeMillis: function(value:any) {
        var v = value;
        if (!v) return 0;
        // 如果不是数值，那么就是已经格式化好的字符串
        // 兼容IE、fireFox处理
        if (!isNaN(new Date(v).getTime())) return new Date(v).getTime();
        return new Date(v.replace(/-/g, '/')).getTime();
    },
    // 秒转换成分钟
    secondsToMinutes: function(seconds:number) {
        return parseInt((seconds / 60).toString(), 10);
    },
    // 秒转换成分钟(忽略掉小时)
    secondsToMinutesWithIgnoreHours: function(seconds:number) {
        const minutes:any = this.secondsToMinutes(seconds);
        const hours:any = this.minutesToHours(minutes, true);
        return (minutes - (hours * 60));
    },
    secondsToHours: function(seconds:number) {
        return this.minutesToHours(this.secondsToMinutes(seconds), true);
    },
    secondsToHoursWithDecimal: function(seconds:number) {
        return this.minutesToHours(this.secondsToMinutes(seconds), false);
    },
    // 分钟转换成小时
    minutesToHours: function(minutes:number, isFixed:boolean) {
        return isFixed ? parseInt((minutes / 60).toString(), 10) : (minutes / 60).toFixed(2);
    },
  
    // 只保留小数点后1位
    clearDecimal: function(value:any) {
        var val = value;
        val = val.replace(/[^\d.]/g, '');  // 清除“数字”和“.”以外的字符
        val = val.replace(/^\./g, '');  // 验证第一个字符是数字而不是.
        val = val.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
        val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        val = val.replace(/^(-)*(\d+)\.(\d).*$/, '$1$2.$3');// 只能输入两个小数
        if (val.indexOf('.') < 0 && val !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            val = parseFloat(val);
        }
        return val;
    }
};
