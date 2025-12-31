# ⚠️ IMPORTANTE - Leer Antes de Ejecutar

## 🔴 Errores de TypeScript en el Editor

Si ves errores en `notifications.service.ts` como:
```
La propiedad 'notification' no existe en el tipo 'PrismaService'
```

**✅ ES NORMAL** - Estos errores desaparecerán automáticamente después de:

```powershell
cd "Pagina Refactorizada\frontend-chpc\backend"
npx prisma migrate dev --name add-notifications
```

Este comando:
1. Crea la tabla `notificaciones` en la base de datos
2. Genera el cliente de Prisma con el nuevo modelo
3. Los errores de TypeScript desaparecen automáticamente

## 📝 Orden de Ejecución CORRECTO

### Paso 1: Migrar Base de Datos (PRIMERO)
```powershell
cd "Pagina Refactorizada\frontend-chpc\backend"
npx prisma migrate dev --name add-notifications
```

**⏳ Espera a que termine completamente**

### Paso 2: Verificar que no hay errores
```powershell
npx prisma generate  # Regenerar cliente por si acaso
npm run build        # Compilar TypeScript
```

Si hay errores de compilación, son del backend, NO del código nuevo.

### Paso 3: Iniciar Servicios
```powershell
# Terminal 1 - Backend
cd "Pagina Refactorizada\frontend-chpc\backend"
npm run start:dev

# Terminal 2 - Frontend
cd "Pagina Refactorizada\frontend-chpc"
npm run serve
```

## 🔍 Verificar que Todo Funciona

1. **Backend iniciado correctamente:**
```
[Nest] LOG [NestApplication] Nest application successfully started +2ms
```

2. **Verifica endpoints de notificaciones:**
```powershell
# Debe responder con 401 (Unauthorized) - es correcto
curl http://localhost:3000/notifications
```

3. **Frontend iniciado:**
```
App running at:
- Local:   http://localhost:8080
```

## 🧪 Probar el Sistema Completo

### Test 1: Crear un Pedido
1. Abrir http://localhost:8080
2. Login o continuar como invitado (necesitas login para pedido)
3. Agregar productos al carrito
4. Ir a carrito → "Proceder al Pago"
5. Completar formulario
6. Click "Confirmar Compra"
7. **Debería aparecer mensaje de éxito con código de pedido**

### Test 2: Ver Notificación (Como Admin)
1. Login con credenciales de administrador
2. Ir a `/admin/panel`
3. **Deberías ver la campana 🔔 en el header**
4. Hacer otro pedido en otra pestaña
5. **La campana debería actualizarse automáticamente con el nuevo contador**

### Test 3: Panel de Notificaciones
1. Estando en `/admin/panel`
2. Click en tab "🔔 Notificaciones"
3. **Deberías ver la lista de pedidos**
4. Click en una notificación → se marca como leída
5. Badge de contador se actualiza

## 🚨 Si Algo No Funciona

### Error: "notification is not defined" en Prisma
```powershell
# Solución: Regenerar cliente
cd "Pagina Refactorizada\frontend-chpc\backend"
npx prisma generate
npm run start:dev
```

### Error: "Cannot find module NotificationsPanel"
```powershell
# Solución: Reiniciar servidor de desarrollo
cd "Pagina Refactorizada\frontend-chpc"
# Ctrl+C para detener
npm run serve
```

### La campana no aparece
- Verifica que estés logueado
- Verifica que tu rol sea 'administrador' o 'vendedor'
- Revisa la consola del navegador (F12) por errores

### Las notificaciones no llegan en tiempo real
1. Verifica que el backend esté corriendo
2. Abre las DevTools (F12) → pestaña Network
3. Busca una conexión tipo "EventSource" o "stream"
4. Si no hay, revisa la consola por errores de CORS

### Error de CORS
Si ves errores de CORS, agrega en `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:8080',
  credentials: true,
});
```

## 📊 Estructura de la Base de Datos

Después de la migración, tendrás esta nueva tabla:

```sql
CREATE TABLE "notificaciones" (
  "id" SERIAL PRIMARY KEY,
  "tipo" TEXT NOT NULL,
  "titulo" TEXT NOT NULL,
  "mensaje" TEXT NOT NULL,
  "orderId" INTEGER,
  "orderCodigo" TEXT,
  "destinatarios" TEXT[],
  "leido_por" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
```

## 📱 Notificaciones del Navegador

Si quieres notificaciones del navegador:
1. El sistema pedirá permiso automáticamente
2. Click en "Permitir" cuando el navegador pregunte
3. Las notificaciones aparecerán incluso con la pestaña en segundo plano

Para desactivarlas:
- Configuración del navegador → Permisos de sitio → Notificaciones

## 🎯 Checklist Final

Antes de considerar que todo está funcionando:

- [ ] Migración de BD ejecutada sin errores
- [ ] Backend inicia sin errores de compilación  
- [ ] Frontend inicia y no hay errores en consola
- [ ] Puedes crear un pedido completo
- [ ] La campana 🔔 aparece en AdminPanel
- [ ] El contador de notificaciones funciona
- [ ] Puedes marcar notificaciones como leídas
- [ ] El dropdown de la campana se abre correctamente
- [ ] El tab de notificaciones muestra la lista completa

## 🎉 Todo Listo

Si todos los checks están ✅, el sistema está completamente funcional.

---

**Archivos de Documentación:**
- `SISTEMA_NOTIFICACIONES.md` - Documentación completa
- `INICIO_RAPIDO_NOTIFICACIONES.md` - Guía de inicio rápido
- Este archivo - Solución de problemas

**Contacto:** Si encuentras algún problema no documentado aquí, revisa los logs del backend y la consola del navegador.
