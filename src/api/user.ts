import { request } from '@/utils/request'

export function getCurrentUser(params: Object): Promise<any> {
    return request({
        url: '/user/getCurrentUser',
        method: 'get',
        params
    })
}
export function getUserInfo(params: Object): Promise<any> {
    return request({
        url: '/user/getDetail',
        method: 'get',
        params
    })
}

export function getUserListByPage(params: Object, data: Object): Promise<any> {
    return request({
        url: '/user/queryPage',
        method: 'post',
        params,
        data
    })
}

export function createUser(data: Object): Promise<any> {
    return request({
        url: '/user/createUser',
        method: 'post',
        data
    })
}

export function updateUser(data: Object): Promise<any> {
    return request({
        url: '/user/updateUser',
        method: 'post',
        data
    })
}
export function deleteUser(params: Object): Promise<any> {
    return request({
        url: '/user/deleteUser',
        method: 'get',
        params
    })
}
