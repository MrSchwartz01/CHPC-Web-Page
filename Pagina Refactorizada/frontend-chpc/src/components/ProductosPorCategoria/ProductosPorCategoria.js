import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";
import ContactoAsesor from '../ContactoAsesor/ContactoAsesor.vue';
import axios from "axios";
import { API_BASE_URL } from '@/config/api';

export default {
  name: "ProductosPorCategoria",
  components: {
    HeaderAnth,
    FooterAnth,
    ContactoAsesor,
  },
  data() {
    return {
      searchQuery: "",
      isAuthenticated: false,
      nombreCategoria: "",
      marcaSeleccionada: null,
      productos: [],
      categoriasInfo: {
        laptops: "Laptops",
        desktops: "Computadoras de Escritorio",
        monitores: "Monitores",
        teclados: "Teclados",
        mouses: "Mouses",
        impresoras: "Impresoras",
        camaras: "Cámaras de Seguridad",
        tablets: "Tablets",
        accesorios: "Accesorios",
        redes: "Redes",
        componentes: "Componentes",
        perifericos: "Perifericos",
        almacenamiento: "Almacenamiento",
        audio: "Audio",
      },
    };
  },
  computed: {
    productosFiltrados() {
      if (this.marcaSeleccionada === null) {
        return this.productos;
      }
      return this.productos.filter(
        (p) => p.marca?.toLowerCase() === this.marcaSeleccionada.toLowerCase()
      );
    },
    marcasDisponibles() {
      // Extraer marcas únicas de los productos cargados
      const marcas = [...new Set(this.productos.map(p => p.marca).filter(Boolean))];
      return marcas.map(marca => ({ nombre: marca }));
    },
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
    const categoriaSlug = this.$route.params.categoria;
    this.nombreCategoria =
      this.categoriasInfo[categoriaSlug] || "Categoría Desconocida";
    this.cargarProductos(categoriaSlug);
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
    async cargarProductos(categoria) {
      try {
        // Capitalizar la primera letra de la categoría para que coincida con la base de datos
        const categoriaCapitalizada = this.categoriasInfo[categoria];
        
        const response = await axios.get(
          `${API_BASE_URL}/tienda/productos?categoria=${categoriaCapitalizada}`
        );
        
        this.productos = response.data.map(producto => ({
          ...producto,
          imagen_url: producto.imagen_url || "/Productos/placeholder-product.png"
        }));
        
        console.log(`Productos cargados para ${categoriaCapitalizada}:`, this.productos.length);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        this.productos = [];
      }
    },
    filtrarPorMarca(marca) {
      this.marcaSeleccionada = marca;
    },
    verDetalle(id) {
      this.$router.push({ name: "ProductoDetalle", params: { id } });
    },
    obtenerTextoStock(stock) {
      if (stock === 0) {
        return 'Sin stock';
      } else if (stock <= 5) {
        return `${stock} unidades - Quedan pocas unidades`;
      } else {
        return 'Disponible';
      }
    },
  },
};
