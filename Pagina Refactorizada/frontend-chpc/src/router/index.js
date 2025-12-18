import { createRouter, createWebHistory } from 'vue-router';
import SesionUsuario from '../components/SesionUsuario/SesionUsuario.vue';
import RegistroUsuario from '../components/RegistroUsuario/RegistroUsuario.vue';
import Home from '../components/HomePage/HomePage.vue';
import ProductoDetalle from '../components/ProductoDetalle/ProductoDetalle.vue';
import ListaMarcas from '../components/ListaMarcas/ListaMarcas.vue';
import CarouselBanner from '../components/CarouselBanner/CarouselBanner.vue';

import RedesSociales from '../components/RedesSociales/RedesSociales.vue';
import ServicioTecnico from '../components/ServicioTecnico/ServicioTecnico.vue';
import ProductosPorMarca from '../components/ProductosPorMarca/ProductosPorMarca.vue';
import CategoriasProductos from '../components/CategoriasProductos/CategoriasProductos.vue';
import ProductosPorCategoria from '../components/ProductosPorCategoria/ProductosPorCategoria.vue';
import CarritoCompras from '../components/CarritoCompras/CarritoCompras.vue';
import Promociones from '../components/Promociones/Promociones.vue';


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
    path: "/carrito",
    name: "CarritoCompras",
    component: CarritoCompras,
  },
  {
    path: "/promociones",
    name: "Promociones",
    component: Promociones,
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
