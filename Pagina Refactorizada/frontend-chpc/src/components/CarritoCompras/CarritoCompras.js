import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";

export default {
  name: "CarritoCompras",
  components: {
    HeaderAnth,
    FooterAnth,
  },
  data() {
    return {
      searchQuery: "",
      isAuthenticated: false,
      productosCarrito: [],
      tasaIVA: 0.15,
      costoEnvio: 5.00,
    };
  },
  computed: {
    subtotal() {
      return this.productosCarrito.reduce((total, item) => {
        return total + (parseFloat(item.precio) * item.cantidad);
      }, 0);
    },
    iva() {
      return this.subtotal * this.tasaIVA;
    },
    envio() {
      // Envío gratis si el subtotal es mayor a $100
      return this.subtotal > 100 ? 0 : this.costoEnvio;
    },
    total() {
      return this.subtotal + this.iva + this.envio;
    },
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem("access_token");
    this.cargarCarrito();
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("access_token");
      this.isAuthenticated = false;
      this.$router.replace("/login");
    },
    buscarProductos(query) {
      this.searchQuery = query;
    },
    cargarCarrito() {
      // Cargar carrito desde localStorage
      const carritoGuardado = localStorage.getItem("carrito");
      if (carritoGuardado) {
        this.productosCarrito = JSON.parse(carritoGuardado);
      } else {
        // Productos de ejemplo para demostración
        this.productosCarrito = [
          {
            id: "1",
            nombre: "MacBook Pro 16\" M3",
            marca: "Apple",
            precio: "2499.99",
            cantidad: 1,
            imagen_url: "/Productos/placeholder-product.png",
          },
          {
            id: "2",
            nombre: "Dell XPS 15",
            marca: "Dell",
            precio: "1899.99",
            cantidad: 1,
            imagen_url: "/Productos/placeholder-product.png",
          },
        ];
        this.guardarCarrito();
      }
    },
    guardarCarrito() {
      localStorage.setItem("carrito", JSON.stringify(this.productosCarrito));
    },
    calcularSubtotal(item) {
      return (parseFloat(item.precio) * item.cantidad).toFixed(2);
    },
    aumentarCantidad(id) {
      const producto = this.productosCarrito.find((p) => p.id === id);
      if (producto) {
        producto.cantidad++;
        this.guardarCarrito();
      }
    },
    disminuirCantidad(id) {
      const producto = this.productosCarrito.find((p) => p.id === id);
      if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        this.guardarCarrito();
      }
    },
    eliminarProducto(id) {
      this.productosCarrito = this.productosCarrito.filter((p) => p.id !== id);
      this.guardarCarrito();
    },
    vaciarCarrito() {
      if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        this.productosCarrito = [];
        this.guardarCarrito();
      }
    },
    procederCompra() {
      if (!this.isAuthenticated) {
        alert("Debes iniciar sesión para continuar con la compra");
        this.$router.push("/login");
      } else {
        alert(`Proceder al pago por un total de $${this.total.toFixed(2)}`);
        // Aquí iría la lógica para proceder al pago
      }
    },
    irAInicio() {
      this.$router.push("/home");
    },
  },
};
