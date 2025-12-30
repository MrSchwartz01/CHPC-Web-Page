import axios from "axios";
import { API_BASE_URL } from '@/config/api';
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";

export default {
  name: "ProductoDetalle",
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      producto: null,
      errorMessage: "",
      isLoading: true,
      isAuthenticated: false,
      searchQuery: "",
    };
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
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
    await this.cargarProducto();
  },
};