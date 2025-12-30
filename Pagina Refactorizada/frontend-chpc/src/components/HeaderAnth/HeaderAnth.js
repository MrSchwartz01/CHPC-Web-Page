import axios from "axios";
import { API_BASE_URL } from '@/config/api';

export default {
    name: "HeaderAnth",
    props: {
      searchQuery: {
        type: String,
        required: true,
      },
      isAuthenticated: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        // Aseguramos que siempre sea un string para evitar errores de trim()
        localSearchQuery: this.searchQuery ?? "",
        isVisible: false, // Control de visibilidad para animación
        showProductsMenu: false, // Control del menú desplegable de productos
        cantidadCarrito: 0, // Cantidad de productos en el carrito
        sugerencias: [],
        mostrandoSugerencias: false,
        cargandoSugerencias: false,
        _sugerenciasTimeout: null,
        isAdmin: false,
        isVendedor: false,
      };
    },
    mounted() {
      // Iniciar la animación tras montar el componente
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
      // Cargar cantidad del carrito
      this.actualizarCantidadCarrito();
      // Verificar rol del usuario
      this.checkUserRole();
    },
    //metodos llamados para navegacion y busqueda
  methods: {
      buscarProductos() {
        const query = (this.localSearchQuery ?? "").toString().trim();
        this.$emit('buscar', query);
      },
      onInput() {
        this.buscarProductos();
        this.programarCargaSugerencias();
      },
      programarCargaSugerencias() {
        if (this._sugerenciasTimeout) {
          clearTimeout(this._sugerenciasTimeout);
        }
        const query = (this.localSearchQuery ?? "").toString().trim();
        if (query.length < 2) {
          this.sugerencias = [];
          this.mostrandoSugerencias = false;
          return;
        }

        this._sugerenciasTimeout = setTimeout(() => {
          this.cargarSugerencias(query);
        }, 250);
      },
      async cargarSugerencias(query) {
        this.cargandoSugerencias = true;
        try {
          const response = await axios.get(
            `${API_BASE_URL}/tienda/productos`,
            {
              params: { search: query },
            },
          );

          this.sugerencias = Array.isArray(response.data)
            ? response.data.slice(0, 8)
            : [];
          this.mostrandoSugerencias = this.sugerencias.length > 0;
        } catch (error) {
          console.error("Error al obtener sugerencias:", error);
          this.sugerencias = [];
          this.mostrandoSugerencias = false;
        } finally {
          this.cargandoSugerencias = false;
        }
      },
      seleccionarSugerencia(producto) {
        const nombre = producto.nombre_producto || producto.nombre || "";
        this.localSearchQuery = nombre;
        this.mostrandoSugerencias = false;
        this.sugerencias = [];
        this.$emit("buscar", nombre.trim());
        if (producto.id) {
          this.$router.push({ name: "ProductoDetalle", params: { id: producto.id } });
        }
      },
      cerrarSugerencias() {
        // pequeño retardo para permitir click en sugerencia antes de ocultar
        setTimeout(() => {
          this.mostrandoSugerencias = false;
        }, 150);
      },
      cerrarSesion() {
        this.$emit("cerrar-sesion");
      },
      goToLogin() {
        this.$router.push("/login");
      },
      goToRegister() {
        this.$router.push("/registro");
      },
      goToCategorias() {
        this.$router.push("/categorias");
      },
      goToCarrito() {
        this.$router.push("/carrito");
      },
      goToPerfil() {
        this.$router.push("/perfil");
      },
      goToAdminPanel() {
        this.$router.push("/admin/panel");
      },
      checkUserRole() {
        const role = localStorage.getItem('user_rol');
        this.isAdmin = role === 'administrador';
        this.isVendedor = role === 'vendedor';
      },
      actualizarCantidadCarrito() {
        const carrito = localStorage.getItem("carrito");
        if (carrito) {
          const productos = JSON.parse(carrito);
          this.cantidadCarrito = productos.reduce((total, item) => total + item.cantidad, 0);
        }
      },
    },
  };