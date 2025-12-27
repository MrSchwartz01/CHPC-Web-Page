const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const productos = [
  // 1-5: Smartphones
  {
    nombre_producto: 'iPhone 15 Pro',
    descripcion: 'Smartphone Apple con chip A17 Pro, cámara triple de 48MP, Dynamic Island y USB-C',
    precio: 1199.99,
    stock: 45,
    imagen_url: 'https://example.com/images/iphone15-pro.jpg',
    marca: 'Apple',
    color: 'Titanio Natural'
    // erpId: 'PROD-APP-001'
  },
  {
    nombre_producto: 'Samsung Galaxy S24 Ultra',
    descripcion: 'Teléfono con pantalla Dynamic AMOLED 2X, S Pen integrado, cámara de 200MP y AI integrada',
    precio: 1299.99,
    stock: 38,
    imagen_url: 'https://example.com/images/s24-ultra.jpg',
    marca: 'Samsung',
    color: 'Titanio Negro'
    // erpId: 'PROD-SAM-001'
  },
  {
    nombre_producto: 'Google Pixel 8 Pro',
    descripcion: 'Smartphone con Tensor G3, cámara con zoom óptico 5x, temperatura corporal y 7 años de updates',
    precio: 999.00,
    stock: 52,
    imagen_url: 'https://example.com/images/pixel8-pro.jpg',
    marca: 'Google',
    color: 'Obsidiana'
    // erpId: 'PROD-GOO-001'
  },
  {
    nombre_producto: 'OnePlus 12',
    descripcion: 'Pantalla LTPO 120Hz, Snapdragon 8 Gen 3, carga rápida de 100W, cámara Hasselblad',
    precio: 799.99,
    stock: 67,
    imagen_url: 'https://example.com/images/oneplus12.jpg',
    marca: 'OnePlus',
    color: 'Verde Bosque'
    // erpId: 'PROD-ONE-001'
  },
  {
    nombre_producto: 'Xiaomi 14 Ultra',
    descripcion: 'Cámara Leica quad de 50MP, Snapdragon 8 Gen 3, batería de 5300mAh con carga 90W',
    precio: 1099.00,
    stock: 42,
    imagen_url: 'https://example.com/images/xiaomi14-ultra.jpg',
    marca: 'Xiaomi',
    color: 'Blanco'
    // erpId: 'PROD-XIA-001'
  },
  // 6-10: Laptops
  {
    nombre_producto: 'MacBook Pro 16" M3 Max',
    descripcion: 'Laptop profesional con chip M3 Max, 48GB RAM, SSD 1TB, pantalla Liquid Retina XDR',
    precio: 3499.00,
    stock: 22,
    imagen_url: 'https://example.com/images/macbook-pro-16.jpg',
    marca: 'Apple',
    color: 'Gris Espacial'
    // erpId: 'PROD-APP-002'
  },
  {
    nombre_producto: 'Dell XPS 15',
    descripcion: 'Laptop creativa con Intel Core i9, RTX 4070, pantalla OLED 3.5K InfinityEdge',
    precio: 2499.99,
    stock: 35,
    imagen_url: 'https://example.com/images/dell-xps15.jpg',
    marca: 'Dell',
    color: 'Plata'
    // erpId: 'PROD-DEL-001'
  },
  {
    nombre_producto: 'Microsoft Surface Laptop Studio 2',
    descripcion: 'Convertible con Intel Core i7, RTX 4060, pantalla táctil PixelSense Flow de 120Hz',
    precio: 2199.00,
    stock: 28,
    imagen_url: 'https://example.com/images/surface-studio2.jpg',
    marca: 'Microsoft',
    color: 'Platino'
    // erpId: 'PROD-MIC-001'
  },
  {
    nombre_producto: 'Asus ROG Zephyrus G16',
    descripcion: 'Gaming laptop con Intel Core Ultra 9, RTX 4090, pantalla Nebula HDR OLED 240Hz',
    precio: 2999.99,
    stock: 18,
    imagen_url: 'https://example.com/images/rog-zephyrus.jpg',
    marca: 'Asus',
    color: 'Luna Gris'
    // erpId: 'PROD-ASU-001'
  },
  {
    nombre_producto: 'Lenovo Yoga 9i',
    descripcion: 'Convertible 2-en-1 con Intel Core i7, pantalla OLED 4K, sonido Bowers & Wilkins',
    precio: 1799.00,
    stock: 41,
    imagen_url: 'https://example.com/images/yoga9i.jpg',
    marca: 'Lenovo',
    color: 'Peltre'
    // erpId: 'PROD-LEN-001'
  },
  // 11-15: Tablets
  {
    nombre_producto: 'iPad Pro 12.9" M2',
    descripcion: 'Tablet con chip M2, pantalla Liquid Retina XDR, compatible con Apple Pencil 2',
    precio: 1099.00,
    stock: 58,
    imagen_url: 'https://example.com/images/ipad-pro.jpg',
    marca: 'Apple',
    color: 'Gris Espacial'
    // erpId: 'PROD-APP-003'
  },
  {
    nombre_producto: 'Samsung Galaxy Tab S9 Ultra',
    descripcion: 'Tablet con Snapdragon 8 Gen 2, S Pen incluido, pantalla Dynamic AMOLED 2X 14.6"',
    precio: 1199.99,
    stock: 39,
    imagen_url: 'https://example.com/images/tabs9-ultra.jpg',
    marca: 'Samsung',
    color: 'Grafito'
    // erpId: 'PROD-SAM-002'
  },
  {
    nombre_producto: 'Microsoft Surface Pro 10',
    descripcion: 'Tablet convertible con Intel Core Ultra, Windows 11, compatible con Surface Pen',
    precio: 1299.00,
    stock: 33,
    imagen_url: 'https://example.com/images/surface-pro10.jpg',
    marca: 'Microsoft',
    color: 'Negro'
    // erpId: 'PROD-MIC-002'
  },
  {
    nombre_producto: 'Amazon Fire Max 11',
    descripcion: 'Tablet económica con pantalla de 11", 4GB RAM, soporte para lápiz opcional',
    precio: 229.99,
    stock: 120,
    imagen_url: 'https://example.com/images/fire-max11.jpg',
    marca: 'Amazon',
    color: 'Negro Pizarra'
    // erpId: 'PROD-AMA-001'
  },
  {
    nombre_producto: 'Xiaomi Pad 6 Max',
    descripcion: 'Tablet de 14" con Snapdragon 8+ Gen 1, pantalla LCD 120Hz, 10000mAh batería',
    precio: 599.00,
    stock: 47,
    imagen_url: 'https://example.com/images/xiaomi-pad6max.jpg',
    marca: 'Xiaomi',
    color: 'Negro'
    // erpId: 'PROD-XIA-002'
  },
  // 16-20: Wearables
  {
    nombre_producto: 'Apple Watch Ultra 2',
    descripcion: 'Reloj inteligente con doble GPS, resistencia 100m, batería de 36 horas',
    precio: 799.00,
    stock: 62,
    imagen_url: 'https://example.com/images/watch-ultra2.jpg',
    marca: 'Apple',
    color: 'Titanio'
    // erpId: 'PROD-APP-004'
  },
  {
    nombre_producto: 'Samsung Galaxy Watch 6 Classic',
    descripcion: 'Smartwatch con bisel rotatorio, Wear OS, monitorización de sueño avanzada',
    precio: 369.99,
    stock: 75,
    imagen_url: 'https://example.com/images/watch6-classic.jpg',
    marca: 'Samsung',
    color: 'Negro'
    // erpId: 'PROD-SAM-003'
  },
  {
    nombre_producto: 'Google Pixel Watch 2',
    descripcion: 'Reloj con Wear OS, Fitbit integrado, chip Snapdragon W5, 24h batería',
    precio: 349.99,
    stock: 68,
    imagen_url: 'https://example.com/images/pixel-watch2.jpg',
    marca: 'Google',
    color: 'Obsidiana'
    // erpId: 'PROD-GOO-002'
  },
  {
    nombre_producto: 'Fitbit Charge 6',
    descripcion: 'Monitor de actividad con GPS, ECG, Spotify control y 7 días de batería',
    precio: 159.95,
    stock: 110,
    imagen_url: 'https://example.com/images/fitbit-charge6.jpg',
    marca: 'Fitbit',
    color: 'Negro Grafito'
    // erpId: 'PROD-FIT-001'
  },
  {
    nombre_producto: 'Garmin Epix Pro (Gen 2)',
    descripcion: 'Reloj deportivo con pantalla AMOLED, mapas topográficos, batería de 16 días',
    precio: 899.99,
    stock: 29,
    imagen_url: 'https://example.com/images/garmin-epix.jpg',
    marca: 'Garmin',
    color: 'Carbono Gris'
    // erpId: 'PROD-GAR-001'
  },
  // 21-26: Audio y Accesorios
  {
    nombre_producto: 'AirPods Pro (2da Gen)',
    descripcion: 'Audífonos inalámbricos con cancelación activa de ruido, audio espacial y MagSafe',
    precio: 249.00,
    stock: 95,
    imagen_url: 'https://example.com/images/airpods-pro2.jpg',
    marca: 'Apple',
    color: 'Blanco'
    // erpId: 'PROD-APP-005'
  },
  {
    nombre_producto: 'Sony WH-1000XM5',
    descripcion: 'Audífonos over-ear con cancelación de ruido líder, 30h batería, 8 micrófonos',
    precio: 399.99,
    stock: 54,
    imagen_url: 'https://example.com/images/sony-xm5.jpg',
    marca: 'Sony',
    color: 'Negro'
    // erpId: 'PROD-SON-001'
  },
  {
    nombre_producto: 'Meta Quest 3',
    descripcion: 'Headset de realidad mixta con Snapdragon XR2 Gen 2, 2.5x más potente que Quest 2',
    precio: 499.99,
    stock: 36,
    imagen_url: 'https://example.com/images/quest3.jpg',
    marca: 'Meta',
    color: 'Blanco'
    // erpId: 'PROD-MET-001'
  },
  {
    nombre_producto: 'PlayStation Portal',
    descripcion: 'Dispositivo remoto para jugar PS5 en cualquier lugar, pantalla LCD 8" 60Hz',
    precio: 199.99,
    stock: 41,
    imagen_url: 'https://example.com/images/ps-portal.jpg',
    marca: 'Sony',
    color: 'Blanco'
    // erpId: 'PROD-SON-002'
  },
  {
    nombre_producto: 'Logitech MX Master 3S',
    descripcion: 'Mouse inalámbrico avanzado para productividad, sensor 8K DPI, 70 días batería',
    precio: 99.99,
    stock: 82,
    imagen_url: 'https://example.com/images/mx-master3s.jpg',
    marca: 'Logitech',
    color: 'Gris Pálido'
    // erpId: 'PROD-LOG-001'
  },
  {
    nombre_producto: 'Nintendo Switch OLED',
    descripcion: 'Consola híbrida con pantalla OLED 7", 64GB almacenamiento, dock con LAN',
    precio: 349.99,
    stock: 57,
    imagen_url: 'https://example.com/images/switch-oled.jpg',
    marca: 'Nintendo',
    color: 'Blanco'
    // erpId: 'PROD-NIN-001'
  }
];

async function seedProducts() {
  try {
    console.log('📦 Iniciando inserción de productos...\n');

    for (const producto of productos) {
      const resultado = await prisma.product.create({
        data: producto
      });
      console.log(`✅ Producto creado: ${resultado.nombre_producto} (ID: ${resultado.id})`);
    }

    console.log(`\n✨ Se insertaron ${productos.length} productos exitosamente`);

    // Mostrar estadísticas
    const total = await prisma.product.count();
    console.log(`📊 Total de productos en la base de datos: ${total}`);

  } catch (error) {
    console.error('❌ Error al insertar productos:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
