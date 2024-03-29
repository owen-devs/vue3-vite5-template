export const useFormatDateTime = (date: Date, fmtStr: string): string => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const maps = {
        yyyy: year,
        yy: String(year).substring(2),
        MM: String(month).padStart(2, '0'),
        M: month,
        dd: String(day).padStart(2, '0'),
        d: day,
        HH: String(hour).padStart(2, '0'),
        H: hour,
        mm: String(minute).padStart(2, '0'),
        m: minute,
        ss: String(second).padStart(2, '0'),
        s: second
    }
    return fmtStr.replace(/(yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s)/g, (match) => maps[match])
}
