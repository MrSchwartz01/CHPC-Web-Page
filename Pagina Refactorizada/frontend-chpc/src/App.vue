<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <router-view /> <!-- Muestra el componente basado en la ruta actual -->
    <WhatsAppWidget /> <!-- Widget flotante de WhatsApp -->
  </div>
</template>

<script>
import WhatsAppWidget from './components/WhatsAppWidget/WhatsAppWidget.vue';

export default {
  name: 'App',
  components: {
    WhatsAppWidget
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  created() {
    // Cargar preferencia de tema desde localStorage
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();

    // Escuchar cambios de tema
    window.addEventListener('theme-changed', this.handleThemeChange);
  },
  beforeUnmount() {
    window.removeEventListener('theme-changed', this.handleThemeChange);
  },
  methods: {
    handleThemeChange(event) {
      this.isDarkMode = event.detail.isDark;
      this.applyTheme();
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },
  },
};
</script>

<style>
/* Estilos personalizados para el componente raíz */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}

body {
  background-color: #f8f9fa;
  color: #2c3e50;
}

body.dark-mode {
  background-color: #1a1a1a;
  color: #ecf0f1;
}

#app.dark-mode {
  background-color: #1a1a1a;
  color: #ecf0f1;
}
</style>
