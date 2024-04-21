/**
 * 将对象转换为 FormData 对象
 * @param { any } params 要转换的对象
 * @returns 转换后的 FormData 对象
 */
export function paramsToFormData(params: any): FormData {
    const formData = new FormData()
    for (const k in params) {
        formData.append(k, params[k])
    }
    return formData
}
/**
 * 设置URLSearchParams对象并返回新的URL字符串
 * @param { string } urlString - URL字符串
 * @param { any } params - 要设置的参数对象
 * @returns { string }设置参数后的新的URL字符串
 */
export function setURLSearchParams(urlString: string, params: any) {
    const url = new URL(urlString)
    const searchParams = new URLSearchParams(url.search)
    for (const k in params) {
        !['', undefined, null].includes(params[k]) && searchParams.set(k, params[k])
    }
    url.search = searchParams.toString()
    return url.href
}

/**
 * 合并URL字符串
 * @param { string[] } ...urls 可变参数: URL字符串参数
 * @returns { string } 合并后的URL字符串
 */
export function joinURLString(...urls: string[]): string {
    let baseUrl = urls[0]
    for (let i = 1; i < urls.length; i++) {
        if (baseUrl.endsWith('/') && urls[i].startsWith('/')) {
            baseUrl += urls[i].slice(1)
        } else if (baseUrl.endsWith('/') || urls[i].startsWith('/')) {
            baseUrl += urls[i]
        } else {
            baseUrl += '/' + urls[i]
        }
    }
    return baseUrl
}

/**
 *时间格式化方法
 * @param {Date} date 日期实例对象
 * @param {String} fmt 格式化字符串
 * @returns {String} 格式化后的日期字符串
 */
export function formatDateTime(date: Date, fmt: string) {
    const year = date.getFullYear()
    const ye = String(year).substring(2)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const maps = {
        yyyy: String(year),
        yy: ye,
        MM: String(month).padStart(2, '0'),
        M: String(month),
        dd: String(day).padStart(2, '0'),
        d: String(day),
        HH: String(hour).padStart(2, '0'),
        H: String(hour),
        mm: String(minute).padStart(2, '0'),
        m: String(minute),
        ss: String(second).padStart(2, '0'),
        s: String(second)
    }
    return fmt.replace(/yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s/g, (match) => maps[match])
}
