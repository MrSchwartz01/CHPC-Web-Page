from marshmallow import Schema, fields, validate

class ProductoSchema(Schema):
    nombre_producto = fields.Str(
        required=True,
        validate=validate.Length(
            min=3, max=80, 
            error="El nombre del producto debe tener entre 3 y 80 caracteres."
        )
    )
    descripcion = fields.Str(
        allow_none=True,
        validate=validate.Length(
            max=1000, 
            error="La descripción debe tener como máximo 1000 caracteres."
        )
    )
    precio = fields.Decimal(
        required=True,
        as_string=True,
        validate=validate.Range(
            min=0.01,  # Aseguramos un precio mínimo mayor a 0
            error="El precio debe ser mayor o igual a 0.01."
        )
    )
    stock = fields.Int(
        required=True,
        validate=validate.Range(
            min=0, 
            error="El stock debe ser mayor o igual a 0."
        )
    )
    peso = fields.Decimal(
        required=True,
        as_string=True,
        validate=validate.Range(
            min=0.01,  # Evitamos un peso igual a 0
            error="El peso debe ser mayor o igual a 0.01."
        )
    )
    color = fields.Str(
        allow_none=True,
        validate=validate.Length(
            max=50, 
            error="El color debe tener como máximo 50 caracteres."
        )
    )
    volumen = fields.Decimal(
        allow_none=True,
        as_string=True,
        validate=validate.Range(
            min=0.01,  # Mismo criterio para volumen
            error="El volumen debe ser mayor o igual a 0.01."
        )
    )
    id_categoria = fields.Int(
        required=True,
        validate=validate.Range(
            min=1, 
            error="El ID de la categoría debe ser un número positivo."
        ),
        error_messages={
            "required": "La categoría es obligatoria."
        }
    )
    id_marca = fields.Int(
        required=True,
        validate=validate.Range(
            min=1, 
            error="El ID de la marca debe ser un número positivo."
        ),
        error_messages={
            "required": "La marca es obligatoria."
        }
    )
