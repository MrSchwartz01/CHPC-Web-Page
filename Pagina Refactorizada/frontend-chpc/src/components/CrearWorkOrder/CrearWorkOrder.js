export default {
  name: 'CrearWorkOrder',
  data() {
    return {
      formulario: {
        cliente_nombre: '',
        cliente_telefono: '',
        cliente_email: '',
        marca_equipo: '',
        modelo_equipo: '',
        numero_serie: '',
        descripcion_problema: '',
        costo_estimado: 0,
      },
      cargando: false,
      error: null,
      mensajeExito: null,
      trackingIdCreado: null,
    };
  },
  methods: {
    async crearOrden() {
      this.error = null;
      this.cargando = true;

      try {
        // Validación básica
        if (!this.formulario.cliente_nombre.trim()) {
          throw new Error('El nombre del cliente es requerido');
        }
        if (!this.formulario.cliente_telefono.trim()) {
          throw new Error('El teléfono del cliente es requerido');
        }
        if (!this.formulario.marca_equipo.trim()) {
          throw new Error('La marca del equipo es requerida');
        }
        if (!this.formulario.modelo_equipo.trim()) {
          throw new Error('El modelo del equipo es requerido');
        }
        if (!this.formulario.descripcion_problema.trim()) {
          throw new Error('La descripción del problema es requerida');
        }
        if (this.formulario.costo_estimado < 0) {
          throw new Error('El costo estimado no puede ser negativo');
        }

        // Preparar datos para enviar (corregir mapeo de campos)
        const datos = {
          cliente_nombre: this.formulario.cliente_nombre.trim(),
          cliente_telefono: this.formulario.cliente_telefono.trim(),
          cliente_email: this.formulario.cliente_email.trim() || null,
          marca_equipo: this.formulario.marca_equipo.trim(),
          modelo_equipo: this.formulario.modelo_equipo.trim(),
          numero_serie: this.formulario.numero_serie.trim() || null,
          descripcion_problema: this.formulario.descripcion_problema.trim(),
          costo_estimado: parseFloat(this.formulario.costo_estimado) || 0,
          estado: 'EN_ESPERA' // Estado inicial por defecto
        };

        // Obtener token de autenticación
        const token = localStorage.getItem('access_token');
        if (!token) {
          this.$router.push('/login');
          throw new Error('No hay sesión activa. Por favor inicie sesión.');
        }

        // Obtener URL base de la API (usar la misma configuración que el panel)
        const apiUrl = process.env.VUE_APP_API_URL || 'http://192.168.2.117:5000/api';
        const endpoint = `${apiUrl}/work-orders`;

        console.log('Enviando orden de trabajo a:', endpoint);
        console.log('Datos:', datos);

        // Realizar petición al backend
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(datos),
        });

        console.log('Respuesta del servidor:', response.status, response.statusText);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error del servidor:', errorData);
          
          // Manejar errores específicos
          if (response.status === 401) {
            this.$router.push('/login');
            throw new Error('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
          }
          
          if (response.status === 403) {
            throw new Error('No tiene permisos para crear órdenes de trabajo.');
          }
          
          throw new Error(
            errorData.message || errorData.error || `Error del servidor: ${response.status}`
          );
        }

        const ordenCreada = await response.json();
        console.log('Orden creada exitosamente:', ordenCreada);

        // Mostrar mensaje de éxito
        this.trackingIdCreado = ordenCreada.trackingId || `WO-${ordenCreada.id}`;
        this.mensajeExito = `La orden ha sido creada exitosamente y está en estado "En Espera" para ser asignada a un técnico.`;

        // Limpiar formulario
        this.limpiarFormulario();

      } catch (err) {
        console.error('Error al crear orden:', err);
        this.error = err.message || 'Error al crear la orden de servicio';
        
        // Auto-ocultar error después de 5 segundos
        setTimeout(() => {
          this.error = null;
        }, 5000);
      } finally {
        this.cargando = false;
      }
    },

    limpiarFormulario() {
      this.formulario = {
        cliente_nombre: '',
        cliente_telefono: '',
        cliente_email: '',
        marca_equipo: '',
        modelo_equipo: '',
        numero_serie: '',
        descripcion_problema: '',
        costo_estimado: 0,
      };
    },

    resetFormulario() {
      this.mensajeExito = null;
      this.trackingIdCreado = null;
      this.error = null;
      this.limpiarFormulario();
    },

    volverAlPanel() {
      this.$router.push('/panel-tecnicos');
    },
  },

  mounted() {
    // Verificar que el usuario tenga permisos
    const token = localStorage.getItem('access_token');
    const userRol = localStorage.getItem('user_rol');
    
    if (!token) {
      this.error = 'Debe iniciar sesión para acceder a esta página';
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
      return;
    }
    
    if (userRol !== 'administrador' && userRol !== 'tecnico') {
      this.error = 'No tiene permisos para crear órdenes de trabajo. Solo administradores y técnicos pueden acceder.';
      setTimeout(() => {
        this.$router.push('/home');
      }, 3000);
    }
  },
};
