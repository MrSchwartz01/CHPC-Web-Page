# 🌐 Guía: Permitir Acceso desde Red Local

## ✅ Configuración Actual

**IP de tu máquina:** `192.168.2.117`

**URLs de acceso:**
- Desde esta máquina:
  - Frontend: `http://localhost:8080`
  - Backend: `http://localhost:5000/api`

- Desde otros equipos en la red:
  - Frontend: `http://192.168.2.117:8080`
  - Backend: `http://192.168.2.117:5000/api`

## Problema
Cuando intentas acceder al backend desde otro equipo en tu red local, recibes un error de "conexión rechazada" o CORS.

## ✅ Solución Implementada

### 1. Configuración de CORS
Se actualizó el archivo `.env` del backend para permitir conexiones desde cualquier IP de red local:

```env
# CORS - Permitir acceso desde red local
CORS_ORIGIN=*
```

**Nota:** En producción, deberías especificar las IPs permitidas exactas:
```env
CORS_ORIGIN=http://192.168.1.100:8080,http://192.168.1.101:8080
```

### 2. Configuración del Backend
El backend ya está configurado para escuchar en `0.0.0.0` (todas las interfaces de red) en el puerto 5000.

### 3. Configuración del Frontend
El frontend detecta automáticamente si se accede desde red local y usa la IP correcta para conectarse al backend. No necesitas cambiar nada.

## 📋 Pasos para Habilitar Acceso

### Paso 1: Configurar Firewall de Windows

**Opción A - Script Automático (Recomendado):**

1. Abre PowerShell **como Administrador**:
   - Busca "PowerShell" en el menú inicio
   - Clic derecho → "Ejecutar como administrador"

2. Navega al directorio del backend:
   ```powershell
   cd "C:\Users\Contabilidad\Documents\GitHub\CHPC-Web-Page\Pagina Refactorizada\frontend-chpc\backend"
   ```

3. Ejecuta el script:
   ```powershell
   .\configurar-firewall.ps1
   ```

**Opción B - Manual:**

1. Abre "Firewall de Windows Defender con seguridad avanzada"
2. Clic en "Reglas de entrada" → "Nueva regla"
3. Tipo de regla: **Puerto**
4. Protocolo: **TCP**, Puerto local específico: **5000**
5. Acción: **Permitir la conexión**
6. Perfiles: Marca **Dominio** y **Privado**
7. Nombre: "CHPC Backend - Puerto 5000"

### Paso 2: Verificar Configuración

Ejecuta el script de verificación:
```powershell
.\verificar-red.ps1
```

Este script te mostrará:
- Tu IP actual: `192.168.2.117`
- Estado de puertos (backend y frontend)
- Configuración de firewall
- Archivos .env configurados

### Paso 3: Iniciar Backend

En el directorio `backend`, ejecuta:
```bash
cd backend
npm run start:dev
```

El servidor te mostrará:
```
🚀 Servidor ejecutándose en:
   - Local: http://localhost:5000
   - Red Local: http://192.168.2.117:5000
```

### Paso 4: Iniciar Frontend

En el directorio raíz del proyecto:
```bash
npm run serve
```

El frontend estará disponible en:
```
App running at:
  - Local:   http://localhost:8080
  - Network: http://192.168.2.117:8080
```

### Paso 5: Acceder desde Otro Equipo

**En el equipo remoto:**

1. Abre el navegador
2. Accede a:
   ```
   http://192.168.2.117:8080
   ```

3. El frontend se conectará automáticamente al backend usando:
   ```
   http://192.168.2.117:5000/api
   ```

## 🔍 Verificar Conectividad

### Desde el Equipo Remoto:

1. **Probar conexión al backend:**
   ```
   http://192.168.2.117:5000/api/auth/verificar
   ```
   Deberías ver un error 401 (Unauthorized) - esto es normal y significa que el backend responde.

2. **Probar registro:**
   Ve a `http://192.168.2.117:8080` y navega a la página de registro para crear un usuario nuevo.

## 🚨 Problemas Comunes

### Error: "Connection refused" o "ERR_CONNECTION_REFUSED"

**Causa:** El firewall está bloqueando el puerto 5000.

**Solución:**
- Ejecuta el script `configurar-firewall.ps1` como Administrador
- Verifica que el backend esté corriendo
- Verifica que ambos equipos estén en la misma red

### Error: "CORS policy" en la consola del navegador

**Causa:** El backend no está permitiendo el origen.

**Solución:**
- Verifica que `CORS_ORIGIN=*` esté en el `.env`
- Reinicia el backend después de cambiar `.env`

### El frontend no puede conectarse al backend

**Causa:** El archivo `.env` no está configurado correctamente.

**Solución:**
- Verifica que el archivo `.env` en la raíz del frontend contenga:
  ```env
  VUE_APP_API_URL=http://192.168.2.117:5000/api
  ```
- Reinicia el frontend después de cambiar `.env`
- Asegúrate de acceder usando `http://192.168.2.117:8080` (no localhost)

### Ping funciona pero no puedo conectarme

**Causa:** El firewall permite ICMP (ping) pero bloquea TCP en puerto 5000.

**Solución:**
- Ejecuta el script de firewall
- Verifica que la regla se haya creado:
  ```powershell
  Get-NetFirewallRule -DisplayName "CHPC Backend*"
  ```

## 🔒 Seguridad

### Recomendaciones para Producción:

1. **Restringe CORS a IPs específicas:**
   ```env
   CORS_ORIGIN=http://localhost:8080,http://192.168.2.117:8080
   ```

2. **Usa HTTPS:**
   - Configura certificados SSL/TLS
   - Cambia `http://` por `https://`

3. **Restringe firewall a red local:**
   - Solo permite perfil "Privado", no "Público"

4. **Usa variables de entorno para IPs:**
   - No hardcodees IPs en el código
   - Usa archivos `.env` distintos por ambiente

## 📱 Verificación Final

Lista de verificación:
- [ ] Backend corriendo en `0.0.0.0:5000`
- [ ] CORS configurado en `.env` como `*` o IPs específicas
- [ ] Firewall permite puerto 5000 (regla creada)
- [ ] Accediendo al frontend desde IP (no localhost)
- [ ] Ambos equipos en la misma red local
- [ ] IP local identificada correctamente

Si todo está correcto, deberías poder registrar usuarios desde cualquier equipo en tu red local.
