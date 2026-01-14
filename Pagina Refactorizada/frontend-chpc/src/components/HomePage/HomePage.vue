<template>
  <div>
    <!-- Encabezado -->
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarProductos"
      @cerrar-sesion="cerrarSesion"
    />



    <!-- Contenido principal -->
    <div class="home-container">

      <!-- Sección de Banner y Video -->
      <section class="hero-banner-section">
        <div class="banner-video-wrapper">
          <!-- Carrusel de Banners -->
          <div class="banner-container">
            <CarouselBanner :banners="banners" />
          </div>

          <!-- Contenedor de Video Destacado -->
          <div class="video-featured-container">
            <h3 class="video-title">🎥 Video Destacado</h3>
            <div class="video-wrapper">
              <!-- Puedes cambiar este iframe por el video que desees -->
              <iframe
                :src="videoDestacado"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="Video destacado del producto"
              ></iframe>
            </div>
            <div class="video-info">
              <h4>{{ videoTitulo }}</h4>
              <p>{{ videoDescripcion }}</p>
            </div>
          </div>
        
        </div>
      </section>

      <!-- Categorías más visitadas -->
      <section class="categorias-section">
        <h2 class="section-title">Categorías más visitadas</h2>
        <div class="categorias-grid">
          <div
            v-for="categoria in categoriasMasVisitadas"
            :key="categoria.id"
            class="categoria-card"
            @click="filtrarPorCategoria(categoria.nombre)"
          >
            <div class="categoria-icon" v-html="categoria.icon"></div>
            <h3>{{ categoria.nombre }}</h3>
            <p class="categoria-stats">{{ categoria.visitas }} visitas</p>
          </div>
        </div>
      </section>

      <!-- Filtros de precio -->
      <div class="price-filters">
        <span>Filtrar por precio:</span>
        <button
          :class="{ active: selectedPriceRange === '' }"
          @click="cambiarRangoPrecio('')"
        >
          Todos
        </button>
        <button
          :class="{ active: selectedPriceRange === 'low' }"
          @click="cambiarRangoPrecio('low')"
        >
          Menor a $100
        </button>
        <button
          :class="{ active: selectedPriceRange === 'mid' }"
          @click="cambiarRangoPrecio('mid')"
        >
          $101 a $399
        </button>
        <button
          :class="{ active: selectedPriceRange === 'high' }"
          @click="cambiarRangoPrecio('high')"
        >
          Desde $400
        </button>
      </div>

    <!-- Lista de Productos -->
<div class="product-grid">
  <div
    v-for="producto in productosMostrados"
    :key="producto.id"
    class="product-card"
    @click="verDetalle(producto.id)"
  >
    <!-- Badge de promoción -->
    <div v-if="producto.tienePromocion" class="promo-badge">
      -{{ producto.promocion.porcentaje }}%
    </div>

    <!-- Contenedor de imagen -->
    <div class="product-image-wrapper">
      <img
        :src="producto.imagen_url || 'ruta-imagen-default.png'"
        :alt="producto.nombre_producto"
      />
    </div>

    <!-- Información del producto -->
    <div class="product-info">
      <h3 class="product-title">{{ producto.nombre_producto }}</h3>
      
      <!-- Precio -->
      <div v-if="isAuthenticated" class="product-price">
        <div v-if="producto.tienePromocion">
          <span class="price-original">${{ producto.promocion.precioOriginal }}</span>
          <span class="price-current">${{ producto.promocion.precioConDescuento }}</span>
        </div>
        <div v-else>
          <span class="price-current">${{ producto.precio }}</span>
        </div>
      </div>
      <div v-else class="product-price">
        <span class="price-login">Inicia sesión para ver el precio</span>
      </div>

      <!-- Botón agregar al carrito -->
      <button 
        v-if="isAuthenticated"
        @click.stop="agregarAlCarrito(producto)" 
        class="btn-add-cart"
        :disabled="producto.stock <= 0"
      >
        <span v-if="producto.stock > 0">AGREGAR AL CARRITO</span>
        <span v-else>SIN STOCK</span>
      </button>
      <button 
        v-else
        @click.stop="redirigirLogin"
        class="btn-add-cart"
      >
        INICIAR SESIÓN
      </button>
    </div>
  </div>
</div>


      <!-- Botón para cargar más productos -->
      <button
        v-if="productosMostrados.length < productos.length && searchQuery.trim() === ''"
        @click="cargarMasProductos"
        class="cargar-mas"
      >
        Cargar más productos
      </button>

      <!-- Mensaje de No Resultados -->
      <div v-if="productosMostrados.length === 0 && searchQuery.trim() !== ''">
        <p>No se encontraron productos que coincidan con "{{ searchQuery }}".</p>
      </div>

      <!-- Historial de productos vistos recientemente -->
      <HistorialProductosVistos />
    </div>

    <!-- Pie de página -->
    <FooterAnth />

    <!-- Mapa de ubicación -->
   
  </div>
</template>

<script src="./HomePage.js"></script>
<style src="./HomePage.css"></style>