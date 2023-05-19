import { createApp } from 'vue'
import App from './App.vue'

const CountNumber = createApp(App)

CountNumber.config.errorHandler = (err) => {
    alert('CountNumber Error :'+err);
}
CountNumber.mount('#app')