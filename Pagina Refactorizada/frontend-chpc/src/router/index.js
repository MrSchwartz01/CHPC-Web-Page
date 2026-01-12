import { createRouter, createWebHistory } from 'vue-router';
import SesionUsuario from '../components/SesionUsuario/SesionUsuario.vue';
import RegistroUsuario from '../components/RegistroUsuario/RegistroUsuario.vue';
import Home from '../components/HomePage/HomePage.vue';
import ProductoDetalle from '../components/ProductoDetalle/ProductoDetalle.vue';
import ListaMarcas from '../components/ListaMarcas/ListaMarcas.vue';
import CarouselBanner from '../components/CarouselBanner/CarouselBanner.vue';
import Dashboard from '../components/Dashboard/DashboardMain.vue';
import AdminPanel from '../components/AdminPanel/AdminPanel.vue';
import NotificationsPanel from '../components/NotificationsPanel/NotificationsPanel.vue';
import PanelVendedores from '../components/PanelVendedores/PanelVendedores.vue';

import RedesSociales from '../components/RedesSociales/RedesSociales.vue';
import ServicioTecnico from '../components/ServicioTecnico/ServicioTecnico.vue';
import ProductosPorMarca from '../components/ProductosPorMarca/ProductosPorMarca.vue';
import CategoriasProductos from '../components/CategoriasProductos/CategoriasProductos.vue';
import ProductosPorCategoria from '../components/ProductosPorCategoria/ProductosPorCategoria.vue';
import CarritoCompras from '../components/CarritoCompras/CarritoCompras.vue';
import Promociones from '../components/Promociones/Promociones.vue';
import CreateProduct from '../components/Admin/CreateProduct.vue';
import TodosLosProductos from '../components/TodosLosProductos/TodosLosProductos.vue';
import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario.vue';
import OlvidePassword from '../components/OlvidePassword.vue';
import RestablecerPassword from '../components/RestablecerPassword.vue';
import EncuentranosPage from '../components/EncuentranosPage/EncuentranosPage.vue';
import MisionVision from '../components/MisionVision/MisionVision.vue';


const routes = [
  { path: '/', redirect: '/home' },
  { 
    path: '/login', 
    component: SesionUsuario,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/registro', 
    component: RegistroUsuario,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/olvide-password', 
    component: OlvidePassword,
    name: 'OlvidePassword',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/restablecer-password', 
    component: RestablecerPassword,
    name: 'RestablecerPassword',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next('/home');
      } else {
        next();
      }
    }
  },
  { 
    path: '/home', 
    component: Home, 
    name: 'HomePage' // Se añade el nombre a la ruta
  },
  { 
    path: '/producto/:id', 
    component: ProductoDetalle, 
    name: 'ProductoDetalle' 
  },

  { 
    path: '/marcas', 
    component: ListaMarcas, // Usar el nuevo nombre del componente
    name: 'ListaMarcas' // Cambiar el nombre para la ruta
  },
  {
    path: '/redes-sociales', // Corregido de 'patch' a 'path'
    component: RedesSociales,
    name: 'RedesSociales'
  },
  {
    path : '/servicio-tecnico',
    component: ServicioTecnico,
    name: 'ServicioTecnico'
  },
  {
    path: '/carousel-banner',
    component: CarouselBanner,
    name: 'CarouselBanner'  
  },
  {
    path: "/productos/marca/:id",
    name: "ProductosPorMarca",
    component: ProductosPorMarca,
  },
  {
    path: "/categorias",
    name: "CategoriasProductos",
    component: CategoriasProductos,
  },
  {
    path: "/productos/categoria/:categoria",
    name: "ProductosPorCategoria",
    component: ProductosPorCategoria,
  },
  {
    path: "/productos",
    name: "TodosLosProductos",
    component: TodosLosProductos,
  },
  {
    path: "/carrito",
    name: "CarritoCompras",
    component: CarritoCompras,
  },
  {
    path: "/promociones",
    name: "Promociones",
    component: Promociones,
  },
  {
    path: "/mision-vision",
    name: "MisionVision",
    component: MisionVision,
  },
  {
    path: '/perfil',
    name: 'PerfilUsuario',
    component: PerfilUsuario,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      if (isAuthenticated) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/admin/crear-producto',
    name: 'CreateProduct',
    component: CreateProduct,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('user_rol');
      if (token && (role === 'administrador' || role === 'vendedor')) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('access_token');
      const userRol = localStorage.getItem('user_rol');
      
      if (!isAuthenticated) {
        next('/login');
      } else if (userRol !== 'administrador') {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/encuentranos',
    name: 'EncuentranosPage',
    component: EncuentranosPage
  },
  {
    path: '/admin/panel',
    name: 'AdminPanel',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('user_rol');
      if (token && (role === 'administrador' || role === 'vendedor')) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/admin/notifications',
    name: 'NotificationsPanel',
    component: NotificationsPanel,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('user_rol');
      if (token && (role === 'administrador' || role === 'vendedor')) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/panel-vendedores',
    name: 'PanelVendedores',
    component: PanelVendedores,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('user_rol');
      if (token && (role === 'administrador' || role === 'vendedor')) {
        next();
      } else {
        next('/login');
      }
    }
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
