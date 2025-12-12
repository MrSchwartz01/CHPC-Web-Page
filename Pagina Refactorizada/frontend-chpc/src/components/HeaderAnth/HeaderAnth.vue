<template>
    <transition name="fade">
      <header v-bind:class="{ 'fade-in': isVisible }" class="header">
        <div class="main-header">
          <!-- Logo -->
          <div class="logo">
            <a href="/">
              <img src="@/images/logo/logo.png" alt="Logo de la página" />
            </a>
          </div>
  
          <!-- Barra de búsqueda -->
          <div class="search-bar">
            <input
              type="text"
              v-model="localSearchQuery"
              placeholder="Tenemos lo que usted está buscando"
              @input="buscarProductos"
              aria-label="Buscar productos"
            />
            <button @click="buscarProductos" aria-label="Buscar">
              <span class="search-icon">🔍</span>
            </button>
          </div>
  
          <!-- Acciones de usuario -->
          <div class="user-actions">
            <button class="carrito-button" @click="goToCarrito" title="Carrito de compras">
              🛒
              <span v-if="cantidadCarrito > 0" class="carrito-badge">{{ cantidadCarrito }}</span>
            </button>
            <template v-if="!isAuthenticated">
              <button class="action-button" @click="goToLogin">Ingresar</button>
              <button class="action-button" @click="goToRegister">Hacerse cliente</button>
            </template>
            <template v-else>
              <button class="action-button" @click="cerrarSesion">Cerrar Sesión</button>
            </template>
          </div>
        </div>
  
        <!-- Menú de navegación -->
        <nav class="main-menu">
          <ul>
            <li><a href="/home">Inicio</a></li>
            <li 
              class="dropdown-menu"
              @mouseenter="showProductsMenu = true"
              @mouseleave="showProductsMenu = false"
              @dblclick="goToCategorias"
            >
              <a href="#" @click.prevent>Productos</a>
              <transition name="dropdown-fade">
                <ul v-if="showProductsMenu" class="dropdown-content">
                  <li><a href="/productos/categoria/laptops">Laptops</a></li>
                  <li><a href="/productos/categoria/desktops">Computadoras de Escritorio</a></li>
                  <li><a href="/productos/categoria/monitores">Monitores</a></li>
                  <li><a href="/productos/categoria/teclados">Teclados</a></li>
                  <li><a href="/productos/categoria/mouses">Mouses</a></li>
                  <li><a href="/productos/categoria/impresoras">Impresoras</a></li>
                  <li><a href="/productos/categoria/camaras">Cámaras de Seguridad</a></li>
                  <li><a href="/productos/categoria/tablets">Tablets</a></li>
                  <li><a href="/productos/categoria/accesorios">Accesorios</a></li>
                  <li><a href="/productos/categoria/redes">Equipos de Red</a></li>
                </ul>
              </transition>
            </li>
            <li><a href="/servicio-tecnico">Servicio Técnico</a></li>
            <li><a href="/redes-sociales">Redes Sociales</a></li>
            <li><a href="/marcas">Marcas</a></li>
          </ul>
        </nav>
      </header>
    </transition>
  </template>
  <script src="./HeaderAnth.js"></script>
  <style src="./HeaderAnth.css"></style> 