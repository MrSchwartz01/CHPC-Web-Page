from flask import Blueprint, jsonify, request
from models import db, Producto, Media, Reseña

bp = Blueprint('productos', __name__, url_prefix='/tienda/productos')

# Obtener todos los productos junto con sus imágenes, reseñas, categoría y marca
@bp.route('/', methods=['GET'])
def obtener_productos():
    try:
        marca_id = request.args.get('marca')
        search_query = request.args.get('search', '').strip()  # Obtener el parámetro de búsqueda

        # Filtrar productos por marca y/o búsqueda en nombre y descripción
        query = Producto.query
        if marca_id:
            query = query.filter(Producto.id_marca == marca_id)
        if search_query:
            # Buscar en nombre y descripción
            query = query.filter(
                db.or_(
                    Producto.nombre_producto.ilike(f"%{search_query}%"),
                    Producto.descripcion.ilike(f"%{search_query}%")
                )
            )

        productos = query.all()

        productos_data = []

        for producto in productos:
            # Obtener las imágenes asociadas al producto
            media_productos = Media.query.filter_by(id_producto=producto.id).all()
            media_data = [
                {
                    "id": media.id,
                    "tipo_media": media.tipo_media,
                    "url": media.url,
                    "descripcion": media.descripcion,
                    "orden": media.orden
                }
                for media in media_productos
            ]

            # Obtener las reseñas asociadas al producto
            reseñas_producto = Reseña.query.filter_by(id_producto=producto.id).all()
            reseñas_data = [
                {
                    "id": reseña.id,
                    "calificacion": reseña.calificacion,
                    "texto_resena": reseña.texto_resena,
                    "fecha_resena": reseña.fecha_resena.isoformat(),
                    "cliente": {
                        "id": reseña.id_cliente,
                        "nombre_usuario": reseña.cliente.nombre_usuario if reseña.cliente else "Anónimo"
                    }
                }
                for reseña in reseñas_producto
            ]

            # Construir el diccionario del producto
            producto_dict = {
                "id": producto.id,
                "nombre_producto": producto.nombre_producto,
                "descripcion": producto.descripcion,
                "precio": str(producto.precio),
                "stock": producto.stock,
                "peso": str(producto.peso),
                "color": producto.color,
                "volumen": str(producto.volumen) if producto.volumen else None,
                "categoria": {
                    "id": producto.categoria.id,
                    "nombre_categoria": producto.categoria.nombre_categoria,
                    "descripcion": producto.categoria.descripcion
                } if producto.categoria else None,
                "marca": {
                    "id": producto.marca.id,
                    "nombre_marca": producto.marca.nombre_marca,
                    "descripcion": producto.marca.descripcion,
                    "sitio_web": producto.marca.sitio_web
                } if producto.marca else None,
                "media": media_data,
                "reseñas": reseñas_data
            }
            productos_data.append(producto_dict)

        return jsonify(productos_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint dedicado para obtener productos por marca
@bp.route('/marca/<int:marca_id>', methods=['GET'])
def obtener_productos_por_marca(marca_id):
    try:
        productos = Producto.query.filter_by(id_marca=marca_id).all()

        productos_data = []

        for producto in productos:
            # Obtener las imágenes asociadas al producto
            media_productos = Media.query.filter_by(id_producto=producto.id).all()
            media_data = [
                {
                    "id": media.id,
                    "tipo_media": media.tipo_media,
                    "url": media.url,
                    "descripcion": media.descripcion,
                    "orden": media.orden
                }
                for media in media_productos
            ]

            # Construir el diccionario del producto
            producto_dict = {
                "id": producto.id,
                "nombre_producto": producto.nombre_producto,
                "descripcion": producto.descripcion,
                "precio": str(producto.precio),
                "stock": producto.stock,
                "media": media_data
            }
            productos_data.append(producto_dict)

        return jsonify(productos_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@bp.route('/<int:id>', methods=['GET'])
def obtener_producto(id):
    try:
        producto = Producto.query.get_or_404(id)

        # Obtener las imágenes asociadas al producto
        media_productos = Media.query.filter_by(id_producto=producto.id).all()
        media_data = [
            {
                "id": media.id,
                "tipo_media": media.tipo_media,
                "url": media.url,
                "descripcion": media.descripcion,
                "orden": media.orden
            }
            for media in media_productos
        ]

        # Obtener las reseñas asociadas al producto
        reseñas_producto = Reseña.query.filter_by(id_producto=producto.id).all()
        reseñas_data = [
            {
                "id": reseña.id,
                "calificacion": reseña.calificacion,
                "texto_resena": reseña.texto_resena,
                "fecha_resena": reseña.fecha_resena.isoformat(),
                "cliente": {
                    "id": reseña.id_cliente,
                    "nombre_usuario": reseña.cliente.nombre_usuario if reseña.cliente else "Anónimo"
                }
            }
            for reseña in reseñas_producto
        ]

        # Construir el diccionario del producto con relaciones
        producto_dict = {
            "id": producto.id,
            "nombre_producto": producto.nombre_producto,
            "descripcion": producto.descripcion,
            "precio": str(producto.precio),
            "stock": producto.stock,
            "peso": str(producto.peso),
            "color": producto.color,
            "volumen": str(producto.volumen) if producto.volumen else None,
            "categoria": {
                "id": producto.categoria.id,
                "nombre_categoria": producto.categoria.nombre_categoria,
                "descripcion": producto.categoria.descripcion
            } if producto.categoria else None,
            "marca": {
                "id": producto.marca.id,
                "nombre_marca": producto.marca.nombre_marca,
                "descripcion": producto.marca.descripcion,
                "sitio_web": producto.marca.sitio_web
            } if producto.marca else None,
            "media": media_data,
            "reseñas": reseñas_data
        }

        return jsonify(producto_dict), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
