# 📘 Ejemplos de Uso - Panel de Vendedores

## Caso de Uso 1: Vendedor Toma un Pedido

### Escenario
Un cliente ha realizado un pedido y el vendedor Juan quiere atenderlo.

### Pasos
1. Juan inicia sesión como vendedor
2. Va al Panel de Pedidos (`/panel-vendedores`)
3. Ve un pedido con estado "⏳ Pendiente" sin vendedor asignado
4. Hace clic en "📌 Tomar Pedido"
5. El pedido ahora muestra:
   - Badge: "👤 Juan Pérez"
   - Estado: "🔄 En Trámite"

### Resultado
- El pedido se asigna automáticamente a Juan
- Se envía una notificación a todos los admins y vendedores
- Juan ahora puede cambiar el estado del pedido

---

## Caso de Uso 2: Cambiar Estado de un Pedido

### Escenario
Juan ha procesado el pedido y quiere marcarlo como atendido.

### Pasos
1. En su pedido asignado, encuentra el selector "Cambiar estado"
2. Selecciona "✅ Atendido" del dropdown
3. El pedido se actualiza instantáneamente

### Resultado
- El estado cambia a "✅ Atendido"
- El color de la tarjeta cambia a verde
- Se envía notificación del cambio de estado

---

## Caso de Uso 3: Liberar un Pedido

### Escenario
Juan no puede continuar con un pedido y quiere liberarlo para que otro vendedor lo tome.

### Pasos
1. En el pedido asignado, hace clic en "🔓 Liberar Pedido"
2. Confirma la acción en el diálogo
3. El pedido vuelve a estar disponible

### Resultado
- El pedido vuelve a estado "⏳ Pendiente"
- Se remueve la asignación de vendedor
- Otros vendedores pueden tomarlo

---

## Caso de Uso 4: Administrador Gestiona Todos los Pedidos

### Escenario
La administradora María quiere ver el estado general y reasignar pedidos.

### Pasos
1. María inicia sesión como administradora
2. Va al Panel de Pedidos
3. Ve TODOS los pedidos (incluso los de otros vendedores)
4. Puede:
   - Tomar cualquier pedido disponible
   - Liberar cualquier pedido (incluso de otros vendedores)
   - Cambiar el estado de cualquier pedido

---

## Caso de Uso 5: Filtrar Pedidos por Estado

### Escenario
El vendedor quiere ver solo los pedidos pendientes.

### Pasos
1. En el Panel, usa el filtro "Filtrar por estado"
2. Selecciona "Pendiente"
3. La lista se actualiza mostrando solo pedidos pendientes

---

## Caso de Uso 6: Ver Solo Mis Pedidos

### Escenario
El vendedor quiere ver solo los pedidos que tiene asignados.

### Pasos
1. En el Panel, usa el filtro "Vista"
2. Selecciona "Mis pedidos asignados"
3. Ve solo sus pedidos

---

## Caso de Uso 7: Cancelar un Pedido

### Escenario
El cliente llamó para cancelar su pedido.

### Pasos
1. El vendedor encuentra el pedido
2. Cambia el estado a "❌ Cancelado"
3. El pedido se marca como cancelado

### Resultado
- El pedido muestra estado "❌ Cancelado" con color rojo
- Se envía notificación del cambio

---

## Ejemplos de Peticiones API

### 1. Obtener todos los pedidos
```javascript
const response = await axios.get(
  'http://localhost:3000/ordenes/panel/todas',
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
console.log(response.data);
// Retorna array de pedidos con información completa
```

### 2. Asignar pedido
```javascript
const response = await axios.post(
  'http://localhost:3000/ordenes/123/asignar',
  {
    vendedor_nombre: 'Juan Pérez'
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
console.log(response.data);
// Retorna el pedido actualizado con vendedor asignado
```

### 3. Cambiar estado
```javascript
const response = await axios.patch(
  'http://localhost:3000/ordenes/123/estado-gestion',
  {
    estado_gestion: 'ATENDIDO'
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
console.log(response.data);
// Retorna el pedido con el nuevo estado
```

### 4. Desasignar pedido
```javascript
const response = await axios.delete(
  'http://localhost:3000/ordenes/123/desasignar',
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
console.log(response.data);
// Retorna el pedido liberado
```

---

## Flujo Completo de un Pedido

```
1. Cliente crea pedido
   └─> Estado: PENDIENTE, Sin vendedor

2. Vendedor toma el pedido
   └─> Estado: EN_TRAMITE, Vendedor: Juan Pérez

3. Vendedor procesa el pedido
   └─> Estado: EN_TRAMITE (trabajando)

4. Vendedor completa el pedido
   └─> Estado: ATENDIDO

O en caso de problemas:
   └─> Estado: CANCELADO
```

---

## Notificaciones Generadas

| Acción | Título | Destinatarios |
|--------|--------|---------------|
| Nuevo pedido | 🛒 Nuevo Pedido Recibido | Admins + Vendedores |
| Pedido asignado | 👤 Pedido Asignado | Admins + Vendedores |
| Pedido liberado | 🔄 Pedido Liberado | Admins + Vendedores |
| Estado actualizado | 📊 Estado Actualizado | Admins + Vendedores |

---

## Estadísticas en Tiempo Real

El panel muestra 4 estadísticas principales:

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Pendientes  │ En Trámite  │  Atendidos  │ Mis Pedidos │
│     12      │      8      │     45      │      3      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

---

## Permisos por Rol

### Vendedor Carlos

✅ Puede:
- Ver todos los pedidos
- Tomar pedidos disponibles
- Desasignar sus propios pedidos
- Cambiar estado de sus pedidos

❌ No puede:
- Desasignar pedidos de otros vendedores
- Cambiar estado de pedidos de otros

### Administradora María

✅ Puede:
- Ver todos los pedidos
- Tomar cualquier pedido
- Desasignar cualquier pedido
- Cambiar estado de cualquier pedido
- Todo lo que puede un vendedor + más

---

## Tips de Uso

### 💡 Tip 1: Actualización Automática
El panel se actualiza cada 30 segundos. No necesitas refrescar manualmente.

### 💡 Tip 2: Filtros Combinados
Puedes combinar filtros. Por ejemplo:
- Vista: "Mis pedidos asignados"
- Estado: "En Trámite"
- Resultado: Tus pedidos que están en trámite

### 💡 Tip 3: Búsqueda Rápida
Usa Ctrl+F en el navegador para buscar un código de pedido específico.

### 💡 Tip 4: Información del Cliente
Toda la información del cliente está en cada tarjeta:
- Nombre, email, teléfono, dirección
- Útil para contactar al cliente directamente

### 💡 Tip 5: Observaciones
Si el pedido tiene observaciones, aparecen destacadas en amarillo.

---

## Próximas Mejoras Sugeridas

1. **Filtro por vendedor**: Ver pedidos de un vendedor específico
2. **Búsqueda por código**: Campo de búsqueda dedicado
3. **Export a Excel**: Exportar lista de pedidos
4. **Estadísticas avanzadas**: Gráficos de rendimiento
5. **Chat interno**: Comunicación entre vendedores
6. **Historial de cambios**: Ver quién hizo qué cambios
7. **Asignación automática**: Distribuir pedidos equitativamente

---

¿Preguntas? Consulta [PANEL_VENDEDORES_README.md](PANEL_VENDEDORES_README.md) para más detalles.
