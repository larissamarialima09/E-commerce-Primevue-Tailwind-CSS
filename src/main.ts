import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setPrimeVue } from './modules/primevue.modules'
import Menubar from 'primevue/menubar'

const app = createApp(App)

setPrimeVue(app)
app.use(createPinia())
app.use(router)

app.component('Menubar', Menubar)

app.mount('#app')
