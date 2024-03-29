import NProgress from 'nprogress'
//虚拟加载进度条
export function nprogress(router: any) {
    router.beforeEach((to, from, next) => {
        if (to.path !== from.path) {
            NProgress.start()
        }
        if (to.meta.title) {
            document.title = import.meta.env.VITE_APP_TITLE + '-' + to.meta.title
        }

        next() //进入下一个页面
    })

    router.afterEach(() => {
        NProgress.done()
    })
}
