class Once {
    res: any
    isFetching: boolean
    isSuccess: boolean
    queues: Function[]
    constructor() {
        this.res = null
        this.isFetching = false
        this.isSuccess = false
        this.queues = []
    }
    useOnceFn(funcName: Function, ...funcParams: any[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.isSuccess) {
                resolve(this.res)
                return
            }
            this.queues.push(resolve)
            if (!this.isFetching) {
                this.isFetching = true
                this.res = await funcName(...funcParams)
                this.loopQueues()
                this.isSuccess = true
            }
        })
    }
    loopQueues() {
        while (this.queues.length > 0) {
            const callback = this.queues.shift()
            callback?.(this.res)
        }
    }
}

const onceInstancePools: Record<string, Once> = {}

/**
 * 防止接口重复请求的方法<需保证方法名全局唯一>
 * @param {Function} funcName 方法名
 * @param {...Array<any>} funcParams  方法参数（剩余参数）,原方法怎么传，这里就怎么传
 * @description 适用于返回Promise的所有方法，支持多个方法
 * @example
 * 1、基本用法：
 * import {getUserList} from "@/api/user"
 * const res = await useOnceFn(getUserList, params, data)
 *
 * 2、多个方法
 * import {getUserList} from "@/api/user"
 * import {getOrgTree} from "@/api/org"
 *
 * const res1 = await useOnceFn(getUserList, params, data)
 * const res2 = await useOnceFn(getOrgTree)
 *
 * 3、用于async方法
 * async function demo(){...}
 * const res = await useOnceFn(demo)
 *
 * @returns {Promise<any>}
 */
export function useOnceFn(funcName: Function, ...funcParams: any[]): Promise<any> {
    if (!onceInstancePools[funcName.toString().replace(/[^a-zA-Z]/g, '')]) {
        onceInstancePools[funcName.toString().replace(/[^a-zA-Z]/g, '')] = new Once()
    }
    return onceInstancePools[funcName.toString().replace(/[^a-zA-Z]/g, '')].useOnceFn(
        funcName,
        ...funcParams
    )
}
