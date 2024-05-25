import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { nprogress } from './nprogress'
import { flatttenMenusBreadcrumb } from './constantMenu'
import { getRoutesByMenu } from './getDynamicRoutes'
const { VITE_DYNAMIC_ROUTE_ON } = useEnvs()
console.log(generatedRoutes)

const filterRoutes = (origins: any[], filters: any[]) => {
    return origins.filter((f) =>
        filters.some((s) => s.path === f.path || f.path === '/' || f.path === '/404')
    )
}

//动态菜单
const finalRoutes = VITE_DYNAMIC_ROUTE_ON ? await getRoutesByMenu() : flatttenMenusBreadcrumb

const originFilterRoutes = filterRoutes(generatedRoutes, finalRoutes)
console.log(originFilterRoutes)

const routes = setupLayouts(originFilterRoutes) //变嵌套路由
console.log(routes)

const router = createRouter({
    history: createWebHistory(),
    routes
})

nprogress(router)

export default router
