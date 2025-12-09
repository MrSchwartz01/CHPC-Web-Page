from marshmallow import Schema, fields, validate

class MediaSchema(Schema):
    id_producto = fields.Int(
        required=True,
        error_messages={"required": "El producto es obligatorio."}
    )
    tipo_media = fields.Str(
        required=True,
        validate=validate.OneOf(
            ['imagen', 'video'],
            error="El tipo de media debe ser 'imagen' o 'video'."
        )
    )
    url = fields.Url(
        required=True,
        error_messages={"required": "La URL es obligatoria.", "invalid": "Debe ser una URL válida."}
    )
    descripcion = fields.Str(
        validate=validate.Length(max=255, error="La descripción debe tener como máximo 255 caracteres.")
    )
    orden = fields.Int(
        validate=validate.Range(min=0, error="El orden debe ser mayor o igual a 0.")
    )
