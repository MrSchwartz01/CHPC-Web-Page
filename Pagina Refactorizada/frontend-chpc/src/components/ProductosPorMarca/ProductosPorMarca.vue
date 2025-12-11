<template>
    <div>
      <HeaderAnth :isAuthenticated="isAuthenticated" @cerrar-sesion="cerrarSesion" />
  
      <div class="productos-container">
        <div class="home-container">
          <h1 class="animated-title">Productos de {{ nombreMarca }}</h1>
          <p class="animated-subtitle">Explora nuestra selección exclusiva.</p>
          <div class="product-grid">
            <div
              v-for="producto in productos"
              :key="producto.id"
              class="product-card"
            >
              <div class="product-image">
                <img
                  :src="producto.imagen_url"
                  :alt="producto.nombre_producto"
                  loading="lazy"
                />
              </div>
    <h3>{{ producto.nombre_producto }}</h3>
    <p>{{ producto.descripcion }}</p>
    <p class="precio">Precio: ${{ producto.precio }}</p>
    
    <!-- Mostrar stock disponible -->
    <p class="stock">
      <strong>Stock disponible:</strong> {{ producto.stock }} unidades
    </p>
  
    <button @click="verDetalle(producto.id)">Ver Detalles</button>
  </div>
  
          </div>
        </div>
      </div>
  
      <FooterAnth />
    </div>
  </template>
  <script src="./ProductosPorMarca.js"></script>
  <style src="./ProductosPorMarca.css"></style>