// Configuración de la API
// Cambia esta URL a la IP de tu servidor cuando necesites acceso desde red local
// Ejemplo: export const API_BASE_URL = 'http://192.168.1.100:5000/api';

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api';

export { API_BASE_URL };
