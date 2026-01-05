# 🚀 Inicio Rápido - CHPC

## 📍 Configuración Actual

**IP Local:** `192.168.2.117`

## ⚡ Inicio Rápido (Recomendado)

### Opción 1: Script Automático

Ejecuta en PowerShell desde el directorio del frontend:

```powershell
.\iniciar-proyecto.ps1
```

Esto iniciará automáticamente:
- ✅ Backend en puerto 5000
- ✅ Frontend en puerto 8080

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
npm run serve
```

## 🌐 URLs de Acceso

### Desde esta máquina:
- Frontend: http://localhost:8080
- Backend: http://localhost:5000/api
- Swagger: http://localhost:5000/api/docs

### Desde otros equipos en la red:
- Frontend: http://192.168.2.117:8080
- Backend: http://192.168.2.117:5000/api
- Swagger: http://192.168.2.117:5000/api/docs

## 🔧 Verificar Configuración

Ejecuta el script de verificación:

```powershell
.\verificar-red.ps1
```

Mostrará:
- ✅ Estado de puertos
- ✅ Configuración de firewall
- ✅ Archivos .env
- ✅ IP actual

## 🛡️ Configurar Firewall (Primera vez)

**Ejecuta como Administrador:**

```powershell
cd backend
.\configurar-firewall.ps1
```

Esto permitirá que otros equipos en tu red accedan al backend.

## 📝 Archivos de Configuración

### Frontend (.env)
```env
VUE_APP_API_URL=http://192.168.2.117:5000/api
```

### Backend (.env)
```env
CORS_ORIGIN=http://localhost:8080,http://127.0.0.1:8080,http://192.168.2.117:8080,*
```

## 🔍 Troubleshooting

### Backend no inicia
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

### Frontend no conecta al backend
1. Verifica que `.env` existe y tiene `VUE_APP_API_URL=http://192.168.2.117:5000/api`
2. Reinicia el frontend después de cambiar `.env`
3. Accede usando `http://192.168.2.117:8080` (no localhost desde otro equipo)

### Error de conexión desde otro equipo
1. Verifica que el firewall esté configurado: `.\backend\configurar-firewall.ps1`
2. Verifica que ambos equipos estén en la misma red
3. Prueba la conexión: `http://192.168.2.117:5000/api/auth/verificar`

## 📚 Documentación Adicional

- [Acceso Red Local](ACCESO_RED_LOCAL.md) - Guía completa de configuración de red
- [Panel Vendedores](PANEL_VENDEDORES_README.md) - Gestión de pedidos
- [Sistema Email](SERVICIO_EMAIL_README.md) - Configuración de notificaciones
- [Notificaciones](SISTEMA_NOTIFICACIONES.md) - Sistema de notificaciones en tiempo real

## 🔑 Usuarios por Defecto

Consulta la documentación del backend para crear usuarios admin/vendedor:
```bash
cd backend
npm run create-admin
npm run create-vendedor
```
