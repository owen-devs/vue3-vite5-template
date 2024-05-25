export function getOrgInfo(params: IterableObject): Promise<any> {
    return request({
        url: '/org/getOrg',
        method: 'get',
        params
    })
}

export function createOrg(data: IterableObject): Promise<any> {
    return request({
        url: '/org/create',
        method: 'post',
        data
    })
}

export function updateOrg(data: IterableObject): Promise<any> {
    return request({
        url: '/org/update',
        method: 'post',
        data
    })
}
export function deleteOrg(params: IterableObject): Promise<any> {
    return request({
        url: '/org/delete',
        method: 'get',
        params
    })
}

export function getOrgTopList(params: IterableObject, data: IterableObject): Promise<any> {
    return request({
        url: '/org/orgTopList',
        method: 'post',
        params,
        data
    })
}

export function getOrgTree(): Promise<any> {
    return request({
        url: '/org/orgTree',
        method: 'get'
    })
}

export function getOrgSubList(params: IterableObject): Promise<any> {
    return request({
        url: '/org/orgSubList',
        method: 'get',
        params
    })
}
