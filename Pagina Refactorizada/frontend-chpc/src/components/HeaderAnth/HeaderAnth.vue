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