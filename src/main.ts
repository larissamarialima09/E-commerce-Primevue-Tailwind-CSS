import './assets/main.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setPrimeVue } from './modules/primevue.modules'
import ConfirmationService from 'primevue/confirmationservice'



const app = createApp(App)


setPrimeVue(app)
app.use(ConfirmationService)

app.use(createPinia())
app.use(router)

app.mount('#app')
