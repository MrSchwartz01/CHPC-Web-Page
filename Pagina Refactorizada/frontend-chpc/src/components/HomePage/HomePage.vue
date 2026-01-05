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

      <!-- Sección de Productos Más Vendidos -->
      <section class="productos-vendidos-section">
        <h2 class="section-title">Productos Más Vendidos</h2>
        
        <div v-for="categoria in categoriasMasVisitadas" :key="'vendidos-' + categoria.id" class="categoria-vendidos">
          <h3 class="categoria-vendidos-title">
            {{ categoria.icon }} {{ categoria.nombre }}
          </h3>
          
          <div class="productos-vendidos-grid">
            <div
              v-for="producto in getProductosPorCategoria(categoria.nombre)"
              :key="producto.id"
              class="producto-vendido-card"
              @click="verDetalle(producto.id)"
            >
              <div class="vendido-badge">
                <span>⭐ Top {{ producto.ranking }}</span>
              </div>
              
              <img
                :src="producto.imagen_url || 'ruta-imagen-default.png'"
                :alt="producto.nombre_producto"
              />
              
              <div class="producto-vendido-info">
                <h4>{{ producto.nombre_producto }}</h4>
                <p class="producto-marca">{{ producto.marca || 'Sin marca' }}</p>
                
                <div v-if="isAuthenticated" class="producto-precio">
                  <span class="precio-actual">${{ producto.precio }}</span>
                  <p style="font-size: 0.7em; color: #999; margin: 2px 0 0 0;">incluido IVA</p>
                </div>
                
                <p class="producto-ventas">{{ producto.ventas }} vendidos</p>
              </div>
            </div>
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
    :class="{ 'producto-promocion': producto.tienePromocion }"
  >
    <!-- Badge de promoción -->
    <div v-if="producto.tienePromocion" class="promo-badge">
      -{{ producto.promocion.porcentaje }}% OFF
    </div>

    <!-- Imagen del producto -->
    <img
      :src="producto.imagen_url || 'ruta-imagen-default.png'"
      alt="Imagen del Producto"
    />

    <!-- Nombre y descripción del producto -->
    <h3>{{ producto.nombre_producto }}</h3>
    <p>{{ producto.descripcion }}</p>

    <!-- Precio del producto (solo para usuarios autenticados) -->
    <div v-if="isAuthenticated" class="precio-container">
      <div v-if="producto.tienePromocion" class="precio-promocion">
        <p class="precio-original">${{ producto.promocion.precioOriginal }}</p>
        <p class="precio-descuento">
          <strong>${{ producto.promocion.precioConDescuento }}</strong>
        </p>
        <p style="font-size: 0.75em; color: #999; margin: 2px 0 0 0;">incluido IVA</p>
      </div>
      <p v-else>
        <strong>Precio:</strong> ${{ producto.precio }}
        <span style="font-size: 0.75em; color: #999; margin-left: 8px;">incluido IVA</span>
      </p>
    </div>

    <!-- Mostrar cantidad en stock -->
    <p>
      <strong>Stock disponible:</strong> {{ producto.stock }} unidades
    </p>

    <!-- Botones de acción -->
    <div class="product-actions">
      <button 
        v-if="isAuthenticated" 
        @click.stop="agregarAlCarrito(producto)" 
        class="btn-agregar-carrito"
        :disabled="producto.stock <= 0"
      >
        <i class="fas fa-shopping-cart"></i>
      </button>
      <button v-if="isAuthenticated" @click="verDetalle(producto.id)">
        Ver Detalles
      </button>
      <button v-else @click="redirigirLogin">
        Inicia Sesión para Ver Precios
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