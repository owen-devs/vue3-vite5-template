import { getMenus } from '@/api/menu'

export async function getRoutesByMenu() {
    const res = await getMenus({ userId: '123456' })
    const list = res?.list || []
    return filterRoutes(list)
}

function filterRoutes(list: any[]) {
    return list.map((v) => {
        return {}
    })
}
