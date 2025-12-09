import os
from app import app, db
from models import Media, Producto  # Asegúrate de importar el modelo Producto si lo necesitas

# Ruta donde están almacenados los archivos (dentro de 'static/AimaPro')
static_folder = os.path.join(app.root_path, 'static', 'AimaPro')

# Asegurarse de que la carpeta existe
if not os.path.exists(static_folder):
    print(f"La carpeta {static_folder} no existe. Creándola...")
    os.makedirs(static_folder)

# Filtrar archivos válidos de imágenes y videos
extensiones_imagenes = ('.png', '.jpg', '.jpeg', '.gif')
extensiones_videos = ('.mp4', '.avi', '.mov', '.mkv')

archivos = [
    archivo for archivo in os.listdir(static_folder)
    if archivo.lower().endswith(extensiones_imagenes + extensiones_videos)
]

try:
    with app.app_context():
        # Obtener las URLs de archivos ya existentes en la base de datos
        urls_existentes = {media.url for media in db.session.query(Media.url).all()}
        
        # Identificar nuevos archivos para insertar
        nuevos_archivos = [archivo for archivo in archivos if f"/AimaPro/{archivo}" not in urls_existentes]
        
        if nuevos_archivos:
            for archivo in nuevos_archivos:
                print(f"\nProcesando el archivo: {archivo}")
                
                # Solicitar datos al usuario
                try:
                    id_producto = int(input("Ingrese el ID del producto al que pertenece este archivo: "))
                    
                    # Validar que el producto exista
                    producto = db.session.query(Producto).filter_by(id=id_producto).first()
                    if not producto:
                        print(f"El producto con ID {id_producto} no existe. Saltando este archivo.")
                        continue
                    
                    # Determinar el tipo de media basado en la extensión
                    if archivo.lower().endswith(extensiones_imagenes):
                        tipo_media = "imagen"
                    elif archivo.lower().endswith(extensiones_videos):
                        tipo_media = "video"
                    else:
                        print(f"Archivo {archivo} no reconocido como imagen o video. Saltando.")
                        continue
                    
                    descripcion = input(f"Ingrese una descripción para '{archivo}' (opcional): ").strip() or None
                    orden = input(f"Ingrese el orden para '{archivo}' (opcional, predeterminado 0): ").strip()
                    orden = int(orden) if orden.isdigit() else 0

                    # Crear la URL relativa para la base de datos
                    archivo_url = f"/AimaPro/{archivo}"
                    
                    # Crear un nuevo registro de media
                    nuevo_media = Media(
                        id_producto=id_producto,
                        tipo_media=tipo_media,
                        url=archivo_url,
                        descripcion=descripcion,
                        orden=orden
                    )
                    
                    # Insertar en la base de datos
                    db.session.add(nuevo_media)
                
                except ValueError as e:
                    print(f"Entrada inválida: {e}. Saltando este archivo.")
                except Exception as e:
                    print(f"Error procesando el archivo '{archivo}': {e}")
            
            # Confirmar los cambios en la base de datos
            db.session.commit()
            print(f"\nSe han insertado {len(nuevos_archivos)} nuevos archivos en la base de datos.")
        else:
            print("No hay nuevos archivos para insertar.")
except Exception as e:
    print(f"Error al procesar las entradas en Media: {e}")
