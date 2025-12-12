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
          cantidad: 45,
        },
        {
          id: 2,
          nombre: "Computadoras de Escritorio",
          slug: "desktops",
          icono: "🖥️",
          cantidad: 32,
        },
        {
          id: 3,
          nombre: "Monitores",
          slug: "monitores",
          icono: "🖵",
          cantidad: 28,
        },
        {
          id: 4,
          nombre: "Teclados",
          slug: "teclados",
          icono: "⌨️",
          cantidad: 52,
        },
        {
          id: 5,
          nombre: "Mouses",
          slug: "mouses",
          icono: "🖱️",
          cantidad: 48,
        },
        {
          id: 6,
          nombre: "Impresoras",
          slug: "impresoras",
          icono: "🖨️",
          cantidad: 21,
        },
        {
          id: 7,
          nombre: "Cámaras de Seguridad",
          slug: "camaras",
          icono: "📹",
          cantidad: 18,
        },
        {
          id: 8,
          nombre: "Tablets",
          slug: "tablets",
          icono: "📱",
          cantidad: 25,
        },
        {
          id: 9,
          nombre: "Accesorios",
          slug: "accesorios",
          icono: "🎧",
          cantidad: 67,
        },
        {
          id: 10,
          nombre: "Equipos de Red",
          slug: "redes",
          icono: "🌐",
          cantidad: 15,
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
