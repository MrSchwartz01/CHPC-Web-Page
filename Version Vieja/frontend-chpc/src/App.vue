<template>
  <div id="app">
    <router-view /> <!-- Muestra el componente basado en la ruta actual -->
  </div>
</template>

<script>
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que la ruta del router sea correcta

// Configura la aplicación Vue y monta el router
createApp(App).use(router).mount('#app');

export default {
  name: 'App',
};
</script>

<style>
/* Estilos personalizados para el componente raíz */
</style>
