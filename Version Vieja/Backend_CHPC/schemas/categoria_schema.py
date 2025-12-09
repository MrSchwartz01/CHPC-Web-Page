from marshmallow import Schema, fields, validate

class CategoriaSchema(Schema):
    nombre_categoria = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=80, error="El nombre de la categoría debe tener entre 3 y 80 caracteres.")
    )
    descripcion = fields.Str(
        validate=validate.Length(max=255, error="La descripción debe tener como máximo 255 caracteres.")
    )
    id_categoria_padre = fields.Int(
        allow_none=True,
        error_messages={"invalid": "Debe ser un identificador de categoría válido."}
    )
