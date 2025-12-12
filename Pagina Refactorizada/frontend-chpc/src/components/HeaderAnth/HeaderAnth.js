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
        localSearchQuery: this.searchQuery,
        isVisible: false, // Control de visibilidad para animación
        showProductsMenu: false, // Control del menú desplegable de productos
        cantidadCarrito: 0, // Cantidad de productos en el carrito
      };
    },
    mounted() {
      // Iniciar la animación tras montar el componente
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
      // Cargar cantidad del carrito
      this.actualizarCantidadCarrito();
    },
    methods: {
      buscarProductos() {
        this.$emit("buscar", this.localSearchQuery.trim());
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
      actualizarCantidadCarrito() {
        const carrito = localStorage.getItem("carrito");
        if (carrito) {
          const productos = JSON.parse(carrito);
          this.cantidadCarrito = productos.reduce((total, item) => total + item.cantidad, 0);
        }
      },
    },
  };