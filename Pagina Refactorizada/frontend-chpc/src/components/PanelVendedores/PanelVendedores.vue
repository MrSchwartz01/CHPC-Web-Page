<template>
  <div class="panel-vendedores">
    <!-- Encabezado -->
    <div class="panel-header">
      <h1>📊 Panel de Gestión de Pedidos</h1>
      <div class="header-stats">
        <div class="stat-card">
          <span class="stat-label">Pendientes</span>
          <span class="stat-value">{{ estadisticas.pendientes }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">En Trámite</span>
          <span class="stat-value">{{ estadisticas.enTramite }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Atendidos</span>
          <span class="stat-value">{{ estadisticas.atendidos }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Mis Pedidos</span>
          <span class="stat-value">{{ estadisticas.misPedidos }}</span>
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
          <option value="PENDIENTE">Pendiente</option>
          <option value="EN_TRAMITE">En Trámite</option>
          <option value="ATENDIDO">Atendido</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
      </div>
      <div class="filtro-grupo">
        <label>Vista:</label>
        <select v-model="vistaActual" class="filtro-select">
          <option value="todos">Todos los pedidos</option>
          <option value="mis-pedidos">Mis pedidos asignados</option>
          <option value="disponibles">Pedidos disponibles</option>
        </select>
      </div>
      <button @click="cargarPedidos" class="btn-refrescar">
        🔄 Refrescar
      </button>
    </div>

    <!-- Spinner de carga -->
    <div v-if="cargando" class="spinner-container">
      <div class="spinner"></div>
      <p>Cargando pedidos...</p>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="mensaje-error">
      {{ error }}
    </div>

    <!-- Lista de pedidos -->
    <div v-if="!cargando && !error" class="pedidos-lista">
      <div
        v-for="pedido in pedidosFiltrados"
        :key="pedido.id"
        class="pedido-card"
        :class="'estado-' + pedido.estado_gestion.toLowerCase()"
      >
        <!-- Encabezado del pedido -->
        <div class="pedido-header">
          <div class="pedido-info-principal">
            <h3>{{ pedido.codigo }}</h3>
            <span class="pedido-fecha">
              {{ formatearFecha(pedido.createdAt) }}
            </span>
          </div>
          <div class="pedido-badges">
            <span class="badge" :class="'badge-' + pedido.estado_gestion.toLowerCase()">
              {{ obtenerTextoEstado(pedido.estado_gestion) }}
            </span>
            <span v-if="pedido.vendedor_nombre" class="badge badge-vendedor">
              👤 {{ pedido.vendedor_nombre }}
            </span>
          </div>
        </div>

        <!-- Información del cliente -->
        <div class="pedido-cliente">
          <p><strong>Cliente:</strong> {{ pedido.nombre_cliente }}</p>
          <p><strong>Email:</strong> {{ pedido.email_cliente }}</p>
          <p v-if="pedido.telefono"><strong>Teléfono:</strong> {{ pedido.telefono }}</p>
          <p><strong>Dirección:</strong> {{ pedido.direccion_envio }}</p>
        </div>

        <!-- Productos -->
        <div class="pedido-productos">
          <h4>Productos ({{ pedido.totalItems }})</h4>
          <div class="producto-item" v-for="item in pedido.items" :key="item.id">
            <span class="producto-nombre">{{ item.nombre }}</span>
            <span class="producto-cantidad">x{{ item.cantidad }}</span>
            <span class="producto-precio">${{ item.precio.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="pedido-total">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>${{ pedido.subtotal.toFixed(2) }}</span>
          </div>
          <div v-if="pedido.descuento > 0" class="total-row">
            <span>Descuento:</span>
            <span>-${{ pedido.descuento.toFixed(2) }}</span>
          </div>
          <div class="total-row total-final">
            <span>Total:</span>
            <span>${{ pedido.total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Observaciones -->
        <div v-if="pedido.observaciones" class="pedido-observaciones">
          <strong>Observaciones:</strong>
          <p>{{ pedido.observaciones }}</p>
        </div>

        <!-- Acciones -->
        <div class="pedido-acciones">
          <!-- Botón para asignar/tomar pedido -->
          <button
            v-if="!pedido.vendedor_id"
            @click="asignarPedido(pedido.id)"
            class="btn btn-primary"
          >
            📌 Tomar Pedido
          </button>

          <!-- Botón para desasignar -->
          <button
            v-if="pedido.vendedor_id && (esAdmin || pedido.vendedor_id === usuarioId)"
            @click="desasignarPedido(pedido.id)"
            class="btn btn-secondary"
          >
            🔓 Liberar Pedido
          </button>

          <!-- Selector de estado (solo para pedidos asignados al vendedor o admin) -->
          <div
            v-if="pedido.vendedor_id && (esAdmin || pedido.vendedor_id === usuarioId)"
            class="estado-selector"
          >
            <label>Cambiar estado:</label>
            <select
              :value="pedido.estado_gestion"
              @change="cambiarEstado(pedido.id, $event.target.value)"
              class="estado-select"
            >
              <option value="PENDIENTE">⏳ Pendiente</option>
              <option value="EN_TRAMITE">🔄 En Trámite</option>
              <option value="ATENDIDO">✅ Atendido</option>
              <option value="CANCELADO">❌ Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay pedidos -->
      <div v-if="pedidosFiltrados.length === 0" class="sin-pedidos">
        <p>📭 No hay pedidos que mostrar con los filtros seleccionados</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PanelVendedores',
  data() {
    return {
      pedidos: [],
      cargando: false,
      error: null,
      filtroEstado: '',
      vistaActual: 'todos',
      usuarioId: null,
      usuarioNombre: '',
      esAdmin: false,
    };
  },
  computed: {
    pedidosFiltrados() {
      let resultado = [...this.pedidos];

      // Filtrar por estado
      if (this.filtroEstado) {
        resultado = resultado.filter(p => p.estado_gestion === this.filtroEstado);
      }

      // Filtrar por vista
      if (this.vistaActual === 'mis-pedidos') {
        resultado = resultado.filter(p => p.vendedor_id === this.usuarioId);
      } else if (this.vistaActual === 'disponibles') {
        resultado = resultado.filter(p => !p.vendedor_id);
      }

      return resultado;
    },
    estadisticas() {
      return {
        pendientes: this.pedidos.filter(p => p.estado_gestion === 'PENDIENTE').length,
        enTramite: this.pedidos.filter(p => p.estado_gestion === 'EN_TRAMITE').length,
        atendidos: this.pedidos.filter(p => p.estado_gestion === 'ATENDIDO').length,
        misPedidos: this.pedidos.filter(p => p.vendedor_id === this.usuarioId).length,
      };
    },
  },
  methods: {
    irAInicio() {
      this.$router.push('/home');
    },
    async cargarPedidos() {
      this.cargando = true;
      this.error = null;
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL || 'http://localhost:5000/api'}/ordenes/panel/todas`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        this.pedidos = response.data;
      } catch (err) {
        console.error('Error al cargar pedidos:', err);
        this.error = err.response?.data?.message || 'Error al cargar los pedidos';
      } finally {
        this.cargando = false;
      }
    },
    async asignarPedido(pedidoId) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.post(
          `${process.env.VUE_APP_API_URL || 'http://localhost:5000/api'}/ordenes/${pedidoId}/asignar`,
          {
            vendedor_nombre: this.usuarioNombre,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await this.cargarPedidos();
        this.$toast?.success('Pedido asignado exitosamente');
      } catch (err) {
        console.error('Error al asignar pedido:', err);
        alert(err.response?.data?.message || 'Error al asignar el pedido');
      }
    },
    async desasignarPedido(pedidoId) {
      if (!confirm('¿Estás seguro de que deseas liberar este pedido?')) {
        return;
      }
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(
          `${process.env.VUE_APP_API_URL || 'http://localhost:5000/api'}/ordenes/${pedidoId}/desasignar`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await this.cargarPedidos();
        this.$toast?.success('Pedido liberado exitosamente');
      } catch (err) {
        console.error('Error al desasignar pedido:', err);
        alert(err.response?.data?.message || 'Error al liberar el pedido');
      }
    },
    async cambiarEstado(pedidoId, nuevoEstado) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.patch(
          `${process.env.VUE_APP_API_URL || 'http://localhost:5000/api'}/ordenes/${pedidoId}/estado-gestion`,
          {
            estado_gestion: nuevoEstado,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await this.cargarPedidos();
        this.$toast?.success('Estado actualizado exitosamente');
      } catch (err) {
        console.error('Error al cambiar estado:', err);
        alert(err.response?.data?.message || 'Error al cambiar el estado');
      }
    },
    obtenerTextoEstado(estado) {
      const estados = {
        PENDIENTE: '⏳ Pendiente',
        EN_TRAMITE: '🔄 En Trámite',
        ATENDIDO: '✅ Atendido',
        CANCELADO: '❌ Cancelado',
      };
      return estados[estado] || estado;
    },
    formatearFecha(fecha) {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    async cargarDatosUsuario() {
      // Primero intentar cargar desde localStorage
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        this.usuarioId = usuario.id;
        this.usuarioNombre = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim();
        this.esAdmin = usuario.rol === 'administrador';
        return;
      }

      // Si no está en localStorage, cargar desde la API
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL || 'http://localhost:5000/api'}/usuarios/perfil`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        const usuario = response.data;
        this.usuarioId = usuario.id;
        this.usuarioNombre = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim();
        this.esAdmin = usuario.rol === 'administrador';
        
        // Guardar en localStorage para próximas veces
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('user_id', usuario.id);
        localStorage.setItem('user_rol', usuario.rol);
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        this.error = 'No se pudieron cargar los datos del usuario';
      }
    },
  },
  async mounted() {
    await this.cargarDatosUsuario();
    this.cargarPedidos();
    // Refrescar cada 30 segundos
    this.intervalo = setInterval(() => {
      this.cargarPedidos();
    }, 30000);
  },
  beforeUnmount() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  },
};
</script>

<style scoped>
.panel-vendedores {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.panel-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.panel-header h1 {
  margin: 0 0 20px 0;
  font-size: 2rem;
}

.header-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}

.filtros {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filtro-grupo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filtro-grupo label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}

.filtro-select {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filtro-select:hover,
.filtro-select:focus {
  border-color: #667eea;
  outline: none;
}

.btn-volver-inicio {
  padding: 8px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-volver-inicio:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.btn-refrescar {
  padding: 8px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
  align-self: flex-end;
}

.btn-refrescar:hover {
  background: #5568d3;
}

.spinner-container {
  text-align: center;
  padding: 50px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.mensaje-error {
  background: #fee;
  color: #c33;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #c33;
  margin-bottom: 20px;
}

.pedidos-lista {
  display: grid;
  gap: 20px;
}

.pedido-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #ddd;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pedido-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.pedido-card.estado-pendiente {
  border-left-color: #ffa726;
}

.pedido-card.estado-en_tramite {
  border-left-color: #42a5f5;
}

.pedido-card.estado-atendido {
  border-left-color: #66bb6a;
}

.pedido-card.estado-cancelado {
  border-left-color: #ef5350;
}

.pedido-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.pedido-info-principal h3 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.pedido-fecha {
  display: block;
  color: #888;
  font-size: 0.85rem;
  margin-top: 5px;
}

.pedido-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge-pendiente {
  background: #fff3e0;
  color: #f57c00;
}

.badge-en_tramite {
  background: #e3f2fd;
  color: #1976d2;
}

.badge-atendido {
  background: #e8f5e9;
  color: #388e3c;
}

.badge-cancelado {
  background: #ffebee;
  color: #d32f2f;
}

.badge-vendedor {
  background: #f3e5f5;
  color: #7b1fa2;
}

.pedido-cliente {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.pedido-cliente p {
  margin: 5px 0;
  font-size: 0.95rem;
}

.pedido-productos {
  margin-bottom: 15px;
}

.pedido-productos h4 {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 1rem;
}

.producto-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.producto-item:last-child {
  border-bottom: none;
}

.producto-nombre {
  flex: 1;
  color: #333;
}

.producto-cantidad {
  margin: 0 15px;
  color: #666;
}

.producto-precio {
  font-weight: 600;
  color: #667eea;
}

.pedido-total {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.total-final {
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
  padding-top: 10px;
  border-top: 2px solid #ddd;
}

.pedido-observaciones {
  background: #fffbea;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 3px solid #ffa726;
}

.pedido-observaciones p {
  margin: 5px 0 0 0;
  color: #666;
}

.pedido-acciones {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background: #d0d0d0;
}

.estado-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.estado-selector label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
}

.estado-select {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: border-color 0.3s;
}

.estado-select:hover,
.estado-select:focus {
  border-color: #667eea;
  outline: none;
}

.sin-pedidos {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .panel-header h1 {
    font-size: 1.5rem;
  }

  .header-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .pedido-header {
    flex-direction: column;
  }

  .pedido-acciones {
    flex-direction: column;
    width: 100%;
  }

  .btn,
  .estado-selector {
    width: 100%;
  }
}
</style>
