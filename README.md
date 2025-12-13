# 🖥️ CHPC Web - Tienda Online de Tecnología

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)
![NestJS](https://img.shields.io/badge/NestJS-Planned-red.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Plataforma de comercio electrónico para **CHPC Tecnología** (ClickHere PC), especializada en la venta de equipos tecnológicos, computadoras, periféricos y accesorios en Manta, Ecuador.

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Roadmap](#-roadmap)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribuir](#-contribuir)

---

## ✨ Características Principales

### 🛍️ Experiencia de Usuario
- **Catálogo de productos** con 10 categorías de tecnología
- **Carrito de compras** con persistencia en localStorage
- **Filtrado por categoría y marca** (18 marcas disponibles)
- **Búsqueda en tiempo real** de productos
- **Diseño responsive** optimizado para móviles y escritorio
- **Interfaz moderna** con gradientes y animaciones suaves

### 🔐 Autenticación
- Sistema de registro de usuarios
- Inicio de sesión con validación de campos
- Gestión de sesiones con tokens JWT
- Validación de contraseñas seguras

### 🛒 Gestión de Compras
- Carrito con cálculo automático de:
  - Subtotal de productos
  - IVA del 15% (Ecuador)
  - Costos de envío (gratis sobre $100)
  - Total final
- Contador de productos en carrito (badge visual)
- Funciones de incrementar/decrementar cantidades
- Eliminación individual o vaciado completo

### 🏢 Información de Negocio
- Sección de servicio técnico
- Redes sociales integradas
- Google Maps con ubicación real en Manta
- Footer con información de contacto

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **Vue 3** - Framework progresivo de JavaScript
- **Vue Router** - Navegación SPA
- **Axios** - Cliente HTTP para API requests
- **CSS3** - Estilos personalizados con gradientes y animaciones
- **LocalStorage** - Persistencia del carrito

### Backend (Planificado)
- **NestJS** - Framework de Node.js
- **TypeORM** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación y autorización

### Integración Externa
- **Sistema ERP** - Sincronización mediante vistas de base de datos
- **PostgreSQL Intermedia** - Capa de sincronización

---

## 📁 Estructura del Proyecto

```
CHPC-Web-Page/
└── Pagina Refactorizada/
    └── frontend-chpc/
        ├── public/
        │   ├── Banners/          # Imágenes de banners
        │   ├── Marcas/           # Logos de 18 marcas
        │   ├── Productos/        # Imágenes de productos
        │   └── IconosRS/         # Iconos de redes sociales
        ├── src/
        │   ├── components/
        │   │   ├── HeaderAnth/           # Barra de navegación
        │   │   ├── FooterAnth/           # Pie de página
        │   │   ├── HomePage/             # Página principal
        │   │   ├── CarouselBanner/       # Carrusel de banners
        │   │   ├── CategoriasProductos/  # Vista de categorías
        │   │   ├── ProductosPorCategoria/# Productos filtrados
        │   │   ├── ProductosPorMarca/    # Productos por marca
        │   │   ├── ProductoDetalle/      # Detalle de producto
        │   │   ├── CarritoCompras/       # Carrito de compras
        │   │   ├── SesionUsuario/        # Login
        │   │   ├── RegistroUsuario/      # Registro
        │   │   ├── ListaMarcas/          # Catálogo de marcas
        │   │   ├── ServicioTecnico/      # Servicio técnico
        │   │   └── RedesSociales/        # Redes sociales
        │   ├── router/
        │   │   └── index.js              # Configuración de rutas
        │   ├── App.vue                   # Componente raíz
        │   └── main.js                   # Entrada de la app
        ├── backend/                      # Backend NestJS (en desarrollo)
        │   └── src/
        │       ├── auth/                 # Autenticación
        │       ├── banners/              # Gestión de banners
        │       ├── products/             # Gestión de productos
        │       └── users/                # Gestión de usuarios
        ├── package.json
        └── vue.config.js
```

---

## 🔧 Instalación

### Prerrequisitos
- Node.js v16+ y npm
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/CHPC-Web-Page.git
cd CHPC-Web-Page
```

2. **Navegar al directorio del frontend**
```bash
cd "Pagina Refactorizada/frontend-chpc"
```

3. **Instalar dependencias**
```bash
npm install
```

4. **Ejecutar en modo desarrollo**
```bash
npm run serve
```

5. **Abrir en el navegador**
```
http://localhost:8080
```

### Compilar para producción
```bash
npm run build
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Módulos Completados

#### 🏠 Página Principal (HomePage)
- Carrusel de banners promocionales
- Grid de productos con imágenes
- Carga dinámica de productos
- Navegación fluida

#### 🗂️ Sistema de Categorías
- **10 Categorías disponibles:**
  - 💻 Laptops
  - 🖥️ Desktops
  - 🖥️ Monitores
  - ⌨️ Teclados
  - 🖱️ Ratones
  - 🖨️ Impresoras
  - 📷 Cámaras
  - 📱 Tablets
  - 🎧 Accesorios
  - 🌐 Networking

#### 🏷️ Marcas Disponibles
**18 marcas tecnológicas:**
- Apple, Samsung, HP, Dell, Lenovo
- Asus, Acer, Microsoft, Logitech
- Canon, Epson, Sony, Corsair
- Gigabyte, Hikvision, Mercusys
- NVIDIA, TP-Link

#### 🛒 Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático de totales
- IVA 15% (Ecuador)
- Envío gratis sobre $100
- Persistencia en navegador

#### 🔐 Autenticación
- Registro de usuarios con validación
- Login con JWT
- Validación de campos en tiempo real
- Diseño profesional con gradientes
- Protección de rutas

#### 🎨 Diseño UI/UX
- **Header:** Menú de navegación con dropdown de productos
- **Footer:** Información de contacto y Google Maps
- **Diseño responsive:** Mobile-first approach
- **Animaciones:** Transiciones suaves y efectos hover
- **Colores corporativos:** Azul (#3498db) y Verde (#27ae60)

#### 📍 Información de Contacto
- Google Maps integrado con ubicación real
- Redes sociales vinculadas
- Información de servicio técnico
- WhatsApp directo para compras

---

## 🗺️ Roadmap

### 🔄 En Desarrollo
- [ ] Backend NestJS completo
- [ ] Base de datos PostgreSQL
- [ ] Sincronización con ERP externo

### 📝 Próximas Funcionalidades
- [ ] Pasarela de pagos (PayPhone/Kushki)
- [ ] Sistema de órdenes completo
- [ ] Panel de administración
- [ ] Gestión de inventario en tiempo real
- [ ] Sistema de reseñas y calificaciones
- [ ] Email notifications
- [ ] Facturación electrónica (SRI Ecuador)
- [ ] Wishlist/Lista de deseos
- [ ] Historial de compras
- [ ] Recuperación de contraseña
- [ ] Búsqueda avanzada con filtros
- [ ] Sistema de promociones y cupones
- [ ] Tracking de envíos
- [ ] PWA (Progressive Web App)
- [ ] Analytics y reportes

---

## 📸 Capturas de Pantalla

_Próximamente: Screenshots de las principales vistas de la aplicación_

---

## 🏗️ Arquitectura de Integración

### Flujo de Datos Planificado
```
┌─────────────────┐
│   Sistema ERP   │ (Facturación/Inventario)
│  (Solo Lectura) │
└────────┬────────┘
         │ Vistas SQL
         ↓
┌─────────────────┐
│   PostgreSQL    │ (Base Intermedia)
│  Sincronización │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Backend NestJS │ (API REST)
│   TypeORM + JWT │
└────────┬────────┘
         │ HTTP/JSON
         ↓
┌─────────────────┐
│  Frontend Vue 3 │ (Interfaz Usuario)
│   Vue Router    │
└─────────────────┘
```

### Vistas de Base de Datos Necesarias
1. `web_productos` - Catálogo de productos
2. `web_productos_imagenes` - Imágenes de productos
3. `web_categorias` - Categorías
4. `web_marcas` - Marcas disponibles
5. `web_productos_destacados` - Productos destacados
6. `web_clientes` - Clientes registrados
7. `web_precios_especiales` - Precios por cliente
8. `web_stock_disponible` - Inventario en tiempo real
9. `web_banners` - Banners promocionales

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es propiedad de **CHPC Tecnología** - Manta, Ecuador.

---

## 📞 Contacto

**CHPC Tecnología (ClickHere PC)**
- 📍 Ubicación: Manta, Ecuador
- 📱 WhatsApp: +593 99 592 4867
- 🌐 Web: [En construcción]
- 📧 Email: [Próximamente]

---

## 🙏 Agradecimientos

- Vue.js Community
- NestJS Team
- Todos los contribuidores del proyecto

---

**Nota:** Este proyecto está en desarrollo activo. Las funcionalidades pueden cambiar.
