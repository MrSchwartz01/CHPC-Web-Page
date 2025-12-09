import os
from app import app, db
from models import Banner

# Ruta donde están almacenadas las imágenes
static_folder = r'C:\Users\Contabilidad\PAGINA_CHPC_2\Backend_CHPC\static'

# Filtrar solo archivos de imágenes
imagenes = [img for img in os.listdir(static_folder) if img.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]

try:
    with app.app_context():
        # Obtener las URLs de imágenes ya existentes en la base de datos
        urls_existentes = {banner.imagen_url for banner in db.session.query(Banner.imagen_url).all()}
        
        nuevas_imagenes = [img for img in imagenes if f"/static/{img}" not in urls_existentes]
        
        if nuevas_imagenes:
            for idx, imagen in enumerate(nuevas_imagenes):
                # Crear la URL relativa para la base de datos
                imagen_url = f"/static/{imagen}"
                
                # Crear un nuevo banner
                nuevo_banner = Banner(
                    titulo=imagen.split('.')[0].replace('_', ' ').title(),
                    imagen_url=imagen_url,
                    orden=0,  # Ajusta según lo necesites
                    estado=True
                )
                
                # Insertar en la base de datos
                db.session.add(nuevo_banner)
            
            # Confirmar los cambios
            db.session.commit()
            print(f"Se han insertado {len(nuevas_imagenes)} nuevas imágenes en la base de datos.")
        else:
            print("No hay nuevas imágenes para insertar.")
except Exception as e:
    print(f"Error al procesar los banners: {e}")
