# routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, get_jwt, verify_jwt_in_request, get_jwt_identity, create_refresh_token
)
from datetime import timedelta
from models import db, Usuario
from auth.decorators import rol_requerido
from auth.schemas import UsuarioSchema, LoginSchema

# Blueprint de autenticación
auth = Blueprint('auth', __name__)

# Registro de usuarios
@auth.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    errors = UsuarioSchema().validate(data)
    if errors:
        return jsonify(errors), 400

    # Forzar rol "cliente"
    if data.get('rol', 'cliente') != 'cliente':
        return jsonify({"mensaje": "Solo se permite el rol 'cliente' en el registro."}), 403

    # Verificar unicidad de nombre de usuario y correo electrónico
    if Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first():
        return jsonify({"mensaje": "El nombre de usuario ya existe"}), 400
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"mensaje": "El correo electrónico ya existe"}), 400

    try:
        # Crear usuario
        usuario = Usuario(
            nombre_usuario=data['nombre_usuario'],
            email=data['email'],
            telefono=data.get('telefono'),
            direccion=data.get('direccion'),
            rol='cliente'
        )
        usuario.set_password(data['contraseña'])
        db.session.add(usuario)
        db.session.commit()
        return jsonify({"mensaje": "Usuario registrado con éxito"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Ocurrió un error al registrar el usuario."}), 500

# Inicio de sesión
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    errors = LoginSchema().validate(data)
    if errors:
        return jsonify(errors), 400

    usuario = Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first()

    if usuario and usuario.check_password(data['contraseña']):
        access_token = create_access_token(
            identity={"id": usuario.id, "nombre_usuario": usuario.nombre_usuario, "rol": usuario.rol},
            expires_delta=timedelta(hours=1)
        )
        refresh_token = create_refresh_token(identity=usuario.id)
        return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200

    return jsonify({"mensaje": "Credenciales incorrectas"}), 401

# Creación de administradores
@auth.route('/crear_admin', methods=['POST'])
@rol_requerido('crear_admin')
def crear_admin():
    data = request.get_json()
    errors = UsuarioSchema().validate(data)
    if errors:
        return jsonify(errors), 400

    if Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first():
        return jsonify({"mensaje": "El nombre de usuario ya existe"}), 400
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"mensaje": "El correo electrónico ya existe"}), 400

    try:
        admin = Usuario(
            nombre_usuario=data['nombre_usuario'],
            email=data['email'],
            telefono=data.get('telefono'),
            direccion=data.get('direccion'),
            rol='administrador'
        )
        admin.set_password(data['contraseña'])
        db.session.add(admin)
        db.session.commit()
        return jsonify({"mensaje": "Administrador creado con éxito"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Ocurrió un error al crear el administrador."}), 500

# Ruta para refrescar tokens
@auth.route('/refresh', methods=['POST'])
def refresh():
    verify_jwt_in_request(refresh=True)
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity, expires_delta=timedelta(hours=1))
    return jsonify({"access_token": new_access_token}), 200