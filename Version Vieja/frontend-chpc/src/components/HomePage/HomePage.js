import axios from "axios";
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";
import CarouselBanner from "../CarouselBanner/CarouselBanner.vue";

export default {
  name: "HomePage",
  components: {
    HeaderAnth,
    CarouselBanner,
    FooterAnth,
  },
  data() {
    return {
      banners: [],
      productos: [],
      productosMostrados: [],
      searchQuery: "",
      isAuthenticated: false,
      limiteProductos: 10,
    };
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");

    try {
      // Cargar Banners
      const bannersResponse = await axios.get("http://localhost:5000/tienda/banners");
      this.banners = bannersResponse.data.data;

      // Cargar Productos
      const productosResponse = await axios.get("http://localhost:5000/tienda/productos");
      this.productos = productosResponse.data.map((producto) => ({
        ...producto,
        imagen_url:
          producto.media?.length > 0
            ? `http://localhost:5000${producto.media[0].url}`
            : "ruta-imagen-default.png",
      }));
      this.cargarMasProductos();
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }

    // Procesar la búsqueda inicial (si existe)
    const search = this.$route.query.search;
    if (search) {
      this.buscarProductos(search);
    }
  },
  methods: {
    cargarMasProductos() {
      if (this.searchQuery.trim() !== "") return;

      const siguienteBloque = this.productos.slice(
        this.productosMostrados.length,
        this.productosMostrados.length + this.limiteProductos
      );

      this.productosMostrados = [...this.productosMostrados, ...siguienteBloque];
    },
    verDetalle(id) {
      this.$router.push({ name: "ProductoDetalle", params: { id } });
    },
    buscarProductos(query) {
      this.searchQuery = query.trim();
      if (this.searchQuery !== "") {
        this.productosMostrados = this.productos.filter(
          (producto) =>
            producto.nombre_producto
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            producto.descripcion
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.productosMostrados = this.productos.slice(0, this.limiteProductos);
      }
    },
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
    redirigirLogin() {
      this.$router.push("/login");
    },
  },
};