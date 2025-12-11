import axios from 'axios';
import HeaderAnth from "../HeaderAnth/HeaderAnth.vue";


export default {
  name: 'RegistroUsuario',
  components: {
    HeaderAnth,
  },
  data() {
    return {
      nombre_usuario: '',
      email: '',
      telefono: '',
      direccion: '',
      contraseña: '',
      errors: {},
      error: '',
      success: '',
      passwordVisible: false,
    };
  },
  methods: {
    async register() {
      this.validateFields();
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/tienda/auth/registro', {
          nombre_usuario: this.nombre_usuario,
          email: this.email,
          telefono: this.telefono,
          direccion: this.direccion,
          contraseña: this.contraseña,
        });
        this.success = response.data.mensaje;
        this.clearForm();
      } catch (err) {
        this.error = err.response?.data?.mensaje || 'Error en el registro. Intenta de nuevo.';
      }
    },
    validateFields() {
      this.errors = {};
      if (this.nombre_usuario.length < 3 || this.nombre_usuario.length > 80) {
        this.errors.nombre_usuario = 'El nombre de usuario debe tener entre 3 y 80 caracteres.';
      }
      if (!this.email.includes('@')) {
        this.errors.email = 'El correo electrónico debe tener un formato válido.';
      }
      if (this.telefono && this.telefono.length > 20) {
        this.errors.telefono = 'El teléfono debe tener como máximo 20 caracteres.';
      }
      if (this.direccion && this.direccion.length > 255) {
        this.errors.direccion = 'La dirección debe tener como máximo 255 caracteres.';
      }
      if (!this.contraseña.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
        this.errors.contraseña = 'La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial.';
      }
    },
    clearError(field) {
      delete this.errors[field];
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    clearForm() {
      this.nombre_usuario = '';
      this.email = '';
      this.telefono = '';
      this.direccion = '';
      this.contraseña = '';
      this.errors = {};
    },
  },
};