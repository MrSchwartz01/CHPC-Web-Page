# 📊 Análisis de Endpoints del Proyecto CHPC

## ✅ Endpoints Existentes

### 🔐 **Auth** (`/auth`)
- ✅ `POST /auth/registro` - Registrar nuevo usuario
- ✅ `POST /auth/login` - Iniciar sesión
- ✅ `POST /auth/logout` - Cerrar sesión (requiere auth)
- ✅ `POST /auth/refresh` - Refrescar token
- ✅ `GET /auth/verificar` - Verificar token válido (requiere auth)

### 👤 **Usuarios** (`/usuarios`)
- ✅ `GET /usuarios/perfil` - Obtener perfil del usuario autenticado
- ✅ `PATCH /usuarios/perfil` - Actualizar perfil
- ✅ `PATCH /usuarios/cambiar-password` - Cambiar contraseña
- ✅ `GET /usuarios` - Listar todos los usuarios (solo admin)

### 🛍️ **Productos** (`/tienda/productos`)
- ✅ `GET /tienda/productos` - Listar productos (con filtros)
- ⚠️ **FALTA**: `GET /tienda/productos/:id` - Detalle de un producto específico

### 🎨 **Banners** (`/tienda/banners`)
- ✅ `GET /tienda/banners` - Listar banners

### 📦 **Órdenes** (`/ordenes`)
- ✅ `POST /ordenes` - Crear nueva orden (requiere auth)
- ✅ `GET /ordenes` - Listar órdenes del usuario (requiere auth)
- ✅ `GET /ordenes/:id` - Detalle de una orden (requiere auth)
- ✅ `PATCH /ordenes/:id/status` - Actualizar estado (solo admin)
- ⚠️ **FALTA**: `GET /ordenes/todas` - Listar todas las órdenes (admin)

### ❤️ **Wishlist** (`/wishlist`)
- ✅ `POST /wishlist` - Agregar producto a wishlist (requiere auth)
- ✅ `GET /wishlist` - Obtener wishlist del usuario (requiere auth)
- ✅ `DELETE /wishlist/:productId` - Eliminar producto de wishlist (requiere auth)

### 🔧 **Órdenes de Servicio** (`/ordenes-servicio`)
- ✅ `POST /ordenes-servicio` - Crear orden de servicio (requiere auth)
- ✅ `GET /ordenes-servicio` - Listar órdenes de servicio del usuario (requiere auth)
- ✅ `GET /ordenes-servicio/:id` - Detalle de orden de servicio (requiere auth)
- ✅ `PATCH /ordenes-servicio/:id/estado` - Actualizar estado (solo admin)
- ⚠️ **FALTA**: `GET /ordenes-servicio/todas` - Listar todas las órdenes (admin)

### 📊 **Analytics** (`/analytics`) - Solo Admin
- ✅ `GET /analytics/kpis` - Indicadores clave de rendimiento
- ✅ `GET /analytics/ventas/por-periodo` - Ventas por período (?periodo=)
- ✅ `GET /analytics/productos/top` - Productos más vendidos (?limite=)
- ✅ `GET /analytics/ventas/por-categoria` - Ventas por categoría
- ✅ `GET /analytics/ordenes/recientes` - Órdenes recientes (?limite=)

---

## ❌ Endpoints FALTANTES Críticos

### 1. **Productos - Detalle Individual**
```typescript
// Necesario para: ProductoDetalle.vue
GET /tienda/productos/:id
```
**Impacto**: Alto - El frontend lo necesita pero usa una ruta que no existe

### 2. **Categorías**
```typescript
// Necesario para: CategoriasProductos.vue, filtros
GET /tienda/categorias           // Listar todas
GET /tienda/categorias/:id       // Detalle de categoría
GET /tienda/categorias/:id/productos  // Productos por categoría
```
**Impacto**: Alto - El frontend lo usa pero no existe en backend

### 3. **Marcas**
```typescript
// Necesario para: ListaMarcas.vue, ProductosPorMarca.vue
GET /tienda/marcas              // Listar todas
GET /tienda/marcas/:id          // Detalle de marca
GET /tienda/marcas/:id/productos    // Productos por marca
```
**Impacto**: Alto - El frontend lo usa pero no existe en backend

### 4. **Carrito de Compras**
```typescript
// Necesario para: CarritoCompras.vue
GET /carrito                     // Obtener carrito actual
POST /carrito/items             // Agregar item al carrito
PATCH /carrito/items/:id        // Actualizar cantidad
DELETE /carrito/items/:id       // Eliminar item
POST /carrito/checkout          // Procesar compra
```
**Impacto**: Crítico - Funcionalidad central no implementada

