import { createApp } from 'vue';
import App from './App.vue';
import router from './router/'; // Ruta relativa correcta, sin 'src/'
 
createApp(App).use(router).mount('#app');
