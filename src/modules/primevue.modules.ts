import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Toast from 'primevue/toast'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  app.component('Button', Button)
  app.component('Card', Card)
  app.component('InputNumber', InputNumber)
  app.component('InputText', InputText)
  app.component('Password', Password)
  app.component('TabView', TabView)
  app.component('TabPanel', TabPanel)
  app.component('Toast', Toast)
  app.use(ConfirmationService)
  app.use(ToastService)
}
