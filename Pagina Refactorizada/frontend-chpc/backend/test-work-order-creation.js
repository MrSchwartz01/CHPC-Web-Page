/**
 * Script para probar la creación de Work Orders
 * Ejecutar con: node test-work-order-creation.js
 */

const axios = require('axios');

const API_BASE = 'http://192.168.2.117:5000/api';
const TEST_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'; // Reemplazar con token válido

async function loginAndGetToken() {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@admin.com',
      password: 'admin123'
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message);
    return null;
  }
}

async function testWorkOrderCreation() {
  console.log('🧪 Iniciando pruebas de creación de Work Orders...\n');

  // 1. Obtener token de autenticación
  console.log('1️⃣ Obteniendo token de autenticación...');
  const token = await loginAndGetToken();
  
  if (!token) {
    console.error('❌ No se pudo obtener token. Asegúrese de que el backend esté ejecutándose.');
    return;
  }
  
  console.log('✅ Token obtenido exitosamente\n');

  // 2. Datos de prueba
  const testData = {
    cliente_nombre: 'Juan Pérez Test',
    cliente_telefono: '+1234567890',
    cliente_email: 'juan.test@example.com',
    marca_equipo: 'HP',
    modelo_equipo: 'Pavilion 15',
    numero_serie: 'HP123456789',
    descripcion_problema: 'Laptop no enciende después de derramar líquido',
    costo_estimado: 150.00,
    estado: 'EN_ESPERA'
  };

  console.log('2️⃣ Datos de prueba:', JSON.stringify(testData, null, 2));

  // 3. Crear Work Order
  try {
    console.log('\n3️⃣ Creando Work Order...');
    
    const response = await axios.post(`${API_BASE}/work-orders`, testData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Work Order creada exitosamente!');
    console.log('📄 Respuesta del servidor:');
    console.log(JSON.stringify(response.data, null, 2));

    // 4. Verificar que se puede consultar la orden creada
    const trackingId = response.data.trackingId;
    console.log(`\n4️⃣ Verificando Work Order con tracking ID: ${trackingId}`);
    
    const getResponse = await axios.get(`${API_BASE}/work-orders/tracking/${trackingId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ Work Order recuperada exitosamente!');
    console.log('📋 Datos recuperados:');
    console.log(JSON.stringify(getResponse.data, null, 2));

  } catch (error) {
    console.error('❌ Error al crear Work Order:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message || error.message);
    console.error('Data:', error.response?.data);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Sugerencia: Verificar que el token sea válido');
    } else if (error.response?.status === 403) {
      console.log('\n💡 Sugerencia: Verificar que el usuario tenga permisos (administrador/técnico)');
    } else if (error.response?.status === 500) {
      console.log('\n💡 Sugerencia: Verificar la base de datos y logs del servidor');
    }
  }
}

async function testApiConnection() {
  console.log('🔗 Probando conexión con la API...');
  
  try {
    const response = await axios.get(`${API_BASE}/health`, { timeout: 5000 });
    console.log('✅ API disponible');
    return true;
  } catch (error) {
    console.log('❌ API no disponible:', error.message);
    console.log('💡 Asegúrese de que el backend esté ejecutándose en:', API_BASE);
    return false;
  }
}

// Ejecutar pruebas
async function main() {
  console.log('🚀 Test de Work Orders - CHPC\n');
  
  const apiAvailable = await testApiConnection();
  
  if (apiAvailable) {
    await testWorkOrderCreation();
  }
  
  console.log('\n🏁 Pruebas completadas');
}

main().catch(console.error);