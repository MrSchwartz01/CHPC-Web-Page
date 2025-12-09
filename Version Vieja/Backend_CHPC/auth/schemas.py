# schemas.py
from marshmallow import Schema, fields, validate, ValidationError
import re

# Validación personalizada de contraseñas
def validar_contraseña(contraseña):
    if not re.search(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$', contraseña):
        raise ValidationError(
            "La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial."
        )

# Esquema de validación para usuarios
class UsuarioSchema(Schema):    
    nombre_usuario = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=80, error="El nombre de usuario debe tener entre 3 y 80 caracteres.")
    )
    contraseña = fields.Str(
        required=True,
        validate=validar_contraseña
    )
    email = fields.Email(
        required=True,
        error_messages={"required": "El correo electrónico es obligatorio.", "invalid": "Formato de correo inválido."}
    )
    telefono = fields.Str(
        validate=validate.Length(max=20, error="El teléfono debe tener como máximo 20 caracteres.")
    )
    direccion = fields.Str(
        validate=validate.Length(max=255, error="La dirección debe tener como máximo 255 caracteres.")
    )
    rol = fields.Str(
        validate=validate.OneOf(['cliente', 'administrador'], error="El rol debe ser 'cliente' o 'administrador'."),
        missing='cliente'
    )

# Esquema de validación para login
class LoginSchema(Schema):
    nombre_usuario = fields.Str(required=True, error_messages={"required": "El nombre de usuario es obligatorio."})
    contraseña = fields.Str(required=True, error_messages={"required": "La contraseña es obligatoria."})