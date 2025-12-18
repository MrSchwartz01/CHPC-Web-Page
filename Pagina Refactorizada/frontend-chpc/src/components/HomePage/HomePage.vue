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
          <!-- Carrusel de Banners -->
    <div>
      <CarouselBanner :banners="banners" />
    </div>
      <h1>Bienvenidos a Nuestra Tienda </h1>
      <p>Explora nuestros productos y encuentra lo que necesitas.</p>

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
  >
    <!-- Imagen del producto -->
    <img
      :src="producto.imagen_url || 'ruta-imagen-default.png'"
      alt="Imagen del Producto"
    />

    <!-- Nombre y descripción del producto -->
    <h3>{{ producto.nombre_producto }}</h3>
    <p>{{ producto.descripcion }}</p>

    <!-- Precio del producto (solo para usuarios autenticados) -->
    <p v-if="isAuthenticated">
      <strong>Precio:</strong> ${{ producto.precio }}
    </p>

    <!-- Mostrar cantidad en stock -->
    <p>
      <strong>Stock disponible:</strong> {{ producto.stock }} unidades
    </p>

    <!-- Botones de acción -->
    <button v-if="isAuthenticated" @click="verDetalle(producto.id)">
      Ver Detalles
    </button>
    <button v-else @click="redirigirLogin">
      Inicia Sesión para Ver Precios
    </button>
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