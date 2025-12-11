<template>
    <div>
      <HeaderAnth
        :isAuthenticated="isAuthenticated"
        @cerrar-sesion="cerrarSesion"
      />
  
      <transition-group name="fade" tag="div" class="social-container">
        <h1 class="main-title">Síguenos en nuestras Redes Sociales</h1>
        <p class="description">
          Conéctate con nosotros a través de nuestras redes sociales y mantente al día con nuestras últimas noticias y ofertas.
        </p>
        <div class="social-grid">
          <div
            v-for="red in redesSociales"
            :key="red.nombre"
            class="social-card fade-in"
          >
            <a :href="red.url" target="_blank" rel="noopener noreferrer">
              <img
                :src="red.icono"
                :alt="'\u00cdcono de ' + red.nombre"
                class="social-icon"
              />
              <h3>{{ red.nombre }}</h3>
            </a>
          </div>
        </div>
      </transition-group>
    </div>
  </template>
  <script src="./RedesSociales.js"></script>
  <style src="./RedesSociales.css"></style>