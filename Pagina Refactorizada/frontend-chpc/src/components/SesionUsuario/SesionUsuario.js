import axios from 'axios';
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";


export default {
  name: "SesionUsuario",
  components: {
    HeaderAnth,
  },
  data() {
    return {
      nombre_usuario: '',
      contraseña: '',
      errors: {}, // Objeto para almacenar errores específicos
      error: '', // Error general
      passwordVisible: false,
    };
  },
  methods: {
    async login() {
      // Validar campos antes de enviar la solicitud
      this.validateFields();
      if (Object.keys(this.errors).length > 0) {
        return; // Detener si hay errores de validación
      }
      try {
        const response = await axios.post('http://localhost:5000/tienda/auth/login', {
          nombre_usuario: this.nombre_usuario,
          contraseña: this.contraseña,
        });
        localStorage.setItem('access_token', response.data.access_token); // Guarda el token en localStorage
        this.$router.replace('/home'); // Usa replace en lugar de push
      } catch (err) {
        this.error = err.response?.data?.mensaje || "Credenciales inválidas. Intenta de nuevo.";
      }
    },
    validateFields() {
      this.errors = {}; // Limpiar errores previos

      // Validación del nombre de usuario
      if (!this.nombre_usuario.trim()) {
        this.errors.nombre_usuario = "El nombre de usuario es obligatorio.";
      } else if (this.nombre_usuario.trim().length < 3 || this.nombre_usuario.trim().length > 80) {
        this.errors.nombre_usuario =
          "El nombre de usuario debe tener entre 3 y 80 caracteres.";
      }

      // Validación de la contraseña
      if (!this.contraseña.trim()) {
        this.errors.contraseña = "La contraseña es obligatoria.";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(this.contraseña)) {
        this.errors.contraseña =
          "La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial.";
      }
    },
    clearError(field) {
      // Elimina el error asociado a un campo específico
      delete this.errors[field];
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    goToRegister() {
      this.$router.push('/registro');
    },
  },
};