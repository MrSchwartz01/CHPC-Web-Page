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
      <div class="filtros-section">
        <h3>Filtrar por Marca</h3>
        <div class="marcas-filter">
          <button
            v-for="marca in marcasDisponibles"
            :key="marca.id"
            :class="{ active: marcaSeleccionada === marca.id }"
            @click="filtrarPorMarca(marca.id)"
            class="marca-filter-btn"
          >
            {{ marca.nombre }}
          </button>
          <button
            :class="{ active: marcaSeleccionada === null }"
            @click="filtrarPorMarca(null)"
            class="marca-filter-btn"
          >
            Todas
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
          <img :src="producto.imagen_url" :alt="producto.nombre" />
          <div class="producto-info">
            <span class="marca-tag">{{ producto.marca }}</span>
            <h3>{{ producto.nombre }}</h3>
            <p class="descripcion">{{ producto.descripcion }}</p>
            <div class="producto-footer">
              <p class="precio">${{ producto.precio }}</p>
              <p class="stock">Stock: {{ producto.stock }}</p>
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

    <FooterAnth />
  </div>
</template>

<script src="./ProductosPorCategoria.js"></script>
<style src="./ProductosPorCategoria.css"></style>
