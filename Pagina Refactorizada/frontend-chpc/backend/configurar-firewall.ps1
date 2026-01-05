# Script para configurar el firewall de Windows para permitir acceso en red local
# Ejecutar como Administrador

Write-Host "[INFO] Configurando reglas de firewall para Backend CHPC..." -ForegroundColor Cyan
Write-Host ""

# Puerto del backend (ajustar si es diferente)
$puerto = 5000
$nombreRegla = "CHPC Backend - Puerto $puerto"

# Verificar si la regla ya existe
$reglaExistente = Get-NetFirewallRule -DisplayName $nombreRegla -ErrorAction SilentlyContinue

if ($reglaExistente) {
    Write-Host "[OK] La regla '$nombreRegla' ya existe" -ForegroundColor Green
    Write-Host "[INFO] Eliminando regla existente para recrearla..." -ForegroundColor Yellow
    Remove-NetFirewallRule -DisplayName $nombreRegla
}

# Crear nueva regla de entrada (Inbound)
try {
    New-NetFirewallRule -DisplayName $nombreRegla `
        -Direction Inbound `
        -Protocol TCP `
        -LocalPort $puerto `
        -Action Allow `
        -Profile Domain,Private `
        -Description "Permitir acceso al backend de CHPC en red local"
    
    Write-Host ""
    Write-Host "[OK] Regla de firewall creada exitosamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "[INFO] Configuracion completada:" -ForegroundColor Cyan
    Write-Host "  - Puerto: $puerto" -ForegroundColor White
    Write-Host "  - Perfiles: Dominio y Privado (red local)" -ForegroundColor White
    Write-Host "  - Direccion: Entrada (Inbound)" -ForegroundColor White
    Write-Host ""
    Write-Host "[INFO] Ahora otros equipos en tu red local pueden conectarse al backend" -ForegroundColor Green
    Write-Host ""
    
    # Mostrar la IP local
    $ipLocal = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Ethernet*","Wi-Fi*" | Where-Object {$_.PrefixOrigin -ne "WellKnown"}).IPAddress
    if ($ipLocal) {
        Write-Host "[INFO] Tu IP local es: $ipLocal" -ForegroundColor Cyan
        Write-Host "[INFO] Los otros equipos deben acceder a: http://${ipLocal}:${puerto}" -ForegroundColor Cyan
    }
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "[ERROR] No se pudo crear la regla de firewall" -ForegroundColor Red
    Write-Host "[ERROR] Detalles: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "[INFO] Posibles causas:" -ForegroundColor Yellow
    Write-Host "  1. No estas ejecutando PowerShell como Administrador" -ForegroundColor White
    Write-Host "  2. El firewall de Windows esta deshabilitado" -ForegroundColor White
    Write-Host ""
    Write-Host "[INFO] Para ejecutar como Administrador:" -ForegroundColor Yellow
    Write-Host "  - Clic derecho en PowerShell" -ForegroundColor White
    Write-Host "  - Seleccionar 'Ejecutar como administrador'" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "[OK] Configuracion completa!" -ForegroundColor Green
Write-Host ""
