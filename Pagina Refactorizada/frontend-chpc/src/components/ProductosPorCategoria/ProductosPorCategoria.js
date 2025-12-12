import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";

export default {
  name: "ProductosPorCategoria",
  components: {
    HeaderAnth,
    FooterAnth,
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
        redes: "Equipos de Red",
      },
      marcasDisponibles: [
        { id: 1, nombre: "Apple" },
        { id: 2, nombre: "Samsung" },
        { id: 3, nombre: "HP" },
        { id: 4, nombre: "Dell" },
        { id: 5, nombre: "Lenovo" },
        { id: 6, nombre: "Asus" },
        { id: 9, nombre: "Logitech" },
        { id: 10, nombre: "Canon" },
      ],
    };
  },
  computed: {
    productosFiltrados() {
      if (this.marcaSeleccionada === null) {
        return this.productos;
      }
      return this.productos.filter(
        (p) => p.marca_id === this.marcaSeleccionada
      );
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
    cargarProductos(categoria) {
      // Generar productos placeholder basados en la categoría
      this.productos = this.generarProductosPlaceholder(categoria);
    },
    generarProductosPlaceholder(categoria) {
      const productos = [];
      const marcasIds = [1, 2, 3, 4, 5, 6, 9, 10];
      const marcasNombres = {
        1: "Apple",
        2: "Samsung",
        3: "HP",
        4: "Dell",
        5: "Lenovo",
        6: "Asus",
        9: "Logitech",
        10: "Canon",
      };

      for (let i = 1; i <= 12; i++) {
        const marcaId = marcasIds[Math.floor(Math.random() * marcasIds.length)];
        productos.push({
          id: `${categoria}-${i}`,
          nombre: `${this.nombreCategoria} ${marcasNombres[marcaId]} ${i}`,
          descripcion: `Producto ${i} de ${this.nombreCategoria}. Excelente calidad y rendimiento.`,
          precio: (Math.random() * 2000 + 100).toFixed(2),
          stock: Math.floor(Math.random() * 50) + 1,
          marca: marcasNombres[marcaId],
          marca_id: marcaId,
          imagen_url: "/Productos/placeholder-product.png",
        });
      }
      return productos;
    },
    filtrarPorMarca(marcaId) {
      this.marcaSeleccionada = marcaId;
    },
    verDetalle(id) {
      this.$router.push({ name: "ProductoDetalle", params: { id } });
    },
  },
};
