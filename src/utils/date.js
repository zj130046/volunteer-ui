//时间转字符串
export function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

//字符串转时间
export function getDate(strDate) {
    var date = eval(
        "new Date(" +
        strDate
            .replace(/\d+(?=-[^-]+$)/, function (a) {
                return parseInt(a, 10) - 1;
            })
            .match(/\d+/g) +
        ")"
    );
    return date;
}

//数字日期转中文日期
export function CNDateString(date) {
    var today = date;
    var chinese = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var y = today.getFullYear().toString();
    var m = (today.getMonth() + 1).toString();
    var d = today.getDate().toString();
    var result = "";
    for (var i = 0; i < y.length; i++) {
        result += chinese[y.charAt(i)];
    }
    result += "年";
    if (m.length == 2) {
        if (m.charAt(0) == "1") {
            result += "十";
            if (m.charAt(1) != "0") {
                result += chinese[m.charAt(1)];
            }
            result += "月";
        }
    } else {
        result += (chinese[m.charAt(0)] + "月");
    }
    if (d.length == 2) {
        result += chinese[d.charAt(0)] + "十";
        if (d.charAt(1) != '0') {
            result += chinese[d.charAt(1)];
        }
        result += "日";
    } else {
        result += (chinese[d.charAt(0)] + "日");
    }
    return result.replace("月一十", "月十");
}