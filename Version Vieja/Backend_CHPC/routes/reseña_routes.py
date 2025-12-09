from flask import Blueprint, jsonify, request
from models import db, Reseña, Producto, Usuario

bp = Blueprint('reseñas', __name__, url_prefix='/tienda/reseñas')

# Crear una nueva reseña
@bp.route('/', methods=['POST'])
def crear_resena():
    try:
        data = request.get_json()

        id_producto = data.get('id_producto')
        id_cliente = data.get('id_cliente')
        calificacion = data.get('calificacion')
        texto_resena = data.get('texto_resena')

        # Validaciones básicas
        if not id_producto or not id_cliente or not calificacion:
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        # Verificar que el producto existe
        producto = Producto.query.get(id_producto)
        if not producto:
            return jsonify({"error": "Producto no encontrado"}), 404

        # Verificar que el usuario existe
        cliente = Usuario.query.get(id_cliente)
        if not cliente:
            return jsonify({"error": "Usuario no encontrado"}), 404

        # Crear y guardar la reseña
        nueva_resena = Reseña(
            id_producto=id_producto,
            id_cliente=id_cliente,
            calificacion=calificacion,
            texto_resena=texto_resena
        )
        db.session.add(nueva_resena)
        db.session.commit()

        return jsonify({"message": "Reseña creada con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener todas las reseñas de un producto
@bp.route('/producto/<int:id_producto>', methods=['GET'])
def obtener_resenas_producto(id_producto):
    try:
        reseñas = Reseña.query.filter_by(id_producto=id_producto).all()
        if not reseñas:
            return jsonify({"message": "No se encontraron reseñas para este producto"}), 404

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
            for reseña in reseñas
        ]

        return jsonify(reseñas_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Editar una reseña
@bp.route('/<int:id>', methods=['PUT'])
def editar_resena(id):
    try:
        reseña = Reseña.query.get_or_404(id)
        data = request.get_json()

        calificacion = data.get('calificacion')
        texto_resena = data.get('texto_resena')

        if calificacion is not None:
            reseña.calificacion = calificacion
        if texto_resena is not None:
            reseña.texto_resena = texto_resena

        db.session.commit()
        return jsonify({"message": "Reseña actualizada con éxito"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Eliminar una reseña
@bp.route('/<int:id>', methods=['DELETE'])
def eliminar_resena(id):
    try:
        reseña = Reseña.query.get_or_404(id)
        db.session.delete(reseña)
        db.session.commit()

        return jsonify({"message": "Reseña eliminada con éxito"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
