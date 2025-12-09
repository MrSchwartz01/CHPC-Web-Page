from flask import Blueprint, request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from marshmallow import ValidationError
from models import Banner
from schemas.banner_schema import BannerSchema
from app import db
from functools import wraps

# Decorador para verificar roles
def rol_requerido(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()  # Verifica que el token JWT esté presente
            claims = get_jwt()  # Obtiene los claims del token
            user_role = claims.get("rol")
            if user_role not in roles:
                return jsonify({"mensaje": "No tienes permiso para realizar esta acción"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

# Inicialización del Blueprint
bp = Blueprint('banner_routes', __name__, url_prefix='/banners')

# Inicialización de esquemas
banner_schema = BannerSchema()
banners_schema = BannerSchema(many=True)

# Rutas públicas
@bp.route('/', methods=['GET'])
def obtener_banners():
    try:
        banners = Banner.query.order_by(Banner.orden).all()  # Ordenados por el campo `orden`
        return jsonify({"data": banners_schema.dump(banners)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/<int:id>', methods=['GET'])
def obtener_banner(id):
    try:
        banner = Banner.query.get_or_404(id)
        return jsonify(banner_schema.dump(banner)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rutas protegidas (solo administradores)
@bp.route('/', methods=['POST'])
@rol_requerido('administrador')
def crear_banner():
    data = request.get_json()
    try:
        banner_data = banner_schema.load(data)  # Validación con Marshmallow
        banner = Banner(**banner_data)
        db.session.add(banner)
        db.session.commit()
        return jsonify(banner_schema.dump(banner)), 201
    except ValidationError as e:
        return jsonify({"errors": e.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@bp.route('/<int:id>', methods=['PUT'])
@rol_requerido('administrador')
def actualizar_banner(id):
    banner = Banner.query.get_or_404(id)
    data = request.get_json()
    try:
        banner_data = banner_schema.load(data, partial=True)  # Permitir actualizaciones parciales
        for key, value in banner_data.items():
            setattr(banner, key, value)
        db.session.commit()
        return jsonify(banner_schema.dump(banner)), 200
    except ValidationError as e:
        return jsonify({"errors": e.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@bp.route('/<int:id>', methods=['DELETE'])
@rol_requerido('administrador')
def eliminar_banner(id):
    banner = Banner.query.get_or_404(id)
    try:
        db.session.delete(banner)
        db.session.commit()
        return jsonify({"message": "Banner eliminado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
