# 🔐 Solución (legada): Habilitar Envío de Correos con Outlook

> ℹ️ Actualmente la aplicación está configurada para enviar correos con **Gmail** mediante contraseña de aplicación.
> Usa este documento solo si en algún momento decides volver a Outlook y necesitas diagnosticar errores específicos de ese proveedor.

## ❌ Problema Identificado

Microsoft Outlook tiene **deshabilitada la autenticación básica** por defecto. Error:
```
535 5.7.139 Authentication unsuccessful, basic authentication is disabled.
```

## ✅ Solución 1: Habilitar Autenticación Básica (Más Simple)

### Paso 1: Acceder a la Configuración de Seguridad

1. Ve a: https://account.live.com/proofs/manage/additional
2. Inicia sesión con `clickherepc2020@outlook.es`

### Paso 2: Habilitar "Aplicaciones Menos Seguras"

1. Busca la sección **"Seguridad de la cuenta"**
2. Busca la opción **"Autenticación básica"** o **"Aplicaciones menos seguras"**
3. **Actívala/Habilítala**

### Paso 3: Probar Conexión

Ejecuta en el backend:
```bash
cd backend
node test-email.js
```

---

## ✅ Solución 2: Usar Contraseña de Aplicación (Más Segura)

Si tienes autenticación de dos factores activada o si la Solución 1 no funciona:

### Paso 1: Crear Contraseña de Aplicación

1. Ve a: https://account.live.com/proofs/manage/additional
2. Inicia sesión
3. Busca **"Seguridad de la aplicación"** o **"App passwords"**
4. Clic en **"Crear nueva contraseña de aplicación"**
5. Dale un nombre: **"CHPC Backend"**
6. **Copia la contraseña generada** (algo como: `abcd efgh ijkl mnop`)

### Paso 2: Actualizar .env

Reemplaza en el archivo `.env` del backend:

**ANTES:**
```env
MAIL_PASSWORD=Taller2020.
```

**DESPUÉS:**
```env
MAIL_PASSWORD=abcd efgh ijkl mnop
```
*(Usa la contraseña de aplicación que copiaste)*

### Paso 3: Reiniciar Backend y Probar

```bash
# Detener el backend actual (Ctrl+C en su terminal)
# Iniciar nuevamente:
npm run start:dev

# Probar:
node test-email.js
```

---

## ✅ Solución 3: Usar Gmail en Lugar de Outlook

Si las anteriores no funcionan, puedes cambiar a Gmail:

### Paso 1: Crear Contraseña de Aplicación en Gmail

1. Ve a: https://myaccount.google.com/apppasswords
2. Inicia sesión en tu cuenta Gmail
3. Selecciona **"Correo"** y **"Windows"**
4. Clic en **"Generar"**
5. Copia la contraseña de 16 caracteres

### Paso 2: Actualizar .env

```env
# Gmail - Configuración
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=tu-email@gmail.com
MAIL_PASSWORD=tu-contraseña-de-aplicacion-de-16-digitos
MAIL_FROM=tu-email@gmail.com
MAIL_FROM_NAME=CHPC
```

---

## 🧪 Probar Configuración

Después de cualquier cambio:

```bash
cd backend
node test-email.js
```

Si ves:
```
✅ Conexión SMTP exitosa!
✅ Email enviado exitosamente!
```

¡El servicio de correo está funcionando!

---

## 📋 Resumen de Cambios Realizados

1. ✅ **Plantillas copiadas a dist** - Las plantillas `.hbs` ya están en `dist/mail/templates`
2. ✅ **Backend reiniciado** - Corriendo con las plantillas disponibles
3. ❌ **Autenticación Outlook bloqueada** - Necesitas habilitar autenticación básica o usar contraseña de aplicación

---

## 🔄 Siguiente Paso

**Elige una solución (1, 2 o 3) y aplícala.**

Una vez que tengas la autenticación configurada correctamente:

1. Registra un usuario nuevo en tu aplicación
2. El correo de bienvenida debería llegar automáticamente
3. Los correos de pedidos también funcionarán

---

## 📧 Correos que se Envían Automáticamente

Una vez configurado, tu aplicación enviará:

- ✉️ **Bienvenida** - Al registrar un usuario nuevo
- 📦 **Confirmación de pedido** - Al cliente cuando hace un pedido
- 🔔 **Notificación a admins** - Cuando hay un pedido nuevo
- 📊 **Asignación de pedido** - Al vendedor cuando se le asigna un pedido
- 🔄 **Cambio de estado** - Al cliente cuando cambia el estado de su pedido
