import axios from "axios";
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";

export default {
  name: "ProductosPorMarca",
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      productos: [],
      nombreMarca: "",
      isAuthenticated: false,
    };
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
    const marcaId = this.$route.params.id;

    try {
      // Obtener productos de la marca
      const response = await axios.get(`http://localhost:5000/tienda/productos/marca/${marcaId}`);
      this.productos = response.data.map((producto) => ({
        ...producto,
        imagen_url: producto.media.length
          ? `http://localhost:5000${producto.media[0].url}`
          : "http://localhost:5000/static/images/default.png",
      }));

      // Obtener información de la marca
      const marcaResponse = await axios.get(`http://localhost:5000/marcas/${marcaId}`);
      this.nombreMarca = marcaResponse.data.nombre_marca;
    } catch (error) {
      console.error("Error al cargar los productos de la marca:", error);
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
    verDetalle(id) {
      this.$router.push({ name: "ProductoDetalle", params: { id } });
    },
  },
};