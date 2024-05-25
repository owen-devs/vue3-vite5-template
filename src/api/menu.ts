export function getMenus(data: Object): Promise<any> {
    return request({
        url: '/menus/getMenusForRoutes',
        method: 'post',
        data
    })
}
