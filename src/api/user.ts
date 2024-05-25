export function getCurrentUser(params: IterableIterableObject): Promise<any> {
    return request({
        url: '/user/getCurrentUser',
        method: 'get',
        params
    })
}
export function getUserInfo(params: IterableObject): Promise<any> {
    return request({
        url: '/user/getDetail',
        method: 'get',
        params
    })
}

export function getUserListByPage(params: IterableObject, data: IterableObject): Promise<any> {
    return new Promise((resolve) => {
        resolve({
            success: true,
            list: [{ id: 1, name: '测试名称', createTime: '2024-05-20 13:14:59' }]
        })
    })
    return request({
        url: '/user/queryPage',
        method: 'post',
        params,
        data
    })
}

export function createUser(data: IterableObject): Promise<any> {
    return request({
        url: '/user/createUser',
        method: 'post',
        data
    })
}

export function updateUser(data: IterableObject): Promise<any> {
    return request({
        url: '/user/updateUser',
        method: 'post',
        data
    })
}
export function deleteUser(params: IterableObject): Promise<any> {
    return request({
        url: '/user/deleteUser',
        method: 'get',
        params
    })
}
