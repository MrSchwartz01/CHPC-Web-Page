import axios from 'axios';

export default {
  name: 'PanelTecnicosPage',
  data() {
    return {
      ordenes: [],
      filtroEstado: '',
      cargando: false,
    };
  },
  computed: {
    ordenesFiltradas() {
      return this.filtroEstado 
        ? this.ordenes.filter(o => o.estado === this.filtroEstado)
        : this.ordenes;
    },
    estadisticas() {
      return {
        espera: this.ordenes.filter(o => o.estado === 'EN_ESPERA').length,
        revision: this.ordenes.filter(o => o.estado === 'EN_REVISION').length,
        entregado: this.ordenes.filter(o => o.estado === 'ENTREGADO').length,
      };
    }
  },
  methods: {
    async cargarOrdenes() {
      this.cargando = true;
      try {
        const res = await axios.get('http://localhost:5000/api/tecnico/ordenes');
        this.ordenes = res.data;
      } catch (e) {
        console.error("Error cargando taller", e);
      } finally {
        this.cargando = false;
      }
    },
    async cambiarEstado(id, nuevoEstado) {
      try {
        await axios.patch(`http://localhost:5000/api/tecnico/ordenes/${id}`, { estado: nuevoEstado });
        this.cargarOrdenes();
      } catch (e) {
        alert("Error al actualizar estado");
      }
    }
  },
  mounted() {
    this.cargarOrdenes();
  }
}