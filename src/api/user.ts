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
        setTimeout(() => {
            let list = []
            for (let i = 0; i < params.pageSize; i++) {
                list.push({ id: i, name: `测试名称${i}`, createTime: '2025-01-01 12:00:00' })
            }
            resolve({
                success: true,
                list
            })
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
