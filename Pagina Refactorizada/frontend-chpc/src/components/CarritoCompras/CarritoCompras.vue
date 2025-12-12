<template>
  <div>
    <HeaderAnth
      :searchQuery="searchQuery"
      :isAuthenticated="isAuthenticated"
      @buscar="buscarProductos"
      @cerrar-sesion="cerrarSesion"
    />

    <div class="carrito-container">
      <h1>🛒 Carrito de Compras</h1>
      
      <div v-if="productosCarrito.length === 0" class="carrito-vacio">
        <div class="vacio-icon">🛍️</div>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para comenzar tu compra</p>
        <button @click="irAInicio" class="btn-comprar">
          Explorar Productos
        </button>
      </div>

      <div v-else class="carrito-content">
        <!-- Lista de productos -->
        <div class="productos-section">
          <div
            v-for="item in productosCarrito"
            :key="item.id"
            class="producto-item"
          >
            <img :src="item.imagen_url" :alt="item.nombre" />
            <div class="producto-detalles">
              <h3>{{ item.nombre }}</h3>
              <p class="marca">{{ item.marca }}</p>
              <p class="precio-unitario">${{ item.precio }} c/u</p>
            </div>
            <div class="cantidad-control">
              <button @click="disminuirCantidad(item.id)" class="btn-cantidad">
                -
              </button>
              <span class="cantidad">{{ item.cantidad }}</span>
              <button @click="aumentarCantidad(item.id)" class="btn-cantidad">
                +
              </button>
            </div>
            <div class="producto-total">
              <p class="subtotal">${{ calcularSubtotal(item) }}</p>
              <button @click="eliminarProducto(item.id)" class="btn-eliminar">
                🗑️
              </button>
            </div>
          </div>
        </div>

        <!-- Resumen de compra -->
        <div class="resumen-section">
          <div class="resumen-card">
            <h2>Resumen de Compra</h2>
            
            <div class="resumen-linea">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div class="resumen-linea">
              <span>IVA (15%):</span>
              <span>${{ iva.toFixed(2) }}</span>
            </div>
            
            <div class="resumen-linea">
              <span>Envío:</span>
              <span>${{ envio.toFixed(2) }}</span>
            </div>
            
            <div class="resumen-linea total">
              <span>Total:</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>

            <button @click="procederCompra" class="btn-finalizar">
              Proceder al Pago
            </button>
            
            <button @click="vaciarCarrito" class="btn-vaciar">
              Vaciar Carrito
            </button>
          </div>

          <!-- Información adicional -->
          <div class="info-card">
            <h3>🚚 Información de Envío</h3>
            <p>Envío gratis en compras mayores a $100</p>
            <p>Entrega en 2-5 días hábiles</p>
          </div>

          <div class="info-card">
            <h3>💳 Métodos de Pago</h3>
            <p>Aceptamos todas las tarjetas de crédito y débito</p>
            <p>Transferencias bancarias</p>
          </div>
        </div>
      </div>
    </div>

    <FooterAnth />
  </div>
</template>

<script src="./CarritoCompras.js"></script>
<style src="./CarritoCompras.css"></style>
