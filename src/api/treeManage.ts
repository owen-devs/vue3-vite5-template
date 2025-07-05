export function saveTree(data: Record<string, any>): Promise<any> {
    return request({
        url: '/tree/saveEntity',
        method: 'post',
        data
    })
}

export function deleteTree(params: Record<string, any>): Promise<any> {
    return request({
        url: '/tree/delete',
        method: 'get',
        params
    })
}
