import 'virtual:uno.css'
import 'animate.css'

import App from './App.vue'
import router from './router'
import { ElLoading } from 'element-plus'
import persist from 'pinia-plugin-persistedstate'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const directives = import.meta.glob('./directives/*.ts', { eager: true })

const app = createApp(App)
const pinia = createPinia()
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)

const directivesRegister = () => {
    app.directive('loading', ElLoading.directive)
    Object.values(directives).forEach((di: any) => {
        Object.keys(di).forEach((name: string) => {
            app.directive(name.slice(1), di[name])
        })
    })
}
const start = () => {
    useTheme().setTheme(useLocalStorage('theme', '').value) //同步主题
    directivesRegister()
    app.mount('#app')
}

const useInfoStore = useUserInfoStore()
// useInfoStore
//     .getUserInfo()
//     .then(() => {
start()
// })
// .catch(() => {
//     //生产环境注释掉
//     // start()
// })
