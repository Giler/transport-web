export default {
    getArrayItemById(array, id) {
        if (array && array.constructor == Array && array.length && id) {
            for (let i = 0, len = array.length; i < len; i++) {
                let item = array[i]
                if (item.id && item.id == id) {
                    return item
                }
            }
        }
        return null;
    },
    /**
     * 格式化日期
     * @method format
     * @static
     * @param {Date} d 日期对象
     * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
     * @return {string}  返回format后的字符串
     * @example
     var d=new Date();
        alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
        */
    formatDate(d, pattern) {
        pattern = pattern || 'yyyy-MM-dd';
        if (d.constructor !== Date) {
            d = new Date(d);
        }
        var y = d.getFullYear().toString();
        var o = {
                M: d.getMonth() + 1, //month
                d: d.getDate(), //day
                h: d.getHours(), //hour
                m: d.getMinutes(), //minute
                s: d.getSeconds() //second
            };
        pattern = pattern.replace(/(y+)/ig, function (a, b) {
            return y.substr(4 - Math.min(4, b.length));
        });
        for (var i in o) {
            pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
                return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
            });
        }
        return pattern;
    }
}
