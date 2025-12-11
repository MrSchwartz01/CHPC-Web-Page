<template>
    <footer class="footer-container">
      <div class="footer-content">
        <div class="footer-section about-us">
          <h4>Sobre Nosotros</h4>
          <p>
            Tenemos todo en Informática: Portátiles, Computadoras de escritorio, Impresoras, Tablets, Accesorios, Cámaras de seguridad, solo en CHCP Tecnología.
          </p>
          <p>Haz CLICK, lo tenemos...!</p>
        </div>
        <div class="footer-section contact-us">
          <h4>Contáctanos</h4>
          <p>Email: <a href="mailto:clickhereventas3@gmail.com">clickhereventas3@gmail.com</a></p>
          <p>Teléfono: <a href="tel:+593995924867">099 592 4867</a></p>
          <p>Dirección: Calle 12 Avenida 20 Esquina, Manta, Ecuador</p>
        </div>
        <div class="footer-section social-media">
          <h4>Redes Sociales</h4>
          <ul class="social-media-grid">
            <li v-for="red in redesSociales" :key="red.nombre">
              <a :href="red.url" target="_blank" rel="noopener noreferrer">
                <img :src="red.icono" :alt="red.nombre" class="social-icon" />
                {{ red.nombre }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Nueva sección para Misión y Visión -->
      <div class="mission-vision-section">
    <div class="mission-section">
      <h4 class="section-title">Nuestra Misión</h4>
      <p class="section-content">
        En CHPC Tecnología, nuestra misión es ir más allá de la simple venta de equipos tecnológicos. Nos dedicamos a crear 
        experiencias únicas mediante la combinación de innovación, calidad y servicio personalizado. Lo que nos hace 
        especiales es nuestro enfoque centrado en el cliente: analizamos profundamente sus desafíos, diseñamos soluciones 
        a medida y brindamos un acompañamiento continuo. Cada producto que ofrecemos refleja nuestro compromiso con la 
        excelencia y la tecnología de punta. Nos destacamos por integrar sostenibilidad en cada etapa del proceso, desde 
        la selección de productos hasta la gestión de residuos electrónicos, asegurando que nuestra huella tecnológica sea 
        positiva para nuestros clientes, la industria y el planeta.
      </p>
    </div>
    
    <div class="vision-section">
      <h4 class="section-title">Nuestra Visión</h4>
      <p class="section-content">
        Convertirnos en la referencia global en soluciones tecnológicas integrales, distinguiéndonos por nuestra capacidad 
        de anticipar las necesidades del mercado y ofrecer productos y servicios que redefinan la experiencia tecnológica. 
        Nos visualizamos liderando un ecosistema innovador donde cada equipo y solución que ofrecemos no solo resuelve 
        problemas, sino que transforma la manera en que las personas y las empresas interactúan con la tecnología. En CHPC 
        Tecnología, creemos que la verdadera innovación no es solo adelantarse al futuro, sino construirlo de la mano de 
        nuestros clientes, con un enfoque en sostenibilidad, inclusión y excelencia operativa.
      </p>
    </div>
  </div>
  
      <div class="footer-bottom">
        <p>&copy; 2024 CHCP Tecnología. Todos los derechos reservados.</p>
      </div>
    </footer>
  </template>

<script src="./FooterAnth.js"></script>
<style src="./FooterAnth.css"></style>