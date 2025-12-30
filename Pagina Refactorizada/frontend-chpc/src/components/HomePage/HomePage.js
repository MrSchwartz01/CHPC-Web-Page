import axios from "axios";
import { API_BASE_URL } from '@/config/api';
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";
import CarouselBanner from "../CarouselBanner/CarouselBanner.vue";
import HistorialProductosVistos from "../HistorialProductosVistos/HistorialProductosVistos.vue";

export default {
  name: "HomePage",
  components: {
    HeaderAnth,
    CarouselBanner,
    FooterAnth,
    HistorialProductosVistos,
  },
  data() {
    return {
      banners: [],
      productos: [],
      productosMostrados: [],
      promociones: [],
      searchQuery: "",
      isAuthenticated: false,
      limiteProductos: 10,
      selectedPriceRange: "", // '', 'low', 'mid', 'high'
      
      // Datos de categorías más visitadas (placeholder)
      categoriasMasVisitadas: [
        { id: 1, nombre: 'Laptops', icon: '💻', visitas: 1250, productos: 45 },
        { id: 2, nombre: 'Componentes', icon: '🔧', visitas: 980, productos: 120 },
        { id: 3, nombre: 'Periféricos', icon: '⌨️', visitas: 850, productos: 85 },
        { id: 4, nombre: 'Almacenamiento', icon: '💾', visitas: 720, productos: 60 },
        { id: 5, nombre: 'Redes', icon: '🌐', visitas: 650, productos: 38 },
        { id: 6, nombre: 'Audio', icon: '🎧', visitas: 540, productos: 52 },
      ],
      
      // Mapeo de categorías a marcas (para simular productos por categoría)
      categoriaMapping: {
        'Laptops': ['Dell', 'HP', 'Lenovo', 'Asus'],
        'Componentes': ['Intel', 'AMD', 'NVIDIA', 'Corsair'],
        'Periféricos': ['Logitech', 'Razer', 'HyperX', 'SteelSeries'],
        'Almacenamiento': ['Kingston', 'Samsung', 'WD', 'Seagate'],
        'Redes': ['TP-Link', 'Cisco', 'Ubiquiti', 'Netgear'],
        'Audio': ['Sony', 'JBL', 'Bose', 'Audio-Technica'],
      },
    };
  },
  async created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");

    try {
      // Cargar Banners desde la carpeta pública
      this.banners = [
        { id: 1, titulo: "Banner 1", imagen_url: "/Banners/banner1.webp" },
        { id: 2, titulo: "Banner 2", imagen_url: "/Banners/banner2.avif" },
      ];

      // Cargar Productos
      const productosResponse = await axios.get(`${API_BASE_URL}/tienda/productos`);
      this.productos = productosResponse.data.map((producto) => ({
        ...producto,
        imagen_url:
          producto.media?.length > 0
            ? `http://localhost:5000${producto.media[0].url}`
            : producto.imagen_url || "ruta-imagen-default.png",
      }));
      
      // Cargar Promociones Activas
      const promocionesResponse = await axios.get(`${API_BASE_URL}/promociones/activas`);
      this.promociones = promocionesResponse.data;
      
      // Combinar promociones con productos
      this.aplicarPromocionesAProductos();
      
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
    aplicarPromocionesAProductos() {
      // Agregar información de promoción a cada producto
      this.productos = this.productos.map(producto => {
        const promocion = this.promociones.find(p => p.producto_id === producto.id);
        if (promocion) {
          const precioOriginal = producto.precio;
          const precioConDescuento = precioOriginal - (precioOriginal * promocion.porcentaje_descuento / 100);
          return {
            ...producto,
            tienePromocion: true,
            promocion: {
              porcentaje: promocion.porcentaje_descuento,
              precioOriginal: precioOriginal,
              precioConDescuento: precioConDescuento.toFixed(2),
              fechaFin: promocion.fecha_fin
            }
          };
        }
        return {
          ...producto,
          tienePromocion: false
        };
      });
    },
    aplicarFiltros() {
      const query = this.searchQuery.trim().toLowerCase();

      let lista = [...this.productos];

      // Filtrado por rango de precio
      if (this.selectedPriceRange) {
        lista = lista.filter((producto) => {
          const precio = Number(producto.precio ?? 0);
          if (this.selectedPriceRange === "low") {
            return precio < 100;
          }
          if (this.selectedPriceRange === "mid") {
            return precio >= 101 && precio <= 399;
          }
          if (this.selectedPriceRange === "high") {
            return precio >= 400;
          }
          return true;
        });
      }

      // Filtrado por texto
      if (query !== "") {
        lista = lista.filter(
          (producto) =>
            producto.nombre_producto
              .toLowerCase()
              .includes(query) ||
            producto.descripcion.toLowerCase().includes(query)
        );
      }

      if (query !== "" || this.selectedPriceRange) {
        // Cuando hay filtros activos, mostramos toda la lista filtrada
        this.productosMostrados = lista;
      } else {
        // Sin filtros, aplicamos paginación básica
        this.productosMostrados = lista.slice(0, this.limiteProductos);
      }
    },
    cargarMasProductos() {
      if (this.searchQuery.trim() !== "" || this.selectedPriceRange) return;

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
      this.aplicarFiltros();
    },
    cambiarRangoPrecio(rango) {
      this.selectedPriceRange = rango;
      this.aplicarFiltros();
    },
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
    redirigirLogin() {
      this.$router.push("/login");
    },
    filtrarPorCategoria(nombreCategoria) {
      const marcas = this.categoriaMapping[nombreCategoria];
      if (!marcas) return;
      
      this.productosMostrados = this.productos.filter(producto => 
        marcas.some(marca => producto.marca?.toLowerCase().includes(marca.toLowerCase()))
      );
      
      window.scrollTo({ top: 600, behavior: 'smooth' });
    },
    getProductosPorCategoria(nombreCategoria) {
      const marcas = this.categoriaMapping[nombreCategoria];
      if (!marcas) return [];
      
      let productosFiltrados = this.productos.filter(producto => 
        marcas.some(marca => producto.marca?.toLowerCase().includes(marca.toLowerCase()))
      );
      
      productosFiltrados = productosFiltrados.map((producto, index) => ({
        ...producto,
        ventas: Math.floor(Math.random() * 500) + 100,
        ranking: index + 1,
      }));
      
      return productosFiltrados
        .sort((a, b) => b.ventas - a.ventas)
        .slice(0, 3);
    },
  },
};
