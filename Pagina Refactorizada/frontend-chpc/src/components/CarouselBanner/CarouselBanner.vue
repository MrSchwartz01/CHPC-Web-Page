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

<script src="./CarouselBanner.js"></script>
<style src="./CarouselBanner.css"></style> 