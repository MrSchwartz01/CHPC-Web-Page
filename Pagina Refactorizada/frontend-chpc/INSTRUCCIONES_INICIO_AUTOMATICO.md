# 🚀 Guía de Inicio Automático - Proyecto CHPC

## 📋 Archivos Creados

### 1. `iniciar-proyecto-completo.bat`
Script principal que inicia el backend y frontend simultáneamente.

### 2. `configurar-inicio-windows.bat`
Script que configura el inicio automático en Windows.

---

## 🔧 Instalación y Configuración

### Opción A: Inicio Manual (Recomendado para desarrollo)

1. **Doble clic en** `iniciar-proyecto-completo.bat`
2. Se abrirán dos ventanas:
   - 🟢 **Backend (NestJS)** - Puerto 5000
   - 🔵 **Frontend (Vue.js)** - Puerto 8080

### Opción B: Inicio Automático al encender Windows

#### Paso 1: Ejecutar el configurador
1. **Clic derecho** en `configurar-inicio-windows.bat`
2. Seleccionar **"Ejecutar como administrador"**
3. Seguir las instrucciones en pantalla

#### Paso 2: Verificar la configuración
1. Presiona `Win + R`
2. Escribe: `shell:startup`
3. Verifica que aparezca el acceso directo **"CHPC Proyecto Completo"**

---

## ⚙️ Requisitos Previos

Antes de usar los scripts, asegúrate de:

### ✅ Verificar que Node.js esté instalado
```bash
node --version
npm --version
```

### ✅ Instalar dependencias (Primera vez)

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
npm install
```

### ✅ Configurar variables de entorno
- Backend: Verificar archivo `.env` en `/backend`
- Frontend: Verificar configuración de API

---

## 🎮 Uso de los Scripts

### Iniciar manualmente el proyecto completo:
```bash
# Opción 1: Doble clic en el archivo
iniciar-proyecto-completo.bat

# Opción 2: Desde terminal
.\iniciar-proyecto-completo.bat
```

### Configurar inicio automático:
```bash
# Ejecutar como administrador
.\configurar-inicio-windows.bat
```

---

## 🛑 Detener los Servidores

### Método 1: Cerrar las ventanas
Simplemente cierra las ventanas de terminal que se abrieron:
- "CHPC Backend - NestJS"
- "CHPC Frontend - Vue.js"

### Método 2: Usando Ctrl+C
En cada ventana, presiona `Ctrl + C` para detener el servidor.

---

## 🔧 Personalización

### Cambiar puertos

#### Backend (puerto 5000):
Edita `backend/.env`:
```env
PORT=5000
```

#### Frontend (puerto 8080):
Edita `vue.config.js`:
```javascript
module.exports = {
  devServer: {
    port: 8080
  }
}
```

### Modificar el script de inicio

Edita `iniciar-proyecto-completo.bat` para:
- Cambiar los comandos de inicio
- Agregar más validaciones
- Modificar los mensajes

---

## 🚫 Desactivar el Inicio Automático

### Método 1: Manual
1. Presiona `Win + R`
2. Escribe: `shell:startup`
3. Elimina el archivo **"CHPC Proyecto Completo.lnk"**

### Método 2: Desde Administrador de Tareas
1. Abre el **Administrador de Tareas** (`Ctrl + Shift + Esc`)
2. Ve a la pestaña **"Inicio"**
3. Busca **"CHPC Proyecto Completo"**
4. Clic derecho → **"Deshabilitar"**

---

## ⚠️ Solución de Problemas

### ❌ Error: "Node.js no está instalado"
**Solución:** Instala Node.js desde https://nodejs.org/

### ❌ Error: "npm no está instalado"
**Solución:** Reinstala Node.js (npm viene incluido)

### ❌ Error: "Puerto ya en uso"
**Solución:** 
1. Cierra otras instancias del servidor
2. O cambia el puerto en la configuración

#### Matar procesos en puertos específicos:
```bash
# Backend (puerto 5000)
netstat -ano | findstr :5000
taskkill /PID [número_proceso] /F

# Frontend (puerto 8080)
netstat -ano | findstr :8080
taskkill /PID [número_proceso] /F
```

### ❌ El script no se ejecuta al inicio de Windows
**Soluciones:**
1. Verifica que el acceso directo esté en `shell:startup`
2. Ejecuta `configurar-inicio-windows.bat` como administrador
3. Verifica que las rutas sean correctas

### ❌ Las ventanas se cierran inmediatamente
**Solución:** 
1. Verifica que las dependencias estén instaladas
2. Ejecuta manualmente para ver los errores:
   ```bash
   cd backend
   npm run start:dev
   ```

---

## 📝 Notas Importantes

### ⚡ Rendimiento
- El inicio automático puede ralentizar el arranque de Windows
- Se recomienda solo si trabajas con el proyecto diariamente
- Los procesos consumen memoria RAM (~500MB total)

### 🔒 Seguridad
- No uses inicio automático en producción
- Solo para entornos de desarrollo local
- Asegúrate de tener contraseñas seguras en `.env`

### 💾 Recursos del Sistema
- **Backend**: ~200-300 MB RAM
- **Frontend**: ~200-300 MB RAM
- **Total aproximado**: 500-600 MB RAM

---

## 📚 Estructura de Archivos

```
frontend-chpc/
│
├── iniciar-proyecto-completo.bat       # Script principal
├── configurar-inicio-windows.bat      # Configurador de inicio
├── INSTRUCCIONES_INICIO_AUTOMATICO.md # Este archivo
│
├── backend/
│   ├── package.json
│   ├── .env
│   └── src/
│
└── [otros archivos del frontend]
```

---

## 🆘 Soporte

Si encuentras problemas:

1. **Revisa la consola** de las ventanas abiertas
2. **Verifica los logs** de errores
3. **Consulta la documentación** de NestJS y Vue.js
4. **Reinstala las dependencias** si es necesario

### Comandos útiles:
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar procesos Node.js activos
tasklist | findstr node
```

---

## ✅ Checklist de Verificación

Antes de usar los scripts, verifica:

- [ ] Node.js instalado (v14 o superior)
- [ ] npm instalado
- [ ] Dependencias del backend instaladas
- [ ] Dependencias del frontend instaladas
- [ ] Variables de entorno configuradas
- [ ] Puertos 5000 y 8080 disponibles
- [ ] Base de datos configurada (si aplica)

---

## 🎯 Comandos Rápidos

```bash
# Ver procesos Node.js
tasklist | findstr node

# Matar todos los procesos Node.js
taskkill /F /IM node.exe

# Ver puertos en uso
netstat -ano | findstr LISTENING

# Abrir carpeta de inicio de Windows
Win + R → shell:startup
```

---

## 📞 Contacto

Para más información sobre el proyecto CHPC, consulta:
- README.md principal del proyecto
- Documentación del backend
- Documentación del frontend

---

**Última actualización:** 19 de enero de 2026
