import os
from app import app, db
from models import Marca  # Asegúrate de importar el modelo Marca

# Ruta donde estarán almacenadas las imágenes (especificada)
static_folder = r"C:\Users\Contabilidad\PAGINA_CHPC_2\Backend_CHPC\static\logosmarcas"

# Asegurarse de que la carpeta existe
if not os.path.exists(static_folder):
    print(f"La carpeta {static_folder} no existe. Creándola...")
    os.makedirs(static_folder)

# Filtrar archivos válidos de imágenes
extensiones_imagenes = ('.png', '.jpg', '.jpeg', '.gif')

archivos = [
    archivo for archivo in os.listdir(static_folder)
    if archivo.lower().endswith(extensiones_imagenes)
]

try:
    with app.app_context():
        # Obtener las URLs de imágenes ya existentes en la base de datos
        urls_existentes = {marca.imagen_url for marca in db.session.query(Marca.imagen_url).all()}
        
        # Identificar nuevos archivos para insertar
        nuevos_archivos = [archivo for archivo in archivos if f"/static/logosmarcas/{archivo}" not in urls_existentes]
        
        if nuevos_archivos:
            for archivo in nuevos_archivos:
                print(f"\nProcesando el archivo: {archivo}")
                
                # Solicitar datos al usuario
                try:
                    id_marca = int(input("Ingrese el ID de la marca a la que pertenece este archivo: "))
                    
                    # Validar que la marca exista
                    marca = db.session.query(Marca).filter_by(id=id_marca).first()
                    if not marca:
                        print(f"La marca con ID {id_marca} no existe. Saltando este archivo.")
                        continue
                    
                    # Crear la URL relativa para la base de datos
                    archivo_url = f"/static/logosmarcas/{archivo}"
                    
                    # Actualizar la marca con la URL de la imagen
                    marca.imagen_url = archivo_url
                    
                    # Actualizar en la base de datos
                    db.session.add(marca)
                
                except ValueError as e:
                    print(f"Entrada inválida: {e}. Saltando este archivo.")
                except Exception as e:
                    print(f"Error procesando el archivo '{archivo}': {e}")
            
            # Confirmar los cambios en la base de datos
            db.session.commit()
            print(f"\nSe han actualizado las imágenes para {len(nuevos_archivos)} marcas en la base de datos.")
        else:
            print("No hay nuevos archivos para insertar.")
except Exception as e:
    print(f"Error al procesar las entradas en Marca: {e}")