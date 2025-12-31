# 🚀 Guía Rápida de Inicio - Sistema de Notificaciones

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Migrar Base de Datos
```powershell
cd "Pagina Refactorizada\frontend-chpc\backend"
npx prisma migrate dev --name add-notifications
```

### 2️⃣ Iniciar Backend
```powershell
# En terminal 1
cd "Pagina Refactorizada\frontend-chpc\backend"
npm run start:dev
```

### 3️⃣ Iniciar Frontend
```powershell
# En terminal 2
cd "Pagina Refactorizada\frontend-chpc"
npm run serve
```

## ✅ Sistema Listo!

### Probar el Sistema:

1. **Como Cliente:**
   - Ir a http://localhost:8080
   - Agregar productos al carrito
   - Click en "Proceder al Pago"
   - Completar formulario
   - Click en "Confirmar Compra" ✨

2. **Como Admin/Vendedor:**
   - Login con credenciales de admin o vendedor
   - Ir a `/admin/panel` o `/dashboard`
   - Ver la campana 🔔 en el header
   - **¡Automáticamente recibirás la notificación en tiempo real!**

## 📍 Rutas Disponibles

- `/admin/panel` - Panel de administración (con tab de notificaciones)
- `/admin/notifications` - Panel completo de notificaciones
- `/dashboard` - Dashboard de vendedor (con campana de notificaciones)

## 🎯 Funcionalidades

✅ Notificaciones en tiempo real (SSE)
✅ Campana con badge de contador
✅ Dropdown con últimas 5 notificaciones
✅ Panel completo con todas las notificaciones
✅ Marcar como leída individual o todas
✅ Notificaciones del navegador (opcional)
✅ Responsive y animado

## 🔧 Si algo falla:

```powershell
# Reset completo de BD (¡CUIDADO! Borra datos)
cd "Pagina Refactorizada\frontend-chpc\backend"
npx prisma migrate reset

# Regenerar cliente Prisma
npx prisma generate
```

## 📱 Probar Notificaciones en Tiempo Real

1. Abre dos ventanas del navegador
2. En una: login como admin → ir a `/admin/panel`
3. En otra: como cliente → hacer un pedido
4. **¡La notificación aparecerá instantáneamente en el panel de admin!**

---

## 🎨 Visual del Sistema

**Campana de Notificaciones:**
```
🔔 3  ← Badge rojo con contador
```

**Dropdown al hacer click:**
```
┌─────────────────────────────┐
│ Notificaciones          ✓   │ ← Marcar todas
├─────────────────────────────┤
│ 🛒 Nuevo Pedido             │
│ Pedido #CHPC-000123         │
│ hace 2m                     │
├─────────────────────────────┤
│ 🛒 Nuevo Pedido             │
│ Pedido #CHPC-000122         │
│ hace 15m                    │
├─────────────────────────────┤
│   Ver todas las notificaciones   │
└─────────────────────────────┘
```

---

✨ **¡Todo Listo para Usar!** ✨

El sistema está completamente funcional y probado.
Cualquier pedido generará notificaciones automáticas.
