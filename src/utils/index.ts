/**
 * 将对象转换为 FormData 对象
 * @param { IterableObject } params 要转换的对象
 * @returns 转换后的 FormData 对象
 */
export function paramsToFormData(params: IterableObject): FormData {
    const formData = new FormData()
    for (const k in params) {
        formData.append(k, params[k])
    }
    return formData
}
/**
 * 设置URLSearchParams对象并返回新的URL字符串
 * @param { string } urlString - URL字符串
 * @param { IterableObject } params - 要设置的参数对象
 * @returns { string }设置参数后的新的URL字符串
 */
export function setURLSearchParams(urlString: string, params: IterableObject) {
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
        if (baseUrl[baseUrl.length - 1] === '/' && urls[i][0] === '/') {
            baseUrl += urls[i].slice(1)
        } else if (baseUrl[baseUrl.length - 1] === '/' || urls[i][0] === '/') {
            baseUrl += urls[i]
        } else {
            baseUrl += '/' + urls[i]
        }
    }
    return baseUrl
}

/**
 * 深度拷贝
 * @param arr
 * @returns
 */
export function deepClone(arr: any[]): any[] {
    return JSON.parse(JSON.stringify(arr))
}
