<template>
  <div>
    <HeaderAnth
      :searchQuery="''"
      :isAuthenticated="isAuthenticated"
      @buscar="() => {}"
      @cerrar-sesion="cerrarSesion"
    />

    <div class="promociones-container">
      <h1>Promociones</h1>
      <p>Esta sección se encuentra actualmente en construcción.</p>
      <p>Pronto encontrarás aquí las mejores ofertas y descuentos.</p>
    </div>

    <FooterAnth />
  </div>
</template>

<script>
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";

export default {
  name: "PromocionesPage",
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
  },
};
</script>

<style src="./Promociones.css"></style>
