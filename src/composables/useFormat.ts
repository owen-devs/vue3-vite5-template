/**
 *时间格式化方法 YYYY-MM-DD HH:mm:ss
 * @param {Date} date 日期实例对象
 * @param {String} fmtStr 格式化字符串
 * @returns {String} 格式化后的日期字符串
 */
export function useFormat(date: Date, fmtStr: string): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const maps = {
        YYYY: String(year),
        YY: String(year).substring(2),
        MM: String(month).padStart(2, '0'),
        M: String(month),
        DD: String(day).padStart(2, '0'),
        D: String(day),
        HH: String(hour).padStart(2, '0'),
        H: String(hour),
        mm: String(minute).padStart(2, '0'),
        m: String(minute),
        ss: String(second).padStart(2, '0'),
        s: String(second)
    }
    return fmtStr.replace(/(YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s)/g, (match) => maps[match])
}
