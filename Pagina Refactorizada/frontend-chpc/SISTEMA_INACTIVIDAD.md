# Sistema de Cierre Automático de Sesión por Inactividad

## Descripción
El sistema implementa un mecanismo de seguridad que cierra automáticamente la sesión del usuario después de **1 hora (60 minutos)** de inactividad.

## Funcionamiento

### 1. Detección de Actividad
El sistema monitorea los siguientes eventos del usuario:
- `mousedown` - Clics del mouse
- `mousemove` - Movimiento del mouse
- `keypress` - Pulsaciones de teclado
- `scroll` - Desplazamiento de la página
- `touchstart` - Toques en pantalla táctil
- `click` - Clics en general

### 2. Timer de Inactividad
- **Tiempo límite**: 3,600,000 milisegundos (1 hora)
- **Reinicio automático**: Cada vez que se detecta actividad del usuario
- **Solo usuarios autenticados**: El sistema solo se activa si hay un token de acceso válido

### 3. Proceso de Cierre de Sesión
Cuando se cumple el tiempo de inactividad:

1. Se verifica que el usuario esté autenticado
2. Se eliminan todos los datos de sesión:
   - `access_token`
   - `refresh_token`
   - `user_rol`
   - `user_nombre`
   - `carrito`
3. Se muestra una alerta informativa
4. Se redirige al usuario a la página de login

### 4. Reinicio del Timer
El timer se reinicia automáticamente en los siguientes casos:
- Cualquier actividad del usuario (eventos monitoreados)
- Al iniciar sesión exitosamente
- Al refrescar el token de acceso
- Al navegar entre páginas

## Archivos Involucrados

### `src/App.vue`
Componente principal que implementa el sistema de monitoreo:
- Inicializa los listeners de eventos
- Gestiona el timer de inactividad
- Ejecuta el logout por inactividad

### `src/services/inactivityService.js`
Servicio singleton que permite:
- Registro de función de reseteo
- Reinicio del timer desde cualquier componente
- Gestión centralizada del estado

### Componentes Actualizados
- `SesionUsuario.js` - Reinicia timer al hacer login
- `axiosConfig.js` - Reinicia timer al refrescar token

## Configuración

Para cambiar el tiempo de inactividad, modifica la variable en `App.vue`:

```javascript
data() {
  return {
    inactivityTimeout: 3600000, // Tiempo en milisegundos
  };
}
```

### Ejemplos de tiempos:
- 30 minutos: `1800000`
- 1 hora: `3600000` (actual)
- 2 horas: `7200000`
- 15 minutos: `900000`

## Características de Seguridad

1. **Limpieza completa**: Se eliminan todos los datos de sesión al cerrar
2. **Verificación múltiple**: Se valida la autenticación antes de cada acción
3. **No acumulación de timers**: Se limpia el timer anterior antes de crear uno nuevo
4. **Gestión de memoria**: Se remueven todos los listeners al destruir el componente
5. **Solo usuarios autenticados**: No afecta a usuarios no logueados

## Notificación al Usuario

Al cerrar la sesión por inactividad, se muestra el siguiente mensaje:

```
"Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente."
```

## Ventajas del Sistema

- ✅ Mejora la seguridad protegiendo sesiones abandonadas
- ✅ Previene acceso no autorizado en dispositivos compartidos
- ✅ Cumple con buenas prácticas de seguridad web
- ✅ No interfiere con usuarios activos
- ✅ Reinicio automático con cualquier interacción
- ✅ Implementación global sin modificar componentes individuales

## Comportamiento en Diferentes Escenarios

### Usuario Activo
- El timer se resetea constantemente
- La sesión nunca expira mientras haya actividad

### Usuario Inactivo
- Después de 1 hora sin actividad
- Se cierra la sesión automáticamente
- Se redirige al login con mensaje explicativo

### Usuario con Múltiples Pestañas
- El timer funciona de manera independiente en cada pestaña
- Si una pestaña está activa, su sesión no expira
- Las pestañas inactivas cerrarán sesión tras 1 hora

### Navegación entre Páginas
- La navegación cuenta como actividad
- El timer se reinicia automáticamente

## Testing

Para probar el sistema en desarrollo, puedes reducir temporalmente el tiempo:

```javascript
// En App.vue - Para pruebas (2 minutos)
inactivityTimeout: 120000,
```

## Notas Importantes

- El sistema NO afecta el tiempo de vida del token JWT en el backend
- El logout por inactividad es adicional a la expiración del token
- Los tokens siguen expirando según su configuración (access: 15 min, refresh: 7 días)
- Este mecanismo es una capa adicional de seguridad en el frontend
