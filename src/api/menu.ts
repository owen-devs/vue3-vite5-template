export function getMenus(data: Object): Promise<any> {
    return request({
        url: '/getMenusForRoutes',
        method: 'post',
        data
    })
}
