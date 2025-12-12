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
      marcas: [
        {
          id: 1,
          nombre_marca: "Apple",
          imagen_url: "/Marcas/apple.png",
        },
        {
          id: 2,
          nombre_marca: "Samsung",
          imagen_url: "/Marcas/samsung.png",
        },
        {
          id: 3,
          nombre_marca: "HP",
          imagen_url: "/Marcas/hp.png",
        },
        {
          id: 4,
          nombre_marca: "Dell",
          imagen_url: "/Marcas/dell.png",
        },
        {
          id: 5,
          nombre_marca: "Lenovo",
          imagen_url: "/Marcas/lenovo.png",
        },
        {
          id: 6,
          nombre_marca: "Asus",
          imagen_url: "/Marcas/asus.png",
        },
        {
          id: 7,
          nombre_marca: "Acer",
          imagen_url: "/Marcas/acer.png",
        },
        {
          id: 8,
          nombre_marca: "Microsoft",
          imagen_url: "/Marcas/microsoft.png",
        },
        {
          id: 9,
          nombre_marca: "Logitech",
          imagen_url: "/Marcas/logitech.png",
        },
        {
          id: 10,
          nombre_marca: "Canon",
          imagen_url: "/Marcas/canon.png",
        },
        {
          id: 11,
          nombre_marca: "Epson",
          imagen_url: "/Marcas/epson.png",
        },
        {
          id: 12,
          nombre_marca: "Sony",
          imagen_url: "/Marcas/sony.png",
        },
        {
          id: 13,
          nombre_marca: "Corsair",
          imagen_url: "/Marcas/corsair.png",
        },
        {
          id: 14,
          nombre_marca: "Gigabyte",
          imagen_url: "/Marcas/gigabyte.png",
        },
        {
          id: 15,
          nombre_marca: "Hikvision",
          imagen_url: "/Marcas/hikvision.jpg",
        },
        {
          id: 16,
          nombre_marca: "Mercusys",
          imagen_url: "/Marcas/mercusys.png",
        },
        {
          id: 17,
          nombre_marca: "NVIDIA",
          imagen_url: "/Marcas/nvidia.png",
        },
        {
          id: 18,
          nombre_marca: "TP-Link",
          imagen_url: "/Marcas/tplink.png",
        },
      ],
      isAuthenticated: false,
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
    filtrarPorMarca(marcaId) {
      this.$router.push({ name: "ProductosPorMarca", params: { id: marcaId } });
    },
  },
};