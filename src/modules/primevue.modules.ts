import type {App} from "vue"
import PrimeVue from 'primevue/config'
import Button from "primevue/button"
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

export function setPrimeVue(app:App): void{

   app.use(PrimeVue , {
    theme: {
        preset: Aura,
    }
});
   app.component('Button',Button)
   app.component('Card',Card)
   app.component('InputNumber', InputNumber)
   app.use(ConfirmationService)
   app.use(ToastService)
}