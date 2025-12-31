<template>
  <div>
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarProductos"
      @cerrar-sesion="cerrarSesion"
    />

    <div class="productos-por-categoria-container">
      <div class="categoria-header">
        <h1>{{ nombreCategoria }}</h1>
        <p class="breadcrumb">
          <router-link to="/home">Inicio</router-link> /
          <router-link to="/categorias">Categorías</router-link> /
          {{ nombreCategoria }}
        </p>
      </div>

      <!-- Filtros por marca -->
      <div class="filtros-section" v-if="marcasDisponibles.length > 0">
        <h3>Filtrar por Marca</h3>
        <div class="marcas-filter">
          <button
            :class="{ active: marcaSeleccionada === null }"
            @click="filtrarPorMarca(null)"
            class="marca-filter-btn"
          >
            Todas
          </button>
          <button
            v-for="marca in marcasDisponibles"
            :key="marca.nombre"
            :class="{ active: marcaSeleccionada === marca.nombre }"
            @click="filtrarPorMarca(marca.nombre)"
            class="marca-filter-btn"
          >
            {{ marca.nombre }}
          </button>
        </div>
      </div>

      <!-- Grid de productos -->
      <div class="productos-grid">
        <div
          v-for="producto in productosFiltrados"
          :key="producto.id"
          class="producto-card"
        >
          <img 
            :src="producto.imagen_url" 
            :alt="producto.nombre_producto" 
            @click="verDetalle(producto.id)"
            style="cursor: pointer;"
          />
          <div class="producto-info">
            <span class="marca-tag">{{ producto.marca }}</span>
            <h3>{{ producto.nombre_producto }}</h3>
            <p class="descripcion">{{ producto.descripcion }}</p>
            <div class="producto-footer">
              <p class="precio" v-if="isAuthenticated">${{ producto.precio }}</p>
              <p class="precio" v-else>Inicia sesión para ver precio</p>
              <p class="stock" :class="{ 'sin-stock': producto.stock === 0, 'pocas-unidades': producto.stock > 0 && producto.stock <= 5 }">
                {{ obtenerTextoStock(producto.stock) }}
              </p>
            </div>
            <button @click="verDetalle(producto.id)" class="ver-btn">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>

      <div v-if="productosFiltrados.length === 0" class="no-productos">
        <p>No hay productos disponibles en esta categoría.</p>
      </div>
    </div>

    <ContactoAsesor />
    <FooterAnth />
  </div>
</template>

<script src="./ProductosPorCategoria.js"></script>
<style src="./ProductosPorCategoria.css"></style>