### 5. **Promociones**
```typescript
// Necesario para: Promociones.vue
GET /promociones                // Listar promociones activas
GET /promociones/:id            // Detalle de promoción
GET /promociones/:id/productos  // Productos en promoción
```
**Impacto**: Medio - Componente existe pero sin datos

### 6. **Media/Archivos**
```typescript
// Para manejar imágenes de productos
POST /upload                    // Subir imagen
GET /media/:filename            // Obtener imagen
DELETE /media/:filename         // Eliminar imagen (admin)
```
**Impacto**: Alto - Necesario para gestión de productos

### 7. **Admin - Gestión de Productos**
```typescript
// Para panel de administración
POST /tienda/productos          // Crear producto (admin)
PATCH /tienda/productos/:id     // Actualizar producto (admin)
DELETE /tienda/productos/:id    // Eliminar producto (admin)
```
**Impacto**: Alto - Sin esto no se pueden gestionar productos

### 8. **Admin - Gestión de Banners**
```typescript
POST /tienda/banners            // Crear banner (admin)
PATCH /tienda/banners/:id       // Actualizar banner (admin)
DELETE /tienda/banners/:id      // Eliminar banner (admin)
```
**Impacto**: Medio

### 9. **Búsqueda Avanzada**
```typescript
GET /tienda/buscar              // Búsqueda global
  ?q=texto&categoria=&marca=&precio_min=&precio_max=
```
**Impacto**: Medio - Mejoraría la experiencia de usuario

### 10. **Historial de Productos Vistos**
```typescript
// Para: HistorialProductosVistos.vue
GET /historial/productos        // Productos vistos recientemente
POST /historial/productos/:id   // Registrar vista de producto
```
**Impacto**: Bajo - Feature nice-to-have

### 11. **Estadísticas Adicionales**
```typescript
GET /analytics/clientes/nuevos  // Clientes nuevos por período
GET /analytics/ventas/por-producto/:id  // Ventas de un producto
GET /analytics/inventario/bajo-stock    // Productos con bajo stock
```
**Impacto**: Medio - Completaría el dashboard

---

## 🚨 Inconsistencias Detectadas

### 1. **Prefijo de Rutas de Auth**
- ❌ Frontend usa: `/tienda/auth/login` y `/tienda/auth/registro`
- ✅ Backend tiene: `/auth/login` y `/auth/registro`
- **Solución**: Actualizar frontend o agregar prefijo `/tienda` al AuthController

### 2. **Productos - Falta endpoint de detalle**
- Frontend usa: `GET /tienda/productos/${id}`
- Backend solo tiene: `GET /tienda/productos` (lista)
- **Solución**: Agregar endpoint `@Get(':id')` en ProductsController

### 3. **Categorías y Marcas**
- Frontend hace peticiones a `/tienda/categorias/:id` y `/tienda/marcas/:id`
- Backend: No existen estos controladores
- **Solución**: Crear módulos de Categorías y Marcas

---

## 🎯 Prioridades de Implementación

### **🔴 Prioridad CRÍTICA** (Bloqueantes)
1. Endpoint detalle de producto `GET /tienda/productos/:id`
2. Corregir prefijos de auth o actualizar frontend
3. Módulo completo de Carrito
4. CRUD de Categorías
5. CRUD de Marcas

### **🟡 Prioridad ALTA** (Importantes)
6. CRUD completo de Productos (admin)
7. Endpoint de búsqueda avanzada
8. Upload de imágenes
9. Listar todas las órdenes (admin)
10. CRUD de Promociones

### **🟢 Prioridad MEDIA** (Mejoras)
11. CRUD de Banners (admin)
12. Historial de productos vistos
13. Estadísticas adicionales para dashboard
14. Filtros avanzados en órdenes

---

## 📝 Recomendaciones

1. **Crear archivo de configuración centralizado** para URLs del backend
2. **Implementar interceptor de Axios** para manejo centralizado de errores
3. **Documentar API con Swagger** para mejor visibilidad
4. **Agregar tests** para cada endpoint
5. **Implementar rate limiting** para proteger la API
6. **Agregar paginación** a endpoints que retornan listas
7. **Versionar la API** (ej: `/api/v1/...`)

---

## 🔧 Próximos Pasos Sugeridos

1. ✅ Corregir inconsistencias de auth (prefijo `/tienda`)
2. ✅ Implementar endpoint de detalle de producto
3. ✅ Crear módulos de Categorías y Marcas
4. ✅ Implementar sistema de Carrito completo
5. ✅ Agregar CRUD de productos para admin
6. ✅ Implementar upload de imágenes
7. ✅ Crear módulo de Promociones

---

**Fecha de análisis**: 23 de diciembre de 2025
**Estado del proyecto**: En desarrollo activo
**Endpoints totales**: 28 implementados, ~35 faltantes
