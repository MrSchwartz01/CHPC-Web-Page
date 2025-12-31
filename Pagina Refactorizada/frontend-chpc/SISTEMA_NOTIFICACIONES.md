# Sistema de Notificaciones de Pedidos

## 📋 Resumen

Se ha implementado un sistema completo de notificaciones en tiempo real para administradores y vendedores cuando se reciben nuevos pedidos.

## 🎯 Características Implementadas

### Backend (NestJS)
1. **Modelo de Notificaciones** - Nueva tabla en Prisma con tipos de notificación
2. **Módulo de Notificaciones** - Service, Controller y DTOs completos
3. **Integración con Orders** - Creación automática de notificaciones al recibir pedidos
4. **Server-Sent Events (SSE)** - Notificaciones en tiempo real sin necesidad de WebSocket
5. **Sistema de Lectura** - Marcar notificaciones individuales o todas como leídas

### Frontend (Vue)
1. **NotificationsBell** - Campana de notificaciones con dropdown para header/navbar
2. **NotificationsPanel** - Panel completo para ver todas las notificaciones
3. **Integración en AdminPanel** - Tab de notificaciones + campana en header
4. **Integración en Dashboard** - Campana en header del dashboard de vendedor
5. **Mejora en CarritoCompras** - Mensaje mejorado al finalizar pedido

## 🚀 Pasos para Activar el Sistema

### 1. Migrar la Base de Datos

```powershell
cd "Pagina Refactorizada\frontend-chpc\backend"

# Generar la migración
npx prisma migrate dev --name add-notifications

# O si prefieres solo generar el cliente sin migrar
npx prisma generate
```

### 2. Instalar Dependencias (si es necesario)

```powershell
# Backend - RxJS para SSE (probablemente ya instalado)
npm install rxjs

# Frontend - No requiere nuevas dependencias
```

### 3. Iniciar el Backend

```powershell
cd "Pagina Refactorizada\frontend-chpc\backend"
npm run start:dev
```

### 4. Iniciar el Frontend

```powershell
cd "Pagina Refactorizada\frontend-chpc"
npm run serve
```

## 📱 Cómo Usar el Sistema

### Para Clientes
1. Agregar productos al carrito
2. Click en "Proceder al Pago"
3. Llenar formulario de checkout
4. Click en "Confirmar Compra"
5. ✅ Se crea el pedido y se notifica automáticamente a admin/vendedores

### Para Administradores y Vendedores
1. **Campana de Notificaciones (🔔)**
   - Aparece en el header del AdminPanel y Dashboard
   - Muestra badge con número de notificaciones sin leer
   - Click para abrir dropdown con últimas 5 notificaciones
   - Click en notificación para verla y marcarla como leída

2. **Panel de Notificaciones Completo**
   - En AdminPanel: nuevo tab "🔔 Notificaciones"
   - Lista completa de todas las notificaciones
   - Botón "Marcar todas como leídas"
   - Click en "Ver Pedido" para ir a los detalles

3. **Notificaciones del Navegador**
   - El sistema solicita permiso para notificaciones del navegador
   - Las notificaciones aparecen incluso si la pestaña está en segundo plano

## 🔔 Tipos de Notificaciones

- `NUEVO_PEDIDO` 🛒 - Cuando un cliente realiza un pedido
- `PEDIDO_ACTUALIZADO` 📦 - Cuando se actualiza el estado
- `PEDIDO_COMPLETADO` ✅ - Cuando se completa un pedido
- `PEDIDO_CANCELADO` ❌ - Cuando se cancela un pedido

## 🎨 Características del Sistema

### Notificaciones en Tiempo Real
- Usa **Server-Sent Events (SSE)** para push en tiempo real
- No requiere configuración de WebSocket
- Reconexión automática si se pierde la conexión
- Polling cada 30 segundos como respaldo

### Sistema de Lectura Inteligente
- Marca como leída al hacer click
- Botón para marcar todas como leídas
- Badge rojo con contador de no leídas
- Visual diferenciado para notificaciones no leídas

### Responsive y Accesible
- Diseño adaptable a móviles
- Iconos intuitivos por tipo de notificación
- Timestamps relativos (hace 5m, hace 2h, etc.)
- Smooth scrolling y animaciones

## 🔐 Seguridad y Permisos

- Solo usuarios autenticados reciben notificaciones
- Filtrado por rol (admin/vendedor)
- JWT para autenticar conexión SSE
- Cada usuario solo ve sus notificaciones como leídas/no leídas

## 📊 Datos Almacenados

La tabla `notificaciones` incluye:
- Tipo de notificación
- Título y mensaje
- ID y código del pedido relacionado
- Destinatarios (roles)
- Array de IDs de usuarios que han leído
- Timestamps de creación y actualización

## 🛠️ Endpoints del API

```
GET    /notifications                    # Obtener notificaciones del usuario
GET    /notifications/unread-count       # Contador de no leídas
PATCH  /notifications/:id/read           # Marcar una como leída
POST   /notifications/mark-all-read      # Marcar todas como leídas
GET    /notifications/stream              # SSE para tiempo real (EventSource)
```

## 🔄 Flujo Completo

1. Cliente completa checkout → `POST /ordenes`
2. OrdersService crea la orden
3. OrdersService crea notificación → `NotificationsService.createNotification()`
4. La notificación se guarda en BD
5. Se emite evento SSE a todos los admin/vendedores conectados
6. Frontend recibe evento y actualiza UI
7. Se muestra notificación del navegador
8. Admin/vendedor puede marcar como leída

## 🎯 Próximas Mejoras Posibles

- [ ] Notificaciones por email
- [ ] Notificaciones por WhatsApp/SMS
- [ ] Filtros por tipo de notificación
- [ ] Búsqueda en notificaciones
- [ ] Paginación para muchas notificaciones
- [ ] Sonido al recibir notificación
- [ ] Configuración de preferencias de notificación
- [ ] Notificaciones para otros eventos (stock bajo, etc.)

## 🐛 Troubleshooting

### Las notificaciones no aparecen en tiempo real
- Verifica que el backend esté corriendo
- Revisa la consola del navegador por errores de SSE
- Asegúrate que el token JWT esté presente

### El badge no se actualiza
- Verifica que la conexión SSE esté activa
- Revisa que el rol del usuario sea admin o vendedor

### Migraciones fallan
```powershell
# Reset completo de la BD (¡CUIDADO! Borra datos)
npx prisma migrate reset

# O crear manualmente
npx prisma db push
```

## 📝 Notas Técnicas

- **SSE vs WebSocket**: Elegí SSE por simplicidad, unidireccional servidor→cliente
- **RxJS Subject**: Para broadcasting de eventos a múltiples clientes
- **Array de leído_por**: Permite tracking individual sin crear tabla de relación
- **Badge reactivo**: Actualizado tanto por SSE como por polling

---

✅ **Sistema Completamente Funcional y Listo para Usar**

Cualquier pedido realizado generará automáticamente notificaciones que aparecerán instantáneamente en el panel de administradores y vendedores.
