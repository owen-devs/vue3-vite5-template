import 'virtual:uno.css'
import 'animate.css'

import App from './App.vue'
import router from './router'
import persist from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(persist)
app.use(pinia)
app.use(router)

const useInfoStore = useUserInfoStore()
useInfoStore.getUserInfo()
app.mount('#app')
