<template>
  <div>
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarProductos"
      @cerrar-sesion="cerrarSesion"
    />

    <div class="encuentranos-container">
      <div class="encuentranos-header">
        <h1>Encuéntranos</h1>
        <p class="subtitle">Visítanos en nuestra dirección</p>
      </div>

      <div class="content-wrapper">
        <div class="info-section">
          <div class="info-card">
            <div class="icon-wrapper">
              <span class="icon">🏢</span>
            </div>
            <h3>Dirección</h3>
            <p>{{ direccion }}</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <span class="icon">⏰</span>
            </div>
            <h3>Horario de Atención</h3>
            <p>{{ horario }}</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <span class="icon">📞</span>
            </div>
            <h3>Teléfono</h3>
            <p>{{ telefono }}</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <span class="icon">✉️</span>
            </div>
            <h3>Email</h3>
            <p>{{ email }}</p>
          </div>
        </div>

        <div class="map-section">
          <div class="map-card">
            <h2>Cómo llegar</h2>
            <div class="map-container">
              <iframe
                :src="googleMapsEmbedUrl"
                width="100%"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a 
              :href="googleMapsLink" 
              target="_blank" 
              rel="noopener noreferrer"
              class="directions-btn"
            >
              🧭 Ver Direcciones en Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./EncuentranosPage.js"></script>
<style src="./EncuentranosPage.css"></style>
