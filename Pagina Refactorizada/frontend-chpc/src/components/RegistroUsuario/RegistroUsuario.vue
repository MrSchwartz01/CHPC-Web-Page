<template>
    <div>
      <!-- Header con opción para ir a la página principal -->
      <HeaderAnth
        :searchQuery="searchQuery"
        :isAuthenticated="isAuthenticated"
        @buscar="buscarProductos"
        @cerrar-sesion="cerrarSesion"
      />
    </div>
    <br>
  
    <div class="register-container">
      <h2>Crear Una Cuenta</h2>
      <p><router-link to="/">Inicio</router-link> / Registro</p>
  
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="nombre_usuario">Nombre de usuario *</label>
          <input
            v-model="nombre_usuario"
            id="nombre_usuario"
            type="text"
            placeholder="Nombre de usuario"
            required
            @input="clearError('nombre_usuario')"
          />
          <p v-if="errors.nombre_usuario" class="error">{{ errors.nombre_usuario }}</p>
        </div>
  
        <div class="input-group">
          <label for="email">Correo electrónico *</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Correo electrónico"
            required
            @input="clearError('email')"
          />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>
  
        <div class="input-group">
          <label for="telefono">Teléfono</label>
          <input
            v-model="telefono"
            id="telefono"
            type="text"
            placeholder="Número de teléfono"
            @input="clearError('telefono')"
          />
          <p v-if="errors.telefono" class="error">{{ errors.telefono }}</p>
        </div>
  
        <div class="input-group">
          <label for="direccion">Dirección</label>
          <input
            v-model="direccion"
            id="direccion"
            type="text"
            placeholder="Dirección"
            @input="clearError('direccion')"
          />
          <p v-if="errors.direccion" class="error">{{ errors.direccion }}</p>
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
              @input="clearError('contraseña')"
            />
            <span class="toggle-password" @click="togglePasswordVisibility">
              {{ passwordVisible ? '👁️' : '🙈' }}
            </span>
          </div>
          <p v-if="errors.contraseña" class="error">{{ errors.contraseña }}</p>
        </div>
  
        <button type="submit" class="register-button">Registrarse</button>
  
        <p class="account-info">
          ¿Ya tiene una cuenta? 
          <router-link to="/login">Inicie sesión aquí</router-link>
        </p>
      </form>
  
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
  </template>
<script src="./RegistroUsuario.js"></script>
<style src="./RegistroUsuario.css"></style>  