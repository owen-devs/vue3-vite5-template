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
export function deepClone(arr: any[]): any[] | null {
    try {
        return JSON.parse(JSON.stringify(arr))
    } catch (err) {
        return null
    }
}

/**
 * 自动将文件大小转换成合适的带单位大小
 * @param byte {number} - 文件大小（B）
 * @returns
 */
export function autoCalcFileSize(byte: number) {
    const units = ['B', 'K', 'M', 'G', 'T']
    let i = 0,
        unit = units[0]
    while (byte >= 1024 && i < units.length - 1) {
        byte /= 1024
        i++
        unit = units[i]
    }

    const byteStr = byte.toString()
    const index = byteStr.indexOf('.')
    byte = index === -1 ? byte : parseFloat(byteStr.substring(0, index + 3))

    return `${byte}${unit}}`
}

/**
 * 根据编码读取txt文件
 * @param file {File} - 文件对象
 * @param encode {string} - 编码格式
 * @returns
 */
export function readTxtFile(file: File, encode: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            resolve(e.target?.result as string)
        }
        reader.onerror = (e) => {
            reject(e)
        }
        reader.readAsText(file, encode)
    })
}

/**
 * 用不同编码读取txt文件
 * @param file {File} - 文件对象
 * @param encodes {string[]} - 编码格式数组
 * @returns
 */
export async function readTxtByEncodes(
    file: File,
    encodes: string[] = ['UTF-8', 'GBK', 'GB2312']
): Promise<string> {
    for (const encode of encodes) {
        const text = await readTxtFile(file, encode)
        if (text && text.indexOf('�') > -1) {
            continue
        } else {
            return text
        }
    }
    return ''
}

/**
 * 将以逗号或者换行符分隔的字符串转为只用逗号分隔的字符串――去除空格和重复逗号
 * @param str {string} - 以逗号或者换行符分隔的字符串
 */
export function lineBreakToComma(str: string) {
    if (!str) return ''
    let text = ''
    if (str.includes('，')) {
        text = str.replace(/，/g, ',')
    } else if (str.includes('\r\n')) {
        text = str.replace(/\r\n/g, ',')
    } else if (str.includes('\n')) {
        text = str.replace(/\n/g, ',')
    } else if (str.includes('\r')) {
        text = str.replace(/\r/g, ',')
    } else if (str.includes('↵')) {
        text = str.replace(/↵/g, ',')
    }
    return text.replace(/,+/g, ',').replace(/^,|,$/g, '').replace(/\s+/g, '')
}

/**
 * 单例模式函数
 * @param {Function} fn - 要执行的函数
 */

export function singleton(fn: Function) {
    let instance: any
    const proxy = new Proxy(fn, {
        construct(target, args) {
            if (instance) {
                return instance
            }

            instance = Reflect.construct(target, args)
            return instance
        }
    })
    proxy.prototype.constructor = proxy

    return proxy
}

/**
 * 函数重载
 */

export function createOverload() {
    const fnMap = new Map<string, Function>()
    function overload(...args: any[]) {
        const key = args
            .map((it) => {
                typeof it
            })
            .join(',')
        const fn = fnMap.get(key)
        if (fn) {
            throw new Error('没有找到对应的实现')
        }
        return fn.apply(this, args)
    }

    overload.add = function (...args: any[]) {
        const fn = args.pop()
        if (typeof fn != 'function') {
            throw new Error('最后一个参数必须是函数')
        }

        const key = args.join(',')
        fnMap.set(key, fn)
    }
    return overload
}
