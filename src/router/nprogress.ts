import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { VITE_APP_TITLE } = useEnvs()
//虚拟加载进度条
export function nprogress(router: any) {
    router.beforeEach((to, from, next) => {
        if (to.path !== from.path) {
            NProgress.start()
        }
        if (to.matched.length === 0) {
            next('/404')
        }
        if (to.meta.title) {
            document.title = VITE_APP_TITLE + '-' + to.meta.title
        }

        next() //进入下一个页面
    })

    router.afterEach(() => {
        NProgress.done()
    })
}
