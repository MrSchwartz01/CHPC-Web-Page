# 🎨 Guía de Implementación: Plantilla Dashboard para CHPC

## 📁 Sistema de Estilos Globales Creado

Ya he creado la base del sistema de diseño:

### ✅ Archivos Creados:
- `src/styles/variables.css` - Variables CSS globales (colores, espaciados, tipografía)
- `src/styles/global.css` - Estilos base y clases utilitarias
- `src/components/MisionVision/MisionVision-refactored.css` - Ejemplo de refactorización

### ✅ Actualizado:
- `src/main.js` - Importa los estilos globales en orden correcto

---

## 🚀 Pasos para Aplicar Plantilla de Dashboard

### **Paso 1: Elegir la Plantilla**

Te recomiendo estas opciones según tus necesidades:

#### **Opción A: CoreUI Vue (Recomendada para este proyecto)**
```bash
npm install @coreui/vue @coreui/coreui
npm install @coreui/icons @coreui/icons-vue
```

**Ventajas:**
- ✅ Compatible con Vue 3
- ✅ Componentes listos para dashboard
- ✅ Responsive por defecto
- ✅ Documentación completa
- ✅ Gratis con licencia MIT

#### **Opción B: Vuetify**
```bash
npm install vuetify
npm install @mdi/font
```

**Ventajas:**
- ✅ Material Design
- ✅ Amplia librería de componentes
- ✅ Muy popular

#### **Opción C: Element Plus**
```bash
npm install element-plus
npm install @element-plus/icons-vue
```

**Ventajas:**
- ✅ Componentes enterprise
- ✅ Excelente para dashboards
- ✅ Bien documentado

---

### **Paso 2: Crear Estructura de Layouts**

Crea la siguiente estructura:

```
src/
├── layouts/
│   ├── DashboardLayout.vue      # Layout principal con sidebar + navbar
│   ├── AuthLayout.vue           # Layout para login/registro
│   └── EmptyLayout.vue          # Layout sin header/footer
├── views/
│   └── Dashboard/
│       ├── Overview.vue         # Dashboard principal
│       ├── Ventas.vue          # Vista de ventas
│       └── Productos.vue       # Vista de productos
```

---

### **Paso 3: Implementar DashboardLayout**

#### Ejemplo con CoreUI:

**`src/layouts/DashboardLayout.vue`**
```vue
<template>
  <CContainer fluid class="dashboard-layout">
    <CSidebar 
      :visible="sidebarVisible" 
      @visible-change="toggleSidebar"
      class="dashboard-sidebar"
    >
      <CSidebarBrand>
        <img src="@/assets/logo.png" alt="CHPC" />
        <span>CHPC Admin</span>
      </CSidebarBrand>
      
      <CSidebarNav>
        <CNavItem>
          <CNavLink to="/dashboard" active>
            📊 Dashboard
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink to="/panel-vendedores">
            👥 Panel Vendedores
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink to="/admin/productos">
            📦 Productos
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink to="/admin/ordenes">
            🛒 Órdenes
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
    
    <div class="dashboard-content">
      <CHeader class="dashboard-navbar">
        <CContainer fluid>
          <CHeaderToggler @click="toggleSidebar" />
          <CHeaderNav class="ms-auto">
            <NotificationsBell />
            <CDropdown variant="nav-item">
              <CDropdownToggle color="link">
                👤 {{ userName }}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem to="/perfil">Mi Perfil</CDropdownItem>
                <CDropdownItem @click="cerrarSesion">Cerrar Sesión</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CHeaderNav>
        </CContainer>
      </CHeader>
      
      <main class="dashboard-main">
        <router-view />
      </main>
    </div>
  </CContainer>
</template>

<script>
export default {
  name: 'DashboardLayout',
  data() {
    return {
      sidebarVisible: true,
      userName: 'Usuario'
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },
    cerrarSesion() {
      // Lógica de cierre de sesión
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}

.dashboard-sidebar {
  background: var(--color-secondary);
  width: var(--sidebar-width);
}

.dashboard-content {
  margin-left: var(--sidebar-width);
  transition: var(--transition-base);
}

.dashboard-navbar {
  height: var(--navbar-height);
  background: var(--bg-white);
  box-shadow: var(--shadow-sm);
}

.dashboard-main {
  padding: var(--dashboard-padding);
  background: var(--bg-light);
  min-height: calc(100vh - var(--navbar-height));
}
</style>
```

---

### **Paso 4: Actualizar Router**

**`src/router/index.js`**
```javascript
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes = [
  // Rutas públicas
  {
    path: '/',
    component: () => import('@/layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/components/HomePage/HomePage.vue')
      }
    ]
  },
  
  // Rutas de autenticación
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/components/SesionUsuario/SesionUsuario.vue')
      },
      {
        path: 'registro',
        name: 'Registro',
        component: () => import('@/components/RegistroUsuario/RegistroUsuario.vue')
      }
    ]
  },
  
  // Rutas del dashboard
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardOverview',
        component: () => import('@/components/Dashboard/DashboardMain.vue')
      },
      {
        path: 'ventas',
        name: 'Ventas',
        component: () => import('@/views/Dashboard/Ventas.vue')
      },
      {
        path: 'productos',
        name: 'ProductosAdmin',
        component: () => import('@/components/AdminPanel/AdminProductos.vue')
      }
    ]
  },
  
  // Panel de vendedores
  {
    path: '/panel-vendedores',
    component: DashboardLayout,
    meta: { requiresAuth: true, role: 'vendedor' },
    children: [
      {
        path: '',
        name: 'PanelVendedores',
        component: () => import('@/components/PanelVendedores/PanelVendedores.vue')
      }
    ]
  }
]

export default routes
```

