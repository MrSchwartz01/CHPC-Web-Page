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
      marcasInfo: {
        1: "Apple",
        2: "Samsung",
        3: "HP",
        4: "Dell",
        5: "Lenovo",
        6: "Asus",
        7: "Acer",
        8: "Microsoft",
        9: "Logitech",
        10: "Canon",
        11: "Epson",
        12: "Sony",
      },
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
    const marcaId = this.$route.params.id;
    
    // Obtener nombre de la marca
    this.nombreMarca = this.marcasInfo[marcaId] || "Marca Desconocida";
    
    // Generar productos placeholder para esta marca
    this.productos = this.generarProductosPlaceholder(marcaId);
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
    generarProductosPlaceholder(marcaId) {
      const productos = [];
      for (let i = 1; i <= 6; i++) {
        productos.push({
          id: `${marcaId}-${i}`,
          nombre_producto: `${this.marcasInfo[marcaId]} Producto ${i}`,
          descripcion: `Descripción del producto ${i} de ${this.marcasInfo[marcaId]}. Este es un producto placeholder de ejemplo.`,
          precio: (Math.random() * 1000 + 100).toFixed(2),
          stock: Math.floor(Math.random() * 50) + 1,
          imagen_url: "/Productos/placeholder-product.png",
        });
      }
      return productos;
    },
  },
};