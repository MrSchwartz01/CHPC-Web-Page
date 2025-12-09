from marshmallow import Schema, fields, validate

class ClienteSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre_usuario = fields.Str(dump_only=True)

class ProductoSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre_producto = fields.Str(dump_only=True)

class ReseñaSchema(Schema):
    id = fields.Int(dump_only=True)  # Solo lectura
    id_producto = fields.Int(
        required=True,
        error_messages={"required": "El campo 'id_producto' es obligatorio."}
    )
    id_cliente = fields.Int(
        required=True,
        error_messages={"required": "El campo 'id_cliente' es obligatorio."}
    )
    calificacion = fields.Int(
        required=True,
        validate=validate.Range(min=1, max=5, error="La calificación debe estar entre 1 y 5."),
        error_messages={"required": "El campo 'calificacion' es obligatorio."}
    )
    texto_resena = fields.Str(
        validate=validate.Length(max=1000, error="El texto de la reseña debe tener como máximo 1000 caracteres."),
        allow_none=True  # Opcional
    )
    fecha_resena = fields.DateTime(dump_only=True)  # Solo lectura
    cliente = fields.Nested(ClienteSchema, dump_only=True)  # Relación con Cliente
    producto = fields.Nested(ProductoSchema, dump_only=True)  # Relación con Producto

# Exporta las instancias necesarias
reseña_schema = ReseñaSchema()
reseñas_schema = ReseñaSchema(many=True)
