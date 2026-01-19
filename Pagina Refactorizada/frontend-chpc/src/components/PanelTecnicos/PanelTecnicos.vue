<template>
  <div class="panel-tecnicos">
    <div class="panel-header">
      <h1>Panel de Servicio Técnico</h1>
      <div class="header-stats">
        <div class="stat-card technical">
          <span class="stat-label">En Espera</span>
          <span class="stat-value">{{ estadisticas.espera }}</span>
        </div>
        <div class="stat-card revision">
          <span class="stat-label">En Revisión</span>
          <span class="stat-value">{{ estadisticas.revision }}</span>
        </div>
        <div class="stat-card delivered">
          <span class="stat-label">Entregados</span>
          <span class="stat-value">{{ estadisticas.entregado }}</span>
        </div>
      </div>
    </div

    <div class="orders-bar">
        <h2>Órdenes de Servicio Técnico</h2>
        <input 
          type="text" 
          v-model="localSearchQuery" 
          placeholder="Buscar por número de orden" 
            @input="onInput"
            @focus="programarCargaSugerencias"
            @blur="cerrarSugerencias"
            aria-label="Buscar órdenes de servicio técnico"
          class="search-input">
    </div>
    <div class="filtros">
      <button @click="$router.push('/home')" class="btn-volver">← Inicio</button>
      <div class="filtro-grupo">
        <label>Estado:</label>
        <select v-model="filtroEstado" class="filtro-select">
          <option value="">Todos los equipos</option>
          <option value="EN_ESPERA">En Espera</option>
          <option value="EN_REVISION">En Revisión</option>
          <option value="ENTREGADO">Entregado</option>
          <option value="BAJA">Baja (Sin Reparación)</option>
        </select>
      </div>
    </div>

    <div v-if="cargando" class="loading">Cargando taller...</div>
    
    <div v-else class="ordenes-grid">
      <div v-for="orden in ordenesFiltradas" :key="orden.id" class="orden-card" :class="orden.estado.toLowerCase()">
        <div class="orden-header">
          <span class="orden-id">#{{ orden.id }}</span>
          <span :class="['badge', `badge-${orden.estado.toLowerCase()}`]">
            {{ orden.estado.replace('_', ' ') }}
          </span>
        </div>

        <div class="orden-body">
          <section class="info-cliente">
            <h4><i class="icon">👤</i> {{ orden.clienteNombre }}</h4>
            <p>{{ orden.clienteTelefono }}</p>
          </section>

          <section class="info-equipo">
            <p><strong>Equipo:</strong> {{ orden.equipoMarca }} {{ orden.equipoModelo }}</p>
            <p><strong>S/N:</strong> {{ orden.equipoSerie }}</p>
            <p class="falla"><strong>Falla:</strong> {{ orden.fallaReportada }}</p>
          </section>

          <div class="tecnicos-info">
            <span>Recibió: {{ orden.tecnicoRecibe }}</span>
            <span v-if="orden.tecnicoEntrega">Entregó: {{ orden.tecnicoEntrega }}</span>
          </div>
        </div>

        <div class="orden-actions">
          <button v-if="orden.estado === 'EN_ESPERA'" @click="cambiarEstado(orden.id, 'EN_REVISION')" class="btn-primary">
            Empezar Revisión
          </button>
          <button v-if="orden.estado === 'EN_REVISION'" @click="cambiarEstado(orden.id, 'ENTREGADO')" class="btn-success">
            Marcar Entregado
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped src="./PanelTecnicos.js"></script>
<style scoped src="./PanelTecnicos.css"></style>