<template>
    <div class="carousel-banner">
      <div v-if="banners.length" class="carousel">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="carousel-item"
          :class="{ active: activeBanner === index }"
        >
          <img
            :src="getFullImageUrl(banner.imagen_url)"
            :alt="banner.titulo"
            class="banner-image"
            @load="handleImageLoad"
          />
        </div>
  
        <!-- Controles del carrusel -->
        <button class="carousel-arrow left" @click="prevBanner">&#10094;</button>
        <button class="carousel-arrow right" @click="nextBanner">&#10095;</button>
  
        <!-- Indicadores -->
        <div class="carousel-indicators">
          <span
            v-for="(banner, index) in banners"
            :key="index"
            :class="{ active: activeBanner === index }"
            @click="setBanner(index)"
          ></span>
        </div>
      </div>
  
      <div v-else class="no-banners">
        <p>No hay banners disponibles.</p>
      </div>
    </div>
  </template>

<script>
export default {
  name: "CarouselBanner",
  props: {
    banners: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeBanner: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.startCarousel();
  },
  beforeUnmount() {
    this.stopCarousel();
  },
  methods: {
    startCarousel() {
      if (this.banners && this.banners.length > 0) {
        this.intervalId = setInterval(() => {
          this.nextBanner();
        }, 6000);
      }
    },
    stopCarousel() {
      if (this.intervalId) clearInterval(this.intervalId);
    },
    getFullImageUrl(relativeUrl) {
      return `http://localhost:5000${relativeUrl}`;
    },
    prevBanner() {
      this.activeBanner =
        (this.activeBanner - 1 + this.banners.length) % this.banners.length;
    },
    nextBanner() {
      this.activeBanner = (this.activeBanner + 1) % this.banners.length;
    },
    setBanner(index) {
      this.activeBanner = index;
    },
    handleImageLoad(event) {
      event.target.classList.add("loaded");
    },
  },
};
</script>

<style src="./CarouselBanner.css"></style>