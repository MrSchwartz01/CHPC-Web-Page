# 📱 Configuración del Componente ContactoAsesor

## ⚙️ Configurar Número de WhatsApp

El componente **ContactoAsesor** está configurado con un número de WhatsApp de ejemplo. Para usar el número real de tu empresa, edita:

**Archivo:** `src/components/ContactoAsesor/ContactoAsesor.vue`

**Línea 26:**
```javascript
const numeroWhatsApp = '593999999999'; // ← CAMBIAR AQUÍ
```

### Formato del Número

El número debe estar en formato internacional **SIN** el signo `+`:

- ✅ Correcto: `'593999999999'` (Ecuador)
- ✅ Correcto: `'34612345678'` (España)
- ✅ Correcto: `'5491123456789'` (Argentina)
- ❌ Incorrecto: `'+593999999999'`
- ❌ Incorrecto: `'0999999999'`

**Formato:** `[código_país][número_sin_cero_inicial]`

### Ejemplo Real

```javascript
// Ecuador
const numeroWhatsApp = '593987654321';

// España
const numeroWhatsApp = '34612345678';

// México
const numeroWhatsApp = '525512345678';
```

## 🎨 Personalizar el Mensaje

Puedes personalizar el mensaje predeterminado que aparece al abrir WhatsApp editando la prop `mensaje` en cada página, o dejarlo como está para usar el mensaje por defecto.

### Mensaje Personalizado (Opcional)

En cualquier página donde uses `<ContactoAsesor />`, puedes agregar:

```vue
<ContactoAsesor mensaje="Hola, necesito información sobre [nombre del producto/categoría]" />
```

### Ejemplos por Página

**TodosLosProductos.vue:**
```vue
<ContactoAsesor mensaje="¡Hola! Estoy buscando un producto específico." />
```

**ProductosPorCategoria.vue:**
```vue
<ContactoAsesor :mensaje="`¡Hola! Necesito ayuda con productos de ${nombreCategoria}`" />
```

**ProductosPorMarca.vue:**
```vue
<ContactoAsesor :mensaje="`¡Hola! Busco productos de la marca ${nombreMarca}`" />
```

**ProductoDetalle.vue:**
```vue
<ContactoAsesor :mensaje="`¡Hola! Tengo consultas sobre: ${producto.nombre_producto}`" />
```

## 📍 Ubicación del Componente

El componente aparece automáticamente en:
- ✅ Todos los Productos
- ✅ Productos por Categoría
- ✅ Productos por Marca
- ✅ Detalle de Producto

Siempre se muestra **antes del footer**, al final de cada página.

## 🎯 Características del Componente

- **Diseño Atractivo** - Gradiente moderno y animaciones sutiles
- **Responsive** - Se adapta a móviles y tablets
- **Icono Animado** - Atrae la atención del usuario
- **Link Directo** - Abre WhatsApp con mensaje predefinido
- **Botón Principal** - "Chatear con un Asesor" con efecto hover

## 🔧 Personalización de Estilos (Opcional)

Si quieres cambiar los colores del componente, edita el archivo:

`src/components/ContactoAsesor/ContactoAsesor.vue`

**Colores principales:**
```css
/* Color de WhatsApp */
background: #25d366;

/* Gradiente del fondo */
background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
```

## 📝 Ejemplo de Resultado

Cuando el usuario hace click en "Chatear con un Asesor", se abre WhatsApp con:

```
¡Hola! Necesito ayuda para encontrar un producto.
```

Y el asesor puede responder directamente desde su WhatsApp Business o personal.

---

✅ **Componente listo para usar** - Solo necesitas cambiar el número de WhatsApp.
