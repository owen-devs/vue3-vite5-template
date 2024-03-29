import 'virtual:uno.css'
import 'animate.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const useInfoStore = useUserInfoStore()
useInfoStore.getUserInfo()
app.mount('#app')
