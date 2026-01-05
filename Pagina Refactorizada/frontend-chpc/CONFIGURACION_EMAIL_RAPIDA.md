# ⚡ Guía Rápida - Configurar Nodemailer

## 🎯 Pasos Rápidos (5 minutos)

### 1️⃣ Configurar Gmail (Más fácil)

#### A. Activar autenticación de 2 pasos
1. Ve a https://myaccount.google.com/security
2. Activa "Verificación en dos pasos"

#### B. Generar contraseña de aplicación
1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona "Otra (nombre personalizado)"
3. Escribe "CHPC Backend"
4. Haz clic en "Generar"
5. **Copia la contraseña de 16 caracteres**

#### C. Editar .env
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=tu-email@gmail.com
MAIL_PASSWORD=abc def ghi jkl mnop  # La contraseña generada
MAIL_FROM=tu-email@gmail.com
MAIL_FROM_NAME=CHPC
```

### 2️⃣ Reiniciar el servidor
```powershell
cd "Pagina Refactorizada\frontend-chpc\backend"
npm run start:dev
```

### 3️⃣ Probar
1. Crear un pedido desde el frontend
2. Verificar email en tu bandeja de entrada
3. ✅ ¡Listo!

---

## 🔧 Alternativa: Mailtrap (Para testing)

Si solo quieres probar sin enviar emails reales:

1. Crea cuenta gratis en https://mailtrap.io
2. Ve a "Email Testing" → "SMTP Settings"
3. Copia las credenciales:

```env
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=tu-username-mailtrap
MAIL_PASSWORD=tu-password-mailtrap
MAIL_FROM=test@chpc.com
MAIL_FROM_NAME=CHPC
```

Los emails se capturan en Mailtrap, no llegan a destinatarios reales.

---

## ❌ Problemas Comunes

### "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solución:**
- Verifica que uses contraseña de aplicación (no tu contraseña normal)
- Activa verificación en 2 pasos primero

### "Connection timeout"

**Solución:**
```env
MAIL_PORT=587  # No 465
MAIL_SECURE=false  # No true
```

### Los emails van a spam

**Solución:**
- En producción, usa un servicio profesional (SendGrid)
- Marca el email como "No es spam"
- Verifica SPF/DKIM de tu dominio

---

## 🎯 Resumen

```
1. Gmail → Contraseña de aplicación
2. Copiar a .env
3. Reiniciar servidor
4. ¡Funciona!
```

**Tiempo total:** ~5 minutos

Para más detalles: [SERVICIO_EMAIL_README.md](SERVICIO_EMAIL_README.md)
