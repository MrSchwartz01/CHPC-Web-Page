<template>
    <div>
      <!-- Header con opción para ir a la página principal -->
      <HeaderAnth
        :searchQuery="searchQuery"
        :isAuthenticated="isAuthenticated"
        @buscar="buscarProductos"
        @cerrar-sesion="cerrarSesion"
      />
  
      <!-- Contenedor de inicio de sesión -->
      <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <label for="nombre_usuario">Nombre de usuario *</label>
            <input
              v-model="nombre_usuario"
              id="nombre_usuario"
              type="text"
              placeholder="Nombre de usuario"
              required
              @input="clearError"
            />
            <p v-if="error && !contraseña" class="error">{{ error }}</p>
          </div>
  
          <div class="input-group">
            <label for="contraseña">Contraseña *</label>
            <div class="password-container">
              <input
                v-model="contraseña"
                id="contraseña"
                :type="passwordVisible ? 'text' : 'password'"
                placeholder="Contraseña"
                required
                @input="clearError"
              />
              <span class="toggle-password" @click="togglePasswordVisibility">
                {{ passwordVisible ? '👁️' : '🙈' }}
              </span>
            </div>
          </div>
  
          <button type="submit" class="login-button">Iniciar sesión</button>
          <p class="account-info">
            ¿No tiene una cuenta? 
            <button class="create-account-link" @click="goToRegister">
              Regístrese aquí
            </button>
          </p>
        </form>
      </div>
    </div>
  </template>
  <script src="./SesionUsuario.js"></script>
  <style src="./SesionUsuario.css"></style>