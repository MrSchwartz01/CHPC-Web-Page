<template>
  <div class="garantias-cphc-page">
    <!-- Header -->
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarProductos"
      @cerrar-sesion="cerrarSesion"
    />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Garantías</h1>
        <p class="hero-subtitle">
          Comprometidos con asegurar tu satisfaccion y confianza en cada compra, nos aseguramos de ofrecerte la garantía de cada uno de nuestros productos.
        </p>
      </div>
    </section>

    <!-- Contenido Principal -->
    <div class="content-container">
      <!-- Garantía del local -->
      <section class="section-card garantia-section">
        <div class="icon-wrapper">
        </div>
        <h2 class="section-title">Garantía del Local </h2>
        <div class="section-content">
          <p>
            Nuestros productos cuentan con una garantía desde 6 meses a un año, a partir de la fecha de compra, cubriendo defectos de fabricación y funcionamiento bajo condiciones normales de uso.
            Para hacer efectiva la garantía, es imprescindible presentar la factura de compra original. 
            La garantía no cubre daños ocasionados por mal uso, accidentes, modificaciones no autorizadas o desgaste natural del producto. 
            Nuestro equipo de servicio al cliente está disponible para asistirte en cualquier consulta relacionada con la garantía y para facilitar el proceso de reparación o reemplazo si es necesario. 
            En CHPC Tecnología, nos comprometemos a ofrecerte productos de calidad respaldados por un servicio confiable.
          </p>
        </div>
      </section>

      <!-- Garantía del Fabricante -->
      <section class="section-card fabricante-section">
        <div class="icon-wrapper">
        </div>
        <h2 class="section-title">Garantía del Fabricante</h2>
        <div class="section-content">
          <p>
            Cada producto adquirido en CHPC Tecnología cuenta con la garantía oficial del fabricante, la cual varía según la marca y el tipo de producto.
            Esta garantía cubre defectos de fabricación y funcionamiento bajo condiciones normales de uso, conforme a los términos establecidos por el fabricante.
            Para hacer efectiva la garantía del fabricante, es necesario conservar la factura de compra y seguir las instrucciones de garantia del fabricante.
        </p>
        </div>
      </section>
    </div>
    <!-- Footer -->
    <FooterAnth />
  </div>
</template>

<script>
import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';

export default {
  name: 'GarantiasPage',
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      searchQuery: '',
      isAuthenticated: false,
    };
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('access_token');
  },
  methods: {
    buscarProductos(query) {
      this.searchQuery = query;
      this.$router.push({ path: '/home', query: { search: query } });
    },
    cerrarSesion() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_rol');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
    goToProducts() {
      this.$router.push('/home');
    },
    goToContact() {
      this.$router.push('/encuentranos');
    },
  },
};
</script>

<style src="./Garantias.css"></style>
