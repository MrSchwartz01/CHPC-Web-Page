// Configuración de la API
// Para acceso desde red local, define VUE_APP_API_URL en archivo .env
// o cambia manualmente la IP aquí

// Detectar automáticamente si se está accediendo desde red local
function getApiBaseUrl() {
  // Si hay variable de entorno, usarla
  if (process.env.VUE_APP_API_URL) {
    return process.env.VUE_APP_API_URL;
  }
  
  // Si se accede desde localhost/127.0.0.1, usar localhost
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  // Si se accede desde una IP de red local, usar esa misma IP para el backend
  return `http://${hostname}:5000/api`;
}

const API_BASE_URL = getApiBaseUrl();

export { API_BASE_URL };
