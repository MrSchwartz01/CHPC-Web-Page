import axios from "axios";
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
      producto: {
        media: [], // Lista de medios del producto (imágenes y videos)
        categoria: {}, // Información de la categoría del producto
        marca: {}, // Información de la marca del producto
      },
      errorMessage: "",
      isLoading: true,
      isAuthenticated: false,
      imagenSeleccionada: 0, // Índice del medio seleccionado
      searchQuery: "",
    };
  },
  methods: {
    async cargarProducto() {
      if (!this.isAuthenticated) {
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      const productoId = this.$route.params.id;
      try {
        // Obtener los datos del producto
        const response = await axios.get(
          `http://localhost:5000/tienda/productos/${productoId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );
        this.producto = response.data;

        // Validar que todos los medios tengan el campo `tipo_media`
        this.producto.media = this.producto.media.map((media) => ({
          ...media,
          tipo_media: media.tipo_media || "imagen", // Predeterminar como "imagen" si no está definido
        }));

        // Llamar a los endpoints de categoría y marca si existen
        if (this.producto.categoria_id) {
          const categoriaResponse = await axios.get(
            `http://localhost:5000/tienda/categorias/${this.producto.categoria_id}`
          );
          this.producto.categoria = categoriaResponse.data;
        }

        if (this.producto.marca_id) {
          const marcaResponse = await axios.get(
            `http://localhost:5000/tienda/marcas/${this.producto.marca_id}`
          );
          this.producto.marca = marcaResponse.data;
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Hubo un problema al cargar el producto.";
      } finally {
        this.isLoading = false;
      }
    },
    buscarProductos(query) {
      this.searchQuery = query; // Actualiza el valor local del query
      if (query.trim() !== "") {
        // Redirige al HomePage con el término de búsqueda como parámetro de consulta
        this.$router.push({ name: "HomePage", query: { search: query } });
      }
    },
    cambiarImagenPrincipal(index) {
      // Cambiar el medio seleccionado (imagen o video)
      this.imagenSeleccionada = index;
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
    getFullImageUrl(relativeUrl) {
      return `http://localhost:5000${relativeUrl}`;
    },
    cerrarSesion() {
      // Elimina el token y actualiza el estado de autenticación
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.push("/login"); // Redirige al usuario al login
    },
    redirigirLogin() {
      this.$router.push("/login");
    },
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");

    if (this.isAuthenticated) {
      await this.cargarProducto();
    }
  },
};