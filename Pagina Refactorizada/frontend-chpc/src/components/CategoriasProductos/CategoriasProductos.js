import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";

export default {
  name: "CategoriasProductos",
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      searchQuery: "",
      isAuthenticated: false,
      categorias: [
        {
          id: 1,
          nombre: "Laptops",
          slug: "laptops",
          icono: "💻",
          cantidad: 4,
        },
        {
          id: 2,
          nombre: "Componentes",
          slug: "componentes",
          icono: "🔧",
          cantidad: 4,
        },
        {
          id: 3,
          nombre: "Periféricos",
          slug: "perifericos",
          icono: "⌨️",
          cantidad: 4,
        },
        {
          id: 4,
          nombre: "Almacenamiento",
          slug: "almacenamiento",
          icono: "💾",
          cantidad: 4,
        },
        {
          id: 5,
          nombre: "Redes",
          slug: "redes",
          icono: "🌐",
          cantidad: 4,
        },
        {
          id: 6,
          nombre: "Audio",
          slug: "audio",
          icono: "🎧",
          cantidad: 4,
        },
      ],
      topProductos: [
        {
          id: "top-1",
          ranking: 1,
          nombre: "MacBook Pro 16\" M3",
          marca: "Apple",
          precio: "2499.99",
          imagen_url: "/Productos/placeholder-product.png",
        },
        {
          id: "top-2",
          ranking: 2,
          nombre: "Dell XPS 15",
          marca: "Dell",
          precio: "1899.99",
          imagen_url: "/Productos/placeholder-product.png",
        },
        {
          id: "top-3",
          ranking: 3,
          nombre: "Logitech MX Master 3S",
          marca: "Logitech",
          precio: "99.99",
          imagen_url: "/Productos/placeholder-product.png",
        },
      ],
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
    buscarProductos(query) {
      this.searchQuery = query;
      // Implementar lógica de búsqueda
    },
    irACategoria(slug) {
      this.$router.push({ name: "ProductosPorCategoria", params: { categoria: slug } });
    },
    verDetalle(id) {
      this.$router.push({ name: "ProductoDetalle", params: { id } });
    },
  },
};
