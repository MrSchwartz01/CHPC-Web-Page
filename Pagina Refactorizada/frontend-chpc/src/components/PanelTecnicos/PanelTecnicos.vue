<template>
  <div class="panel-tecnicos">
    <!-- Encabezado -->
    <div class="panel-header">
      <h1>Panel de Servicio Técnico</h1>
      <div class="header-stats">
        <div class="stat-card">
          <span class="stat-label">En Espera</span>
          <span class="stat-value">{{ estadisticas.enEspera }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">En Revisión</span>
          <span class="stat-value">{{ estadisticas.enRevision }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Reparados</span>
          <span class="stat-value">{{ estadisticas.reparados }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Mis Equipos</span>
          <span class="stat-value">{{ estadisticas.misEquipos }}</span>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filtros">
      <button @click="irAInicio" class="btn-volver-inicio">
        ← Volver al Inicio
      </button>
      <div class="filtro-grupo">
        <label>Filtrar por estado:</label>
        <select v-model="filtroEstado" class="filtro-select">
          <option value="">Todos</option>
          <option value="EN_ESPERA">En Espera</option>
          <option value="EN_REVISION">En Revisión</option>
          <option value="REPARADO">Reparado</option>
          <option value="ENTREGADO">Entregado</option>
          <option value="SIN_REPARACION">Sin Reparación</option>
        </select>
      </div>
      <div class="filtro-grupo">
        <label>Vista:</label>
        <select v-model="vistaActual" class="filtro-select">
          <option value="todos">Todas las órdenes</option>
          <option value="mis-ordenes">Mis órdenes asignadas</option>
          <option value="disponibles">Órdenes disponibles</option>
        </select>
      </div>
      <button @click="cargarOrdenes" class="btn-refrescar">
        🔄 Refrescar
      </button>
    </div>

    <!-- Spinner de carga -->
    <div v-if="cargando" class="spinner-container">
      <div class="spinner"></div>
      <p>Cargando órdenes de servicio...</p>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="mensaje-error">
      {{ error }}
    </div>

    <!-- Lista de órdenes de servicio -->
    <div v-if="!cargando && !error" class="ordenes-lista">
      <div
        v-for="orden in ordenesFiltradas"
        :key="orden.id"
        class="orden-card"
        :class="'estado-' + orden.estado.toLowerCase().replace('_', '-')"
      >
        <!-- Encabezado de la orden -->
        <div class="orden-header">
          <div class="orden-info-principal">
            <h3>Orden #{{ orden.numero_orden || orden.id }}</h3>
            <span class="orden-fecha">
              {{ formatearFecha(orden.fecha_ingreso || orden.createdAt) }}
            </span>
          </div>
          <div class="orden-badges">
            <span class="badge" :class="'badge-' + orden.estado.toLowerCase().replace('_', '-')">
              {{ obtenerTextoEstado(orden.estado) }}
            </span>
            <span v-if="orden.tecnico_nombre" class="badge badge-tecnico">
              🔧 {{ orden.tecnico_nombre }}
            </span>
          </div>
        </div>

        <!-- Información del cliente -->
        <div class="orden-cliente">
          <p><strong>Cliente:</strong> {{ orden.cliente_nombre }}</p>
          <p v-if="orden.cliente_telefono"><strong>Teléfono:</strong> {{ orden.cliente_telefono }}</p>
          <p v-if="orden.cliente_email"><strong>Email:</strong> {{ orden.cliente_email }}</p>
        </div>

        <!-- Información del equipo -->
        <div class="orden-equipo">
          <h4>Información del Equipo</h4>
          <p><strong>Tipo:</strong> {{ orden.tipo_equipo || 'N/A' }}</p>
          <p><strong>Marca/Modelo:</strong> {{ orden.marca_equipo }} {{ orden.modelo_equipo }}</p>
          <p v-if="orden.serie_equipo"><strong>Serie:</strong> {{ orden.serie_equipo }}</p>
          <p class="falla"><strong>Falla Reportada:</strong> {{ orden.falla_reportada }}</p>
          <p v-if="orden.diagnostico" class="diagnostico"><strong>Diagnóstico:</strong> {{ orden.diagnostico }}</p>
        </div>

        <!-- Observaciones -->
        <div v-if="orden.observaciones" class="orden-observaciones">
          <strong>Observaciones:</strong>
          <p>{{ orden.observaciones }}</p>
        </div>

        <!-- Acciones -->
        <div class="orden-acciones">
          <!-- Botón para asignar/tomar orden -->
          <button
            v-if="!orden.tecnico_id"
            @click="asignarOrden(orden.id)"
            class="btn btn-primary"
          >
            Tomar Orden
          </button>

          <!-- Botón para desasignar -->
          <button
            v-if="orden.tecnico_id && (esAdmin || orden.tecnico_id === usuarioId)"
            @click="desasignarOrden(orden.id)"
            class="btn btn-secondary"
          >
            Liberar Orden
          </button>
<!-- Formulario de orden de servicio-->
        <div class="acciones-principales">
  <button @click="mostrarFormulario = true" class="btn-nueva-orden">
    Nueva Orden de Servicio
  </button>
</div>

<div v-if="mostrarFormulario" class="modal-overlay">
  <div class="modal-content">
    <h2>Nueva Orden de Servicio</h2>
    <form @submit.prevent="crearOrden">
      <div class="form-grid">
        <section>
          <h3>Datos del Cliente</h3>
          <input v-model="nuevaOrden.cliente_nombre" placeholder="Nombre completo" required>
          <input v-model="nuevaOrden.cliente_telefono" placeholder="Teléfono" required>
        </section>
        
        <section>
          <h3>Datos del Equipo</h3>
          <input v-model="nuevaOrden.equipo_modelo" placeholder="Modelo (Ej: MacBook Air 2020)" required>
          <textarea v-model="nuevaOrden.falla_reportada" placeholder="Descripción de la falla" required></textarea>
        </section>
      </div>
      <div class="modal-buttons">
        <button type="button" @click="mostrarFormulario = false">Cancelar</button>
        <button type="submit" class="btn-guardar">Generar Orden</button>
      </div>
    </form>
  </div>
</div>
          <!-- Cambiar estado (solo si está asignado al técnico o es admin) -->
          <div v-if="orden.tecnico_id && (esAdmin || orden.tecnico_id === usuarioId)" class="estado-acciones">
            <button
              v-if="orden.estado === 'EN_ESPERA'"
              @click="cambiarEstado(orden.id, 'EN_REVISION')"
              class="btn btn-info"
            >
              Iniciar Revisión
            </button>
            <button
              v-if="orden.estado === 'EN_REVISION'"
              @click="cambiarEstado(orden.id, 'REPARADO')"
              class="btn btn-success"
            >
              Marcar como Reparado
            </button>
            <button
              v-if="orden.estado === 'REPARADO'"
              @click="cambiarEstado(orden.id, 'ENTREGADO')"
              class="btn btn-complete"
            >
              Marcar como Entregado
            </button>
            <button
              v-if="['EN_ESPERA', 'EN_REVISION'].includes(orden.estado)"
              @click="cambiarEstado(orden.id, 'SIN_REPARACION')"
              class="btn btn-danger"
            >
              Sin Reparación
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay órdenes -->
    <div v-if="!cargando && !error && ordenesFiltradas.length === 0" class="mensaje-vacio">
      <p>No hay órdenes de servicio con los filtros seleccionados</p>
    </div>
  </div>
</template>

<script src="./PanelTecnicos.js"></script>
<style src="./PanelTecnicos.css"></style>