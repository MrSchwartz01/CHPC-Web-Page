# 📧 Configuración de Outlook para Nodemailer (documento legado)

> ⚠️ Nota: Actualmente el proyecto está configurado y pensado para usar **Gmail** como proveedor principal de SMTP.
> Este archivo se mantiene solo como referencia histórica por si en el futuro se necesita reconfigurar Outlook.

## 🎯 Paso a Paso - Configuración de Outlook

### Opción 1: Sin Autenticación de 2 Pasos (Más Simple)

Si **NO** tienes activada la autenticación de 2 pasos en tu cuenta de Outlook:

#### 1. Editar el archivo .env

```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=tu-email@outlook.com
MAIL_PASSWORD=tu-contraseña-normal
MAIL_FROM=tu-email@outlook.com
MAIL_FROM_NAME=CHPC
```

#### 2. Permitir aplicaciones menos seguras (si es necesario)

1. Ve a: https://account.live.com/proofs/manage/additional
2. En "Seguridad adicional" → "Más opciones de seguridad"
3. Desactiva "Solo permitir aplicaciones que usen un inicio de sesión moderno"

⚠️ **Nota:** Outlook puede bloquear este método por seguridad.

---

### Opción 2: Con Autenticación de 2 Pasos (Recomendado)

Si **SÍ** tienes autenticación de 2 pasos (o Outlook bloquea la opción 1):

#### 1. Generar Contraseña de Aplicación

**Paso A:** Ve a tu cuenta de Microsoft
```
https://account.microsoft.com/security
```

**Paso B:** Activa la verificación en dos pasos (si no está activada)
- Ve a "Opciones de seguridad avanzadas"
- Activa "Verificación en dos pasos"

**Paso C:** Crear contraseña de aplicación
1. En la misma página, busca "Contraseñas de aplicación"
2. Haz clic en "Crear una nueva contraseña de aplicación"
3. Aparecerá una contraseña de 16 caracteres
4. **Cópiala inmediatamente** (no podrás verla de nuevo)

Ejemplo: `abcd efgh ijkl mnop`

#### 2. Configurar .env con la contraseña de aplicación

```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=tu-email@outlook.com
MAIL_PASSWORD=abcdefghijklmnop
MAIL_FROM=tu-email@outlook.com
MAIL_FROM_NAME=CHPC
```

⚠️ **Importante:** La contraseña de aplicación NO tiene espacios cuando la copies al .env

---

## 📝 Configuración Completa del .env

```env
# Outlook/Hotmail
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=miempresa@outlook.com
MAIL_PASSWORD=abcdefghijklmnop
MAIL_FROM=miempresa@outlook.com
MAIL_FROM_NAME=CHPC
```

---

## 🌐 Dominios Compatibles

Outlook soporta múltiples dominios:
- ✅ @outlook.com
- ✅ @hotmail.com
- ✅ @live.com
- ✅ @msn.com
- ✅ Dominios personalizados configurados con Microsoft 365

---

## 🧪 Probar la Configuración

Después de configurar, reinicia el servidor:

```powershell
npm run start:dev
```

Luego crea un pedido desde el frontend para probar el envío de emails.

---

## ⚠️ Problemas Comunes

### Error: "Invalid login: 535 5.7.3 Authentication unsuccessful"

**Causas posibles:**
1. Email o contraseña incorrectos
2. Autenticación de 2 pasos activada pero no usaste contraseña de aplicación
3. Outlook bloqueó el acceso por seguridad

**Soluciones:**
1. Verifica que el email sea correcto
2. Crea una contraseña de aplicación
3. Ve a: https://account.microsoft.com/activity
   - Revisa si hay "Actividades recientes"
   - Aprueba el acceso si Outlook lo bloqueó

### Error: "Connection timeout"

**Solución:**
```env
MAIL_PORT=587  # No uses 465
MAIL_SECURE=false  # Debe ser false para puerto 587
```

### Error: "Self signed certificate"

**Solución temporal (solo desarrollo):**
Agrega en tu código:
```typescript
// En mail.module.ts, en transport:
tls: {
  rejectUnauthorized: false
}
```

### Los emails llegan a spam

**Soluciones:**
1. Verifica que el email tenga contenido no sospechoso
2. No envíes demasiados emails en poco tiempo
3. Pide al destinatario que marque como "No es spam"
4. En producción, considera usar Microsoft 365 con dominio propio

---

## 🔐 Seguridad - Mejores Prácticas

### ✅ Hacer:
- Usa contraseñas de aplicación
- Mantén `.env` en `.gitignore`
- Activa verificación en dos pasos
- Revisa actividad sospechosa regularmente

### ❌ No hacer:
- Compartir tu contraseña de aplicación
- Subir `.env` a repositorios públicos
- Usar la misma contraseña para múltiples servicios
- Deshabilitar todas las medidas de seguridad

---

## 📊 Límites de Envío

**Outlook/Hotmail (cuenta gratuita):**
- **Límite diario:** ~300 emails/día
- **Límite por email:** 100 destinatarios
- **Adjuntos:** Hasta 20 MB

**Microsoft 365 (cuenta empresarial):**
- **Límite diario:** ~10,000 emails/día
- **Límite por email:** 500 destinatarios
- **Adjuntos:** Hasta 150 MB

---

## 🚀 Alternativas Recomendadas para Producción

Si necesitas enviar muchos emails en producción:

### SendGrid (Recomendado)
```env
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USER=apikey
MAIL_PASSWORD=TU_SENDGRID_API_KEY
```
- 100 emails gratis/día
- Infraestructura robusta
- Buen rate de entrega

### Mailgun
```env
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USER=postmaster@tu-dominio.mailgun.org
MAIL_PASSWORD=TU_MAILGUN_PASSWORD
```

### Amazon SES
```env
MAIL_HOST=email-smtp.us-east-1.amazonaws.com
MAIL_PORT=587
MAIL_USER=TU_AWS_ACCESS_KEY_ID
MAIL_PASSWORD=TU_AWS_SECRET_ACCESS_KEY
```

---

## 🔍 Verificar Configuración

### Ver logs del servidor
Cuando envíes un email, deberías ver en la consola:
```
[MailService] Email enviado exitosamente a cliente@email.com
```

### Si hay error:
```
[MailService] Error al enviar email a cliente@email.com: [detalle del error]
```

---

## 📞 Enlaces Útiles

- **Cuenta Microsoft:** https://account.microsoft.com
- **Seguridad:** https://account.microsoft.com/security
- **Actividad reciente:** https://account.microsoft.com/activity
- **Contraseñas de aplicación:** https://account.live.com/proofs/manage/additional

---

## 🎯 Checklist de Configuración

- [ ] Email de Outlook válido
- [ ] Contraseña de aplicación generada (si usas 2FA)
- [ ] Variables en .env actualizadas
- [ ] Puerto 587 y SECURE=false
- [ ] Servidor reiniciado
- [ ] Prueba realizada creando un pedido
- [ ] Email recibido en bandeja de entrada

---

**¡Tu servicio de email con Outlook está listo!** 🎉

Para volver a la documentación principal: [SERVICIO_EMAIL_README.md](SERVICIO_EMAIL_README.md)
