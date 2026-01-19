import { createRouter, createWebHistory } from 'vue-router';
import PanelTecnicosPage from '@/components/PanelTecnicos/PanelTecnicosPage.vue';
import PanelVendedores from '@/components/PanelVendedores/PanelVendedores.vue';

const routes = [
  // ... tus otras rutas (Home, Login, etc.)
  
  {
    path: '/panel-tecnicos',
    name: 'PanelTecnicos',
    component: PanelTecnicosPage,
    meta: { requiresAuth: true, role: 'tecnico' } // Solo técnicos
  },
  {
    path: '/panel-vendedores',
    name: 'PanelVendedores',
    component: PanelVendedores,
    meta: { requiresAuth: true, role: 'vendedor' } // Solo vendedores
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// GUARDIA DE NAVEGACIÓN (El "Portero" de tu app)
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_rol');

  // 1. Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Si no está logueado, al login
      return next('/login');
    }

    // 2. Verificar el rol (El administrador tiene pase libre a todo)
    if (userRole === 'administrador') {
      return next();
    }

    if (to.meta.role && to.meta.role !== userRole) {
      // Si el rol no coincide (ej: un vendedor intentando entrar a taller)
      alert('No tienes permisos para acceder a esta sección');
      return next('/home');
    }
  }

  next(); // Si todo está bien, adelante
});

export default router;