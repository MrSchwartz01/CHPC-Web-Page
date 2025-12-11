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
    <h2 class="seccion-titulo">Detalles del Producto</h2> <!-- Título de la sección -->
    <div class="detalle-contenedor">
      <!-- Galería de medios del producto -->
      <div class="galeria-imagenes">
        <div class="miniaturas">
          <template v-for="(media, index) in producto.media || []" :key="index">
            <img
              v-if="media.tipo_media === 'imagen'"
              :src="getFullImageUrl(media.url)"
              :alt="`Imagen adicional ${index + 1}`"
              class="imagen-miniatura"
              @click="cambiarImagenPrincipal(index)"
            />
            <div
              v-else-if="media.tipo_media === 'video'"
              class="video-miniatura-wrapper"
              @click="cambiarImagenPrincipal(index)"
            >
              <video
                class="video-miniatura"
                :src="getFullImageUrl(media.url)"
                muted
                loop
              ></video>
            </div>
          </template>
        </div>
        <div class="imagen-principal">
          <!-- Imagen principal -->
          <img
            v-if="producto.media?.[imagenSeleccionada]?.tipo_media === 'imagen'"
            :src="getFullImageUrl(producto.media?.[imagenSeleccionada]?.url || '')"
            :alt="`Imagen principal de ${producto.nombre_producto || ''}`"
            class="imagen-grande"
          />
          <!-- Video principal -->
          <video
            v-else-if="producto.media?.[imagenSeleccionada]?.tipo_media === 'video'"
            class="video-grande"
            :src="getFullImageUrl(producto.media?.[imagenSeleccionada]?.url || '')"
            controls
            autoplay
          ></video>
        </div>
      </div>
  
      <!-- Información del producto -->
      <div class="informacion-producto">
        <h1 class="nombre-producto">{{ producto.nombre_producto }}</h1>
  
        <!-- Precio con descuento y original -->
        <div class="precio-contenedor">
          <span class="precio-descuento">USD ${{ formatPrice(producto.precio) }}</span>
          <span class="precio-original" v-if="producto.precio_original">
            USD ${{ formatPrice(producto.precio_original) }}
          </span>
        </div>
  
        <!-- Estado del stock -->
        <p class="stock-producto">
          {{ producto.stock > 0 ? "En stock" : "Agotado" }}
        </p>
  
      <!-- Descripción en formato de lista -->
  <div class="descripcion-producto">
    <p><strong>Descripción:</strong></p>
    <ul>
      <li><strong>Nombre del Producto:</strong> {{ producto.nombre_producto || 'Sin nombre' }}</li>
      <li v-if="producto.descripcion">
        <strong>Descripción del Producto:</strong> {{ producto.descripcion }}
      </li>
      <li><strong>Precio:</strong> USD ${{ formatPrice(producto.precio) }}</li>
      <li><strong>Stock:</strong> {{ producto.stock }} unidades</li>
      <li v-if="producto.peso"><strong>Peso:</strong> {{ producto.peso }} kg</li>
      <li v-if="producto.color"><strong>Color:</strong> {{ producto.color }}</li>
      <li v-if="producto.volumen"><strong>Volumen:</strong> {{ producto.volumen }} ml</li>
  
      <li><strong>Marca:</strong> {{ producto.marca?.nombre_marca || 'Sin marca' }}</li>
      <li v-if="producto.marca?.descripcion">
        <strong>Descripción de la Marca:</strong> {{ producto.marca.descripcion }}
      </li>
      <li v-if="producto.marca?.sitio_web">
        <strong>Sitio Web de la Marca:</strong>
        <a :href="producto.marca.sitio_web" target="_blank">{{ producto.marca.sitio_web }}</a>
      </li>
  
      <li><strong>Categoría:</strong> {{ producto.categoria?.nombre_categoria || 'Sin categoría' }}</li>
    </ul>
  </div>
  
  
        <div class="botones-accion">
    <a href="https://wa.me/593995924867" target="_blank" class="boton-compra">Comprar ahora</a>
   
  </div>
  
      </div>
    </div>
  </div>
  </div>
  
    <br>
    <br>
    <br>
    <br>
  
    <FooterAnth />
  </template>
  
  <script src="./ProductoDetalle.js"></script>
  <style src="./ProductoDetalle.css"></style>  