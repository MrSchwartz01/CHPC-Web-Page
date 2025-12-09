from marshmallow import Schema, fields, validate

class CarritoSchema(Schema):
    id_cliente = fields.Int(
        required=True,
        error_messages={"required": "El cliente es obligatorio."}
    )
    id_producto = fields.Int(
        required=True,
        error_messages={"required": "El producto es obligatorio."}
    )
    cantidad = fields.Int(
        required=True,
        validate=validate.Range(min=1, error="La cantidad debe ser al menos 1.")
    )
    fecha_agregado = fields.DateTime(
        dump_only=True
    )
