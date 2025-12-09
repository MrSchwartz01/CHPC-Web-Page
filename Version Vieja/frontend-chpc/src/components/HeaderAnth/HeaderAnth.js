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
      };
    },
    mounted() {
      // Iniciar la animación tras montar el componente
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
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
    },
  };