import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
//import generatedRoutes from "~pages"
import { nprogress } from './nprogress'

console.log(generatedRoutes)

const routes = setupLayouts(generatedRoutes) //变嵌套路由
console.log(routes)

//动态菜单TODO

const router = createRouter({
    history: createWebHistory(),
    routes
    //routes: [
    //  {
    //    path: '/',
    //    name: 'home',
    //    component: HomeView
    //  },
    //  {
    //    path: '/about',
    //    name: 'about',
    //    // route level code-splitting
    //    // this generates a separate chunk (About.[hash].js) for this route
    //    // which is lazy-loaded when the route is visited.
    //    component: () => import('../views/AboutView.vue')
    //  }
    //]
})

nprogress(router)

export default router
