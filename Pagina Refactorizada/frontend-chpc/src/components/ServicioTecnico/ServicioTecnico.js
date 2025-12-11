import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";
import FooterAnth from "../FooterAnth/FooterAnth.vue";
  
  export default {
    name: "ServicioTecnico",
    components: {
      HeaderAnth,
        FooterAnth,

    },
    data() {
      return {
        isAuthenticated: false,
        isModalVisible: false,
        modalImage: "",
      };
    },
    methods: {
      showImageModal(imageUrl) {
        console.log("Image URL:", imageUrl); // Log para depuración
        this.modalImage = imageUrl;
        this.isModalVisible = true;
      },
      hideImageModal() {
        this.isModalVisible = false;
        this.modalImage = "";
      },
    },
    async created() {
      this.isAuthenticated = !!localStorage.getItem("access_token");
    },
  };