import axios from "axios";
import { API_BASE_URL } from '@/config/api';
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";
import ContactoAsesor from '../ContactoAsesor/ContactoAsesor.vue';

export default {
  name: "ProductoDetalle",
  components: {
    HeaderAnth,
    FooterAnth,
    ContactoAsesor,
  },
  data() {
    return {
      producto: null,
      imagenes: [],
      errorMessage: "",
      isLoading: true,
      isAuthenticated: false,
      searchQuery: "",
      zoomActivo: false,
    };
  },
  computed: {
    imagenPrincipal() {
      if (this.imagenes && this.imagenes.length > 0) {
        // Buscar imagen marcada como principal
        const principal = this.imagenes.find(img => img.es_principal);
        if (principal) return principal.ruta_imagen;
        // Si no hay principal, usar la primera
        return this.imagenes[0].ruta_imagen;
      }
      return '/Productos/placeholder-product.png';
    },
    mostrarStock() {
      if (!this.producto) return '';
      if (this.producto.stock === 0) {
        return 'Sin stock';
      } else if (this.producto.stock <= 5) {
        return `${this.producto.stock} unidades - Quedan pocas unidades`;
      } else {
        return 'Disponible';
      }
    }
  },
  methods: {
    async cargarProducto() {
      this.isLoading = true;
      this.errorMessage = "";

      const productoId = this.$route.params.id;
      try {
        // Obtener los datos del producto
        const response = await axios.get(
          `${API_BASE_URL}/tienda/productos/${productoId}`
        );
        this.producto = response.data;

        // Cargar imágenes del producto
        try {
          const imagenesResponse = await axios.get(
            `${API_BASE_URL}/images/producto/${productoId}`
          );
          this.imagenes = imagenesResponse.data;
        } catch (imgError) {
          console.warn('No se pudieron cargar las imágenes:', imgError);
          this.imagenes = [];
        }

        // Registrar en historial de productos vistos (Vuex + localStorage)
        if (this.$store) {
          this.$store.dispatch('registrarProductoVisto', this.producto);
        }
      } catch (error) {
        console.error('Error al cargar producto:', error);
        this.errorMessage =
          error.response?.data?.message || "Hubo un problema al cargar el producto.";
      } finally {
        this.isLoading = false;
      }
    },
    recargarProducto() {
      this.cargarProducto();
    },
    buscarProductos(query) {
      this.searchQuery = query;
      if (query.trim() !== "") {
        this.$router.push({ name: "HomePage", query: { search: query } });
      }
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.push("/login");
    },
    redirigirLogin() {
      this.$router.push("/login");
    },
    agregarAlCarrito() {
      if (!this.producto) return;

      // Obtener carrito del localStorage
      let carrito = [];
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
      }

      // Verificar si el producto ya está en el carrito
      const productoExistente = carrito.find(p => p.id === this.producto.id);
      
      if (productoExistente) {
        // Aumentar cantidad
        productoExistente.cantidad++;
        alert('Cantidad actualizada en el carrito');
      } else {
        // Agregar nuevo producto
        carrito.push({
          id: this.producto.id,
          nombre: this.producto.nombre_producto,
          marca: this.producto.marca,
          precio: this.producto.precio,
          cantidad: 1,
          imagen_url: this.imagenPrincipal
        });
        alert('Producto agregado al carrito');
      }

      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
    },
    abrirZoom() {
      this.zoomActivo = true;
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    },
    cerrarZoom() {
      this.zoomActivo = false;
      document.body.style.overflow = ''; // Restaurar scroll
    },
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
    await this.cargarProducto();
  },
  mounted() {
    // Scroll hacia arriba al cargar el componente
    window.scrollTo(0, 0);
  },
  watch: {
    '$route.params.id': {
      immediate: false,
      handler() {
        // Scroll hacia arriba cuando cambia el producto
        window.scrollTo(0, 0);
        this.cargarProducto();
      }
    }
  }
};