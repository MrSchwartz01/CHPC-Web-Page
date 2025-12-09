from marshmallow import Schema, fields, validate

class MarcaSchema(Schema):
    nombre_marca = fields.Str(
        required=True,
        validate=validate.Length(
            min=3, max=80, 
            error="El nombre de la marca debe tener entre 3 y 80 caracteres."
        )
    )
    descripcion = fields.Str(
        allow_none=True,
        validate=validate.Length(
            max=500, 
            error="La descripción de la marca debe tener como máximo 500 caracteres."
        )
    )
    sitio_web = fields.Str(
        allow_none=True,
        validate=validate.URL(
            error="El sitio web debe ser una URL válida."
        )
    )
    imagen_url = fields.Str(
        required=True,
        validate=validate.URL(
            error="La URL de la imagen debe ser válida."
        )
    )
