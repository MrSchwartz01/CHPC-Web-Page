from marshmallow import Schema, fields, validate, ValidationError


class BannerSchema(Schema):
    id = fields.Int(dump_only=True)  # Solo para lectura

    titulo = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=150, error="El título debe tener entre 3 y 150 caracteres.")
    )
    imagen_url = fields.Url(
        required=True,
        error_messages={
            "required": "La URL de la imagen es obligatoria.",
            "invalid": "Debe ser una URL válida."
        }
    )
    orden = fields.Int(
        validate=validate.Range(min=0, error="El orden debe ser mayor o igual a 0.")
    )
    estado = fields.Bool(
        required=True,
        error_messages={"required": "El estado es obligatorio."}
    )
    fecha_creacion = fields.DateTime(dump_only=True)  # Solo lectura
    fecha_modificacion = fields.DateTime(dump_only=True)  # Solo lectura
