<template>
  <div class="admin-panel">
    <div class="panel-header">
      <button class="back-button" @click="goToHome" title="Volver al Inicio">
        ← Volver al Inicio
      </button>
      <h1>Panel de Administración</h1>
      <div class="spacer"></div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <!-- Tab de Promociones -->
      <div v-if="activeTab === 'promociones'" class="tab-panel">
        <h2>Gestión de Promociones</h2>
        
        <!-- Alerta para vendedores -->
        <div v-if="isVendedor" class="info-message">
          ℹ️ <strong>Modo Solo Lectura:</strong> Como vendedor, puedes visualizar las promociones pero no crear, editar o eliminar.
        </div>
        
        <div v-if="isAdmin" class="form-section">
          <h3>{{ editingPromotion ? 'Editar Promoción' : 'Nueva Promoción' }}</h3>
          <form @submit.prevent="submitPromotion" class="promotion-form">
            <div class="form-group">
              <label>Producto:</label>
              <select v-model="promotionForm.producto_id" required>
                <option value="">Seleccione un producto</option>
                <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                  {{ producto.nombre_producto }} - ${{ producto.precio }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Porcentaje de Descuento (%):</label>
              <input
                type="number"
                v-model.number="promotionForm.porcentaje_descuento"
                min="0"
                max="100"
                step="0.01"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Fecha Inicio:</label>
                <input
                  type="datetime-local"
                  v-model="promotionForm.fecha_inicio"
                  required
                />
              </div>

              <div class="form-group">
                <label>Fecha Fin:</label>
                <input
                  type="datetime-local"
                  v-model="promotionForm.fecha_fin"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label>
                <input type="checkbox" v-model="promotionForm.activa" />
                Promoción Activa
              </label>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                {{ editingPromotion ? 'Actualizar' : 'Crear' }} Promoción
              </button>
              <button
                v-if="editingPromotion"
                type="button"
                class="btn btn-secondary"
                @click="cancelEditPromotion"
              >
                Cancelar
              </button>
            </div>

            <div v-if="promotionMessage" :class="['message', promotionMessageType]">
              {{ promotionMessage }}
            </div>
          </form>
        </div>

        <div class="promotions-list">
          <h3>Promociones Existentes</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Descuento</th>
                <th>Precio Original</th>
                <th>Precio con Descuento</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="promo in promociones" :key="promo.id">
                <td>{{ promo.id }}</td>
                <td>{{ promo.producto?.nombre_producto }}</td>
                <td>{{ promo.porcentaje_descuento }}%</td>
                <td>${{ promo.producto?.precio }}</td>
                <td>${{ calcularPrecioConDescuento(promo.producto?.precio, promo.porcentaje_descuento) }}</td>
                <td>{{ formatDate(promo.fecha_inicio) }}</td>
                <td>{{ formatDate(promo.fecha_fin) }}</td>
                <td>
                  <span :class="['status-badge', promo.activa ? 'active' : 'inactive']">
                    {{ promo.activa ? 'Activa' : 'Inactiva' }}
                  </span>
                </td>
                <td class="actions">
                  <button v-if="isAdmin" @click="editPromotion(promo)" class="btn-icon" title="Editar">✏️</button>
                  <button v-if="isAdmin" @click="deletePromotion(promo.id)" class="btn-icon" title="Eliminar">🗑️</button>
                  <span v-if="isVendedor" class="readonly-badge">👁️ Solo lectura</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab de Banners -->
      <div v-if="activeTab === 'banners'" class="tab-panel">
        <h2>Gestión de Banners</h2>
        
        <div v-if="isVendedor" class="info-message">
          ℹ️ <strong>Modo Solo Lectura:</strong> Como vendedor, puedes visualizar los banners pero no modificarlos.
        </div>
        
        <div v-if="isAdmin" class="form-section">
          <h3>{{ editingBanner ? 'Editar Banner' : 'Nuevo Banner' }}</h3>
          <form @submit.prevent="submitBanner" class="banner-form">
            <div class="form-group">
              <label>Título:</label>
              <input type="text" v-model="bannerForm.titulo" required />
            </div>

            <div class="form-group">
              <label>URL de la Imagen:</label>
              <input type="text" v-model="bannerForm.imagen_url" required />
            </div>

            <div class="form-group">
              <label>Producto Asociado (opcional):</label>
              <select v-model="bannerForm.producto_id">
                <option :value="null">Sin asociar</option>
                <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                  {{ producto.nombre_producto }}
                </option>
              </select>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                {{ editingBanner ? 'Actualizar' : 'Crear' }} Banner
              </button>
              <button
                v-if="editingBanner"
                type="button"
                class="btn btn-secondary"
                @click="cancelEditBanner"
              >
                Cancelar
              </button>
            </div>

            <div v-if="bannerMessage" :class="['message', bannerMessageType]">
              {{ bannerMessage }}
            </div>
          </form>
        </div>

        <div class="banners-list">
          <h3>Banners Existentes</h3>
          <div class="banners-grid">
            <div v-for="banner in banners" :key="banner.id" class="banner-card">
              <img :src="banner.imagen_url" :alt="banner.titulo" />
              <div class="banner-info">
                <h4>{{ banner.titulo }}</h4>
                <p v-if="banner.producto">Asociado a: {{ banner.producto.nombre_producto }}</p>
                <p v-else>Sin producto asociado</p>
                <div class="banner-actions">
                  <button v-if="isAdmin" @click="editBanner(banner)" class="btn-small">Editar</button>
                  <button v-if="isAdmin" @click="deleteBanner(banner.id)" class="btn-small btn-danger">Eliminar</button>
                  <span v-if="isVendedor" class="readonly-badge">👁️ Solo lectura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab de Logo -->
      <div v-if="activeTab === 'logo'" class="tab-panel">
        <h2>Configuración del Logo</h2>
        
        <div v-if="isVendedor" class="info-message">
          ℹ️ <strong>Acceso Restringido:</strong> Como vendedor, no tienes permisos para cambiar el logo del sitio.
        </div>
        
        <div v-if="isAdmin" class="form-section">
          <form @submit.prevent="submitLogo" class="logo-form">
            <div class="logo-preview" v-if="currentLogo">
              <h3>Logo Actual:</h3>
              <img :src="currentLogo" alt="Logo actual" class="current-logo" />
            </div>

            <div class="form-group">
              <label>Nueva URL del Logo:</label>
              <input type="text" v-model="logoForm.logo_url" required />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Actualizar Logo</button>
            </div>

            <div v-if="logoMessage" :class="['message', logoMessageType]">
              {{ logoMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

export default {
  name: 'AdminPanelMain',
  data() {
    return {
      API_BASE_URL, // Exponer para usar en template si es necesario
      activeTab: 'promociones',
      tabs: [
        { id: 'promociones', label: 'Promociones' },
        { id: 'banners', label: 'Banners' },
        { id: 'logo', label: 'Logo' },
      ],

      // Permisos
      userRole: '',
      isAdmin: false,
      isVendedor: false,

      // Promociones
      promociones: [],
      productos: [],
      editingPromotion: null,
      promotionForm: {
        producto_id: '',
        porcentaje_descuento: 0,
        fecha_inicio: '',
        fecha_fin: '',
        activa: true,
      },
      promotionMessage: '',
      promotionMessageType: '',

      // Banners
      banners: [],
      editingBanner: null,
      bannerForm: {
        titulo: '',
        imagen_url: '',
        producto_id: null,
      },
      bannerMessage: '',
      bannerMessageType: '',

      // Logo
      currentLogo: '',
      logoForm: {
        logo_url: '',
      },
      logoMessage: '',
      logoMessageType: '',
    };
  },

  mounted() {
    this.checkAuth();
    this.loadPromociones();
    this.loadProductos();
    this.loadBanners();
    this.loadLogo();
  },

  methods: {
    goToHome() {
      this.$router.push('/home');
    },
    
    checkAuth() {
      const role = localStorage.getItem('user_rol');
      this.userRole = role;
      this.isAdmin = role === 'administrador';
      this.isVendedor = role === 'vendedor';
      
      if (role !== 'administrador' && role !== 'vendedor') {
        this.$router.push('/');
        alert('Acceso denegado: Solo administradores y vendedores');
      }
    },

    getAuthHeaders() {
      const token = localStorage.getItem('access_token');
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },

    // ========== PROMOCIONES ==========
    async loadPromociones() {
      try {
        const response = await axios.get('${API_BASE_URL}/promociones');
        this.promociones = response.data;
      } catch (error) {
        console.error('Error al cargar promociones:', error);
      }
    },

    async loadProductos() {
      try {
        const response = await axios.get('${API_BASE_URL}/productos');
        this.productos = response.data;
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    },

    async submitPromotion() {
      try {
        if (this.editingPromotion) {
          await axios.patch(
            `${API_BASE_URL}/promociones/${this.editingPromotion.id}`,
            this.promotionForm,
            this.getAuthHeaders()
          );
          this.showPromotionMessage('Promoción actualizada exitosamente', 'success');
        } else {
          await axios.post(
            '${API_BASE_URL}/promociones',
            this.promotionForm,
            this.getAuthHeaders()
          );
          this.showPromotionMessage('Promoción creada exitosamente', 'success');
        }
        this.resetPromotionForm();
        this.loadPromociones();
      } catch (error) {
        console.error('Error al guardar promoción:', error);
        this.showPromotionMessage(
          error.response?.data?.message || 'Error al guardar la promoción',
          'error'
        );
      }
    },

    editPromotion(promo) {
      this.editingPromotion = promo;
      this.promotionForm = {
        producto_id: promo.producto_id,
        porcentaje_descuento: promo.porcentaje_descuento,
        fecha_inicio: this.formatDateForInput(promo.fecha_inicio),
        fecha_fin: this.formatDateForInput(promo.fecha_fin),
        activa: promo.activa,
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async deletePromotion(id) {
      if (!confirm('¿Está seguro de eliminar esta promoción?')) return;

      try {
        await axios.delete(
          `${API_BASE_URL}/promociones/${id}`,
          this.getAuthHeaders()
        );
        this.showPromotionMessage('Promoción eliminada exitosamente', 'success');
        this.loadPromociones();
      } catch (error) {
        console.error('Error al eliminar promoción:', error);
        this.showPromotionMessage('Error al eliminar la promoción', 'error');
      }
    },

    cancelEditPromotion() {
      this.resetPromotionForm();
    },

    resetPromotionForm() {
      this.editingPromotion = null;
      this.promotionForm = {
        producto_id: '',
        porcentaje_descuento: 0,
        fecha_inicio: '',
        fecha_fin: '',
        activa: true,
      };
    },

    showPromotionMessage(message, type) {
      this.promotionMessage = message;
      this.promotionMessageType = type;
      setTimeout(() => {
        this.promotionMessage = '';
      }, 3000);
    },

    // ========== BANNERS ==========
    async loadBanners() {
      try {
        const response = await axios.get('${API_BASE_URL}/banners');
        this.banners = response.data;
      } catch (error) {
        console.error('Error al cargar banners:', error);
      }
    },

    async submitBanner() {
      try {
        if (this.editingBanner) {
          await axios.patch(
            `${API_BASE_URL}/banners/${this.editingBanner.id}`,
            this.bannerForm,
            this.getAuthHeaders()
          );
          this.showBannerMessage('Banner actualizado exitosamente', 'success');
        } else {
          await axios.post(
            '${API_BASE_URL}/banners',
            this.bannerForm,
            this.getAuthHeaders()
          );
          this.showBannerMessage('Banner creado exitosamente', 'success');
        }
        this.resetBannerForm();
        this.loadBanners();
      } catch (error) {
        console.error('Error al guardar banner:', error);
        this.showBannerMessage('Error al guardar el banner', 'error');
      }
    },

    editBanner(banner) {
      this.editingBanner = banner;
      this.bannerForm = {
        titulo: banner.titulo,
        imagen_url: banner.imagen_url,
        producto_id: banner.producto_id,
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async deleteBanner(id) {
      if (!confirm('¿Está seguro de eliminar este banner?')) return;

      try {
        await axios.delete(
          `${API_BASE_URL}/banners/${id}`,
          this.getAuthHeaders()
        );
        this.showBannerMessage('Banner eliminado exitosamente', 'success');
        this.loadBanners();
      } catch (error) {
        console.error('Error al eliminar banner:', error);
        this.showBannerMessage('Error al eliminar el banner', 'error');
      }
    },

    cancelEditBanner() {
      this.resetBannerForm();
    },

    resetBannerForm() {
      this.editingBanner = null;
      this.bannerForm = {
        titulo: '',
        imagen_url: '',
        producto_id: null,
      };
    },

    showBannerMessage(message, type) {
      this.bannerMessage = message;
      this.bannerMessageType = type;
      setTimeout(() => {
        this.bannerMessage = '';
      }, 3000);
    },

    // ========== LOGO ==========
    async loadLogo() {
      try {
        const response = await axios.get('${API_BASE_URL}/configuracion/logo_url');
        this.currentLogo = response.data;
      } catch (error) {
        console.log('No hay logo configurado');
      }
    },

    async submitLogo() {
      try {
        await axios.post(
          '${API_BASE_URL}/configuracion',
          {
            clave: 'logo_url',
            valor: this.logoForm.logo_url,
          },
          this.getAuthHeaders()
        );
        this.showLogoMessage('Logo actualizado exitosamente', 'success');
        this.loadLogo();
        this.logoForm.logo_url = '';
      } catch (error) {
        console.error('Error al actualizar logo:', error);
        this.showLogoMessage('Error al actualizar el logo', 'error');
      }
    },

    showLogoMessage(message, type) {
      this.logoMessage = message;
      this.logoMessageType = type;
      setTimeout(() => {
        this.logoMessage = '';
      }, 3000);
    },

    // ========== UTILIDADES ==========
    calcularPrecioConDescuento(precio, descuento) {
      if (!precio || !descuento) return precio;
      return (precio - (precio * descuento) / 100).toFixed(2);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    },

    formatDateForInput(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.admin-panel {
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 2px solid #0066cc;
  padding-bottom: 15px;
}

.panel-header h1 {
  color: #333;
  font-size: 28px;
  margin: 0;
  flex: 1;
  text-align: center;
}

.back-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.back-button:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateX(-3px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.back-button:active {
  transform: translateX(-1px);
}

.spacer {
  width: 140px; /* Mismo ancho aproximado del botón para centrar el título */
}

/* Tabs */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
}

.tab-button {
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #0066cc;
}

.tab-button.active {
  color: #0066cc;
  border-bottom-color: #0066cc;
}

/* Tab Content */
.tab-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-panel h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.tab-panel h3 {
  color: #555;
  font-size: 18px;
  margin-bottom: 15px;
}

/* Forms */
.form-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="datetime-local"],
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input[type="checkbox"] {
  margin-right: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #0066cc;
  color: white;
}

.btn-primary:hover {
  background: #0052a3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-small {
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #0066cc;
  color: white;
}

.btn-small:hover {
  background: #0052a3;
}

.btn-danger {
  background: #dc3545;
}

.btn-danger:hover {
  background: #c82333;
}

/* Messages */
.message {
  padding: 12px;
  border-radius: 4px;
  margin-top: 15px;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Data Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-table thead {
  background: #0066cc;
  color: white;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.data-table .actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  transition: transform 0.2s ease;
}

.btn-icon:hover {
  transform: scale(1.2);
}

/* Status Badge */
.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

/* Banners Grid */
.banners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.banner-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.banner-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.banner-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.banner-info {
  padding: 15px;
}

.banner-info h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.banner-info p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
}

.banner-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Mensajes informativos */
.info-message {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-left: 4px solid #2196f3;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #1565c0;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
}

.readonly-badge {
  background: #e0e0e0;
  color: #666;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Logo */
.logo-preview {
  margin-bottom: 20px;
  text-align: center;
}

.current-logo {
  max-width: 300px;
  max-height: 150px;
  object-fit: contain;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  background: white;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .banners-grid {
    grid-template-columns: 1fr;
  }

  .data-table {
    font-size: 12px;
  }

  .data-table th,
  .data-table td {
    padding: 8px;
  }
}
</style>