---

### **Paso 5: Migrar Componentes Existentes**

#### Refactorizar `DashboardMain.vue` para usar variables globales:

**Cambios en el CSS:**
```css
/* ANTES */
.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* DESPUÉS */
.kpi-card {
  background: var(--bg-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}
```

---

### **Paso 6: Componentes Reutilizables**

Crea componentes genéricos para el dashboard:

**`src/components/Dashboard/KPICard.vue`**
```vue
<template>
  <div class="kpi-card">
    <div class="kpi-icon" :style="{ background: gradient }">
      {{ icon }}
    </div>
    <div class="kpi-content">
      <h3>{{ title }}</h3>
      <p class="kpi-value">{{ value }}</p>
      <span :class="['kpi-change', changeType]">
        {{ changeText }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KPICard',
  props: {
    icon: String,
    title: String,
    value: [String, Number],
    changeText: String,
    changeType: {
      type: String,
      default: 'positive'
    },
    gradient: String
  }
}
</script>

<style scoped>
.kpi-card {
  background: var(--bg-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  transition: var(--transition-all);
  display: flex;
  gap: var(--spacing-base);
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.kpi-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-3xl);
}

.kpi-content h3 {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.kpi-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  margin: var(--spacing-sm) 0;
}

.kpi-change {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.kpi-change.positive {
  color: var(--color-success);
}

.kpi-change.negative {
  color: var(--color-error);
}
</style>
```

**Uso:**
```vue
<KPICard
  icon="💰"
  title="Ventas Totales"
  :value="`$${formatearNumero(ventasTotales)}`"
  changeText="+12.5% vs mes anterior"
  changeType="positive"
  gradient="var(--bg-gradient-orange)"
/>
```

---

## 🎯 Plan de Migración Gradual

### **Fase 1: Preparación (✅ Completado)**
- [x] Crear sistema de variables CSS
- [x] Crear estilos globales
- [x] Actualizar main.js

### **Fase 2: Estructura (Siguiente)**
- [ ] Instalar librería de componentes (CoreUI/Vuetify/Element Plus)
- [ ] Crear layouts (Dashboard, Auth, Empty)
- [ ] Actualizar router con layouts

### **Fase 3: Componentes Base**
- [ ] Crear Sidebar component
- [ ] Crear Navbar component
- [ ] Crear componentes reutilizables (KPICard, ChartCard, etc.)

### **Fase 4: Migración Gradual**
- [ ] Migrar DashboardMain.vue a usar variables globales
- [ ] Migrar AdminPanel.vue
- [ ] Migrar PanelVendedores.vue
- [ ] Migrar MisionVision.vue (ejemplo creado)

### **Fase 5: Optimización**
- [ ] Revisar y consolidar estilos duplicados
- [ ] Implementar tema oscuro (opcional)
- [ ] Optimizar rendimiento

---

## 📊 Ventajas del Sistema Implementado

### **Antes:**
```css
/* Valores hardcodeados en cada componente */
.card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  color: #2c3e50;
}
```

### **Ahora:**
```css
/* Variables centralizadas */
.card {
  background: var(--bg-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-md);
  color: var(--color-text-primary);
}
```

### **Beneficios:**
- ✅ **Cambio rápido de tema**: Modifica una variable, cambia todo el sitio
- ✅ **Consistencia**: Mismo espaciado y colores en todo el proyecto
- ✅ **Mantenibilidad**: Fácil de entender y modificar
- ✅ **Escalabilidad**: Agregar nuevos componentes es más rápido
- ✅ **Accesibilidad**: Variables para temas oscuros y reducción de movimiento

---

## 🔄 Ejemplo de Refactorización Rápida

Para refactorizar cualquier componente:

1. **Identifica valores repetidos**
2. **Busca la variable correspondiente en variables.css**
3. **Reemplaza**

```css
/* ANTES */
background: #ff6600;
padding: 24px;
margin-bottom: 20px;
border-radius: 12px;

/* DESPUÉS */
background: var(--color-primary);
padding: var(--spacing-xl);
margin-bottom: var(--spacing-lg);
border-radius: var(--border-radius-md);
```

---

## 📚 Recursos Adicionales

### **Plantillas GitHub Recomendadas:**
- [CoreUI Vue Admin Template](https://github.com/coreui/coreui-free-vue-admin-template)
- [Vue Material Dashboard](https://github.com/creativetimofficial/vue-material-dashboard-2)
- [AdminLTE Vue](https://github.com/admin-lte-io/AdminLTE)

### **Documentación:**
- [CoreUI Vue](https://coreui.io/vue/docs/)
- [Vuetify](https://vuetifyjs.com/)
- [Element Plus](https://element-plus.org/)

---

## 🎨 Siguiente Paso Recomendado

**Opción 1: Instalar CoreUI** (Más rápido, componentes listos)
```bash
npm install @coreui/vue @coreui/coreui @coreui/icons @coreui/icons-vue
```

**Opción 2: Continuar con estructura propia** (Más control, personalizado)
- Crear los layouts manualmente
- Usar el sistema de variables ya creado
- Construir componentes propios

---

## 💡 Recomendación Final

Te sugiero **CoreUI** porque:
1. Es específico para dashboards administrativos
2. Componentes listos que puedes personalizar con tus variables
3. Compatible con Vue 3
4. Licencia MIT (gratis para uso comercial)
5. Documentación excelente

¿Quieres que proceda con la instalación y configuración de CoreUI, o prefieres otra opción?
