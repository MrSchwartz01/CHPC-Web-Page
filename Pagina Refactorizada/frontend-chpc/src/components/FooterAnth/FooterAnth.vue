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
      <div class="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d838.6405537434595!2d-80.72806521686454!3d-0.9505578544621024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902be1e51964e08d%3A0x2d0fd996be1bacb!2sCHPC%20Tecnolog%C3%ADa%20(ClickHere.Pc)!5e0!3m2!1ses!2sec!4v1765573413729!5m2!1ses!2sec"
          width="100%"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
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
        <p>&copy; 2025 CHCP Tecnología. Todos los derechos reservados.</p>
      </div>
    </footer>
  </template>

<script src="./FooterAnth.js"></script>
<style src="./FooterAnth.css"></style>