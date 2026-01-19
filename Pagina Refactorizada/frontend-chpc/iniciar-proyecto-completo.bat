@echo off
REM ========================================
REM Script de inicio automático CHPC Web
REM Inicia Backend y Frontend simultáneamente
REM ========================================

echo.
echo ====================================
echo   INICIANDO PROYECTO CHPC WEB
echo ====================================
echo.

REM Obtener la ruta del script actual
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

REM Colores para mejor visualización (opcional)
color 0A

echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    echo Por favor instale Node.js desde https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js detectado correctamente
echo.

echo [2/4] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm no esta instalado
    pause
    exit /b 1
)
echo npm detectado correctamente
echo.

echo [3/4] Iniciando BACKEND en nueva ventana...
echo Ruta: %SCRIPT_DIR%backend
start "CHPC Backend - NestJS" cmd /k "cd /d "%SCRIPT_DIR%backend" && echo Iniciando Backend en modo desarrollo... && npm run start:dev"

REM Esperar 3 segundos antes de iniciar el frontend
timeout /t 3 /nobreak >nul

echo [4/4] Iniciando FRONTEND en nueva ventana...
echo Ruta: %SCRIPT_DIR%
start "CHPC Frontend - Vue.js" cmd /k "cd /d "%SCRIPT_DIR%" && echo Iniciando Frontend en modo desarrollo... && npm run serve"

echo.
echo ====================================
echo   PROYECTO INICIADO CORRECTAMENTE
echo ====================================
echo.
echo Backend: http://localhost:5000 (o puerto configurado)
echo Frontend: http://localhost:8080 (o puerto configurado)
echo.
echo Las ventanas del Backend y Frontend se han abierto.
echo Puedes cerrar esta ventana de forma segura.
echo.
echo Para detener los servidores, cierra las ventanas
echo "CHPC Backend" y "CHPC Frontend"
echo ====================================
echo.

REM Esperar 5 segundos antes de cerrar
timeout /t 5

REM Salir sin cerrar (para que el usuario pueda ver los mensajes)
REM Si prefieres que se cierre automáticamente, descomenta la siguiente línea:
REM exit
