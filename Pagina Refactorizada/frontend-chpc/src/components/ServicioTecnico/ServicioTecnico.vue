<template>
    <div>
      <HeaderAnth
        :isAuthenticated="isAuthenticated"
        @cerrar-sesion="cerrarSesion"
      />
  
      <div class="service-container">
        <h1 class="main-title">Servicios Técnicos Especializados</h1>
        <p class="description">
          Descubre los servicios que ofrecemos para garantizar el funcionamiento óptimo de tus dispositivos tecnológicos.
        </p>
  
        <div class="services-grid">
          <div class="service-card" @click="showImageModal(require('@/images/serviciotecnico/reparacion.jpg'))">
            <img src="@/images/serviciotecnico/reparacion.jpg" alt="Reparación de laptops" class="service-image" />
            <h3>Reparación de laptops</h3>
            <p>Solución de problemas de hardware y software para laptops de todas las marcas.</p>
          </div>
          <div class="service-card" @click="showImageModal('https://via.placeholder.com/300x200?text=Impresora+Mantenida')">
            <img src="https://via.placeholder.com/300x200?text=Impresora+Mantenida" alt="Mantenimiento de impresoras" class="service-image" />
            <h3>Mantenimiento de impresoras</h3>
            <p>Servicios de limpieza y reparación para impresoras láser y de inyección de tinta.</p>
          </div>
          <div class="service-card" @click="showImageModal('https://via.placeholder.com/300x200?text=Pantalla+Reemplazada')">
            <img src="https://via.placeholder.com/300x200?text=Pantalla+Reemplazada" alt="Reemplazo de pantallas" class="service-image" />
            <h3>Reemplazo de pantallas</h3>
            <p>Cambio de pantallas dañadas en laptops, tablets y smartphones.</p>
          </div>
          <div class="service-card" @click="showImageModal('https://via.placeholder.com/300x200?text=PC+Optimizada')">
            <img src="https://via.placeholder.com/300x200?text=PC+Optimizada" alt="Optimización de PC" class="service-image" />
            <h3>Optimización de PC</h3>
            <p>Mejoramos el rendimiento de tu computadora con actualizaciones y limpieza profunda.</p>
          </div>
        </div>
  
        <div v-if="isModalVisible" class="modal-overlay" @click="hideImageModal">
          <div class="modal-content" @click.stop>
            <img :src="modalImage" alt="Imagen ampliada" class="modal-image" />
            <button class="close-button" @click="hideImageModal">&times;</button>
          </div>
        </div>
  
        <div class="contact-section">
          <p>¿Necesitas más información? Contáctanos directamente en WhatsApp:</p>
          <a href="https://wa.me/593995924867" target="_blank" rel="noopener noreferrer" class="whatsapp-link">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" class="whatsapp-icon" />
            <span>Escríbenos en WhatsApp</span>
          </a>
        </div>
      </div>
         <!-- Pie de página -->
    <FooterAnth />
    </div>
  </template>
<script src="./ServicioTecnico.js"></script>
<style src="./ServicioTecnico.css"></style>