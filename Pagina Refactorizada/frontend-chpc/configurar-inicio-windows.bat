@echo off
REM ========================================
REM Configurador de Inicio Automático
REM Este script crea un acceso directo en la
REM carpeta de inicio de Windows
REM ========================================

echo.
echo ====================================
echo   CONFIGURAR INICIO AUTOMATICO
echo ====================================
echo.

REM Verificar permisos de administrador
net session >nul 2>&1
if errorlevel 1 (
    echo ADVERTENCIA: Este script necesita permisos de administrador
    echo para algunas operaciones. Puede continuar sin ellos.
    echo.
)

REM Obtener la ruta del script actual
set "SCRIPT_DIR=%~dp0"
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SHORTCUT_NAME=CHPC Proyecto Completo.lnk"
set "TARGET_SCRIPT=%SCRIPT_DIR%iniciar-proyecto-completo.bat"

echo Configuracion:
echo - Carpeta de Inicio: %STARTUP_FOLDER%
echo - Script objetivo: %TARGET_SCRIPT%
echo.

REM Verificar que el script principal existe
if not exist "%TARGET_SCRIPT%" (
    echo ERROR: No se encuentra el archivo iniciar-proyecto-completo.bat
    echo Asegurese de que este script este en la misma carpeta.
    pause
    exit /b 1
)

echo Creando acceso directo en la carpeta de Inicio...
echo.

REM Crear el acceso directo usando PowerShell
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%STARTUP_FOLDER%\%SHORTCUT_NAME%'); $Shortcut.TargetPath = '%TARGET_SCRIPT%'; $Shortcut.WorkingDirectory = '%SCRIPT_DIR%'; $Shortcut.Description = 'Inicia automaticamente el proyecto CHPC (Backend y Frontend)'; $Shortcut.Save()"

if errorlevel 1 (
    echo ERROR: No se pudo crear el acceso directo
    echo Intente ejecutar este script como Administrador
    pause
    exit /b 1
)

echo.
echo ====================================
echo   CONFIGURACION COMPLETADA
echo ====================================
echo.
echo El acceso directo ha sido creado en:
echo %STARTUP_FOLDER%
echo.
echo A partir del proximo inicio de Windows, el proyecto
echo se ejecutara automaticamente.
echo.
echo IMPORTANTE:
echo - Asegurese de que las dependencias esten instaladas
echo - El backend y frontend se iniciaran en modo desarrollo
echo - Se abriran dos ventanas de terminal
echo.
echo Para DESACTIVAR el inicio automatico:
echo 1. Presiona Win + R
echo 2. Escribe: shell:startup
echo 3. Elimina el archivo "%SHORTCUT_NAME%"
echo.
echo ====================================
echo.

pause
