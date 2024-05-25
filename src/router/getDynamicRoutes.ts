import { getMenus } from '@/api/menu'

export async function getRoutesByMenu() {
    const res = await getMenus({ userId: '123456' })
    const list = res?.list || []
    return filterRoutes(list)
}
/**
 * 接口获取的动态菜单数据，均为扁平数据
 * @param list
 * @returns
 */
function filterRoutes(list: any[]) {
    return list.filter((f) => f?.meta?.hidden != true)
}
