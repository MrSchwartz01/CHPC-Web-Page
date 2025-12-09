# decorators.py
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt

definir_roles = {
    'cliente': ['ver_perfil'],
    'administrador': ['ver_perfil', 'crear_admin', 'gestionar_usuarios']
}

def rol_permitido(rol, accion):
    """Verifica si un rol tiene permiso para realizar una acción específica."""
    return accion in definir_roles.get(rol, [])

def rol_requerido(accion):
    def wrapper(fn):
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            user_role = claims.get("rol")
            if not rol_permitido(user_role, accion):
                return jsonify({"mensaje": "No tienes permiso para realizar esta acción"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper
