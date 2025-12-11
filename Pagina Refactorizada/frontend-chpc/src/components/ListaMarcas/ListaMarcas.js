import axios from "axios";
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";

export default {
  name: "ListaMarcas",
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      marcas: [],
      isAuthenticated: false,
    };
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");

    try {
      const response = await axios.get("http://localhost:5000/tienda/marcas/");
      this.marcas = response.data.map((marca) => ({
        ...marca,
        imagen_url: marca.imagen_url
          ? `http://localhost:5000${marca.imagen_url}`
          : "http://localhost:5000/static/logosmarcas/default.png",
      }));
    } catch (error) {
      console.error("Error al cargar las marcas:", error);
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
    filtrarPorMarca(marcaId) {
      this.$router.push({ name: "ProductosPorMarca", params: { id: marcaId } });
    },
  },
};