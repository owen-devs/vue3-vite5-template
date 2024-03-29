import { request } from '@/utils/request'

export function getProcessList(params: Object, data: Object): Promise<any> {
    return request({
        url: '/getMenusForRoutes',
        method: 'post',
        data
    })
}
