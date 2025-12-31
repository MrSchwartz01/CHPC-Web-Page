<template>
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarProductos"
      @cerrar-sesion="cerrarSesion"
    />
    <br />
    <br />
    <br />
  
    <div class="producto-contenedor">
      <!-- Mensaje de carga -->
      <div v-if="isLoading" class="mensaje-carga">
        <p>Cargando detalles del producto...</p>
      </div>
  
      <!-- Mensaje de error con botón de recarga -->
      <div v-if="errorMessage && !isLoading" class="mensaje-error">
        <p>{{ errorMessage }}</p>
        <button @click="recargarProducto" class="boton-recargar">Reintentar</button>
      </div>
  
      <!-- Mensaje de no autenticado -->
      <div v-if="!isAuthenticated" class="mensaje-error">
        <p>Por favor, inicie sesión para ver los detalles del producto.</p>
        <button @click="redirigirLogin" class="boton-recargar">Iniciar sesión</button>
      </div>
  
  <!-- Detalles del producto -->
  <div
    v-if="producto && !isLoading && !errorMessage && isAuthenticated"
    class="producto-contenedor"
  >
    <h2 class="seccion-titulo">Detalles del Producto</h2>
    <div class="detalle-contenedor">
      <!-- Imagen del producto (Izquierda) -->
      <div class="imagen-producto-wrapper">
        <img
          :src="imagenPrincipal"
          :alt="producto.nombre_producto"
          class="imagen-producto-principal"
        />
      </div>

      <!-- Información del producto (Derecha) -->
      <div class="informacion-producto">
        <h1 class="nombre-producto">{{ producto.nombre_producto }}</h1>
        
        <div class="detalle-item">
          <strong>Código (SKU):</strong>
          <span>{{ producto.sku || 'No disponible' }}</span>
        </div>

        <div class="detalle-item">
          <strong>Descripción:</strong>
          <p class="descripcion-texto">{{ producto.descripcion }}</p>
        </div>

        <div class="detalle-item" v-if="producto.marca">
          <strong>Marca:</strong>
          <span>{{ producto.marca }}</span>
        </div>

        <div class="detalle-item" v-if="producto.categoria">
          <strong>Categoría:</strong>
          <span>{{ producto.categoria }}</span>
        </div>

        <div class="detalle-item" v-if="producto.modelo">
          <strong>Modelo:</strong>
          <span>{{ producto.modelo }}</span>
        </div>

        <div class="detalle-item" v-if="producto.especificaciones">
          <strong>Especificaciones:</strong>
          <p class="especificaciones-texto">{{ producto.especificaciones }}</p>
        </div>

        <div class="detalle-item" v-if="producto.garantia">
          <strong>Garantía:</strong>
          <span>{{ producto.garantia }}</span>
        </div>

        <div class="detalle-item stock-info">
          <strong>Stock:</strong>
          <span :class="{'stock-disponible': producto.stock > 0, 'stock-agotado': producto.stock === 0, 'pocas-unidades': producto.stock > 0 && producto.stock <= 5}">
            {{ mostrarStock }}
          </span>
        </div>

        <!-- Precio -->
        <div class="precio-contenedor">
          <div class="precio-wrapper">
            <span class="precio-label">Precio:</span>
            <span class="precio-valor">USD ${{ formatPrice(producto.precio) }}</span>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="botones-accion">
          <button 
            @click="agregarAlCarrito" 
            class="boton-agregar-carrito"
            :disabled="producto.stock <= 0"
          >
            <i class="fas fa-shopping-cart"></i> 
            {{ producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock' }}
          </button>
          <a href="https://wa.me/593995924867" target="_blank" class="boton-whatsapp">
            <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
  
    <br>
    <br>
    <br>
    <br>
  
    <ContactoAsesor />
    <FooterAnth />
  </template>
  
  <script src="./ProductoDetalle.js"></script>
  <style src="./ProductoDetalle.css"></style>  