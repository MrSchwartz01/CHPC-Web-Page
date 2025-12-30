import HeaderAnth from '../HeaderAnth/HeaderAnth.vue';
import FooterAnth from '../FooterAnth/FooterAnth.vue';
import axios from 'axios';

export default {
  name: 'TodosLosProductos',
  components: {
    HeaderAnth,
    FooterAnth
  },
  data() {
    return {
      productos: [],
      productosFiltrados: [],
      cargando: true,
      searchQuery: '',
      isAuthenticated: false,
      
      // Filtros
      filtros: {
        marcas: [],
        colores: [],
        precioMin: null,
        precioMax: null,
        soloDisponibles: false
      },
      
      // Opciones disponibles
      marcasDisponibles: [],
      coloresDisponibles: [],
      precioMinimo: 0,
      precioMaximo: 0,
      
      // Ordenamiento
      ordenamiento: 'relevancia',
      
      // Vista
      vistaActual: 'cuadricula', // 'cuadricula' o 'lista'
      
      // Paginación
      paginaActual: 1,
      productosPorPagina: 15
    };
  },
  computed: {
    productosPaginados() {
      const inicio = (this.paginaActual - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      return this.productosFiltrados.slice(inicio, fin);
    },
    totalPaginas() {
      return Math.ceil(this.productosFiltrados.length / this.productosPorPagina);
    }
  },
  async mounted() {
    this.verificarAutenticacion();
    await this.cargarProductos();
  },
  methods: {
    verificarAutenticacion() {
      const token = localStorage.getItem('access_token');
      this.isAuthenticated = !!token;
    },
    
    async cargarProductos() {
      try {
        this.cargando = true;
        const response = await axios.get('http://localhost:5000/api/tienda/productos');
        this.productos = response.data;
        this.productosFiltrados = [...this.productos];
        
        this.extraerOpcionesFiltros();
        this.calcularRangoPrecio();
        
        this.cargando = false;
      } catch (error) {
        console.error('Error al cargar productos:', error);
        this.cargando = false;
      }
    },
    
    extraerOpcionesFiltros() {
      // Extraer marcas únicas
      const marcasSet = new Set();
      this.productos.forEach(p => {
        if (p.marca) marcasSet.add(p.marca);
      });
      this.marcasDisponibles = Array.from(marcasSet).sort();
      
      // Extraer colores únicos
      const coloresSet = new Set();
      this.productos.forEach(p => {
        if (p.color) coloresSet.add(p.color);
      });
      this.coloresDisponibles = Array.from(coloresSet).sort();
    },
    
    calcularRangoPrecio() {
      if (this.productos.length === 0) return;
      
      const precios = this.productos.map(p => parseFloat(p.precio));
      this.precioMinimo = Math.floor(Math.min(...precios));
      this.precioMaximo = Math.ceil(Math.max(...precios));
      
      if (!this.filtros.precioMin) this.filtros.precioMin = this.precioMinimo;
      if (!this.filtros.precioMax) this.filtros.precioMax = this.precioMaximo;
    },
    
    aplicarFiltros() {
      let resultado = [...this.productos];
      
      // Filtro por marca
      if (this.filtros.marcas.length > 0) {
        resultado = resultado.filter(p => 
          this.filtros.marcas.includes(p.marca)
        );
      }
      
      // Filtro por color
      if (this.filtros.colores.length > 0) {
        resultado = resultado.filter(p => 
          this.filtros.colores.includes(p.color)
        );
      }
      
      // Filtro por precio
      if (this.filtros.precioMin !== null) {
        resultado = resultado.filter(p => 
          parseFloat(p.precio) >= this.filtros.precioMin
        );
      }
      if (this.filtros.precioMax !== null) {
        resultado = resultado.filter(p => 
          parseFloat(p.precio) <= this.filtros.precioMax
        );
      }
      
      // Filtro por stock
      if (this.filtros.soloDisponibles) {
        resultado = resultado.filter(p => p.stock > 0);
      }
      
      this.productosFiltrados = resultado;
      this.paginaActual = 1; // Resetear a la primera página
      this.aplicarOrdenamiento();
    },
    
    aplicarOrdenamiento() {
      switch (this.ordenamiento) {
        case 'precio-asc':
          this.productosFiltrados.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
          break;
        case 'precio-desc':
          this.productosFiltrados.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
          break;
        case 'nombre-asc':
          this.productosFiltrados.sort((a, b) => 
            a.nombre_producto.localeCompare(b.nombre_producto)
          );
          break;
        case 'nombre-desc':
          this.productosFiltrados.sort((a, b) => 
            b.nombre_producto.localeCompare(a.nombre_producto)
          );
          break;
        default:
          // Relevancia - mantener orden original
          break;
      }
    },
    
    limpiarFiltros() {
      this.filtros = {
        marcas: [],
        colores: [],
        precioMin: this.precioMinimo,
        precioMax: this.precioMaximo,
        soloDisponibles: false
      };
      this.ordenamiento = 'relevancia';
      this.aplicarFiltros();
    },
    
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    
    verDetalle(id) {
      this.$router.push(`/producto/${id}`);
    },
    
    agregarAlCarrito(producto) {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const existente = carrito.find(item => item.id === producto.id);
      
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({
          id: producto.id,
          nombre_producto: producto.nombre_producto,
          precio: producto.precio,
          imagen_url: producto.imagen_url,
          cantidad: 1,
          stock: producto.stock
        });
      }
      
      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert('Producto agregado al carrito');
    },
    
    buscarProductos(query) {
      this.searchQuery = query;
      // Implementar búsqueda si es necesario
    },
    
    cerrarSesion() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
    
    formatearPrecio(precio) {
      return parseFloat(precio).toFixed(2);
    },
    
    truncarDescripcion(descripcion, maxLength = 100) {
      if (!descripcion) return '';
      return descripcion.length > maxLength 
        ? descripcion.substring(0, maxLength) + '...' 
        : descripcion;
    },
    
    handleImageError(event) {
      event.target.src = '/placeholder.jpg';
    }
  }
};
