from flask import Blueprint, request, jsonify
from models import Categoria
from schemas.categoria_schema import CategoriaSchema
from app import db

bp = Blueprint('categoria_routes', __name__, url_prefix='/categorias')

categoria_schema = CategoriaSchema()
categorias_schema = CategoriaSchema(many=True)

@bp.route('/', methods=['GET'])
def obtener_categorias():
    categorias = Categoria.query.all()
    return jsonify(categorias_schema.dump(categorias)), 200

@bp.route('/<int:id>', methods=['GET'])
def obtener_categoria(id):
    categoria = Categoria.query.get_or_404(id)
    return jsonify(categoria_schema.dump(categoria)), 200

@bp.route('/', methods=['POST'])
def crear_categoria():
    data = request.json
    errors = categoria_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    nueva_categoria = Categoria(
        nombre_categoria=data['nombre_categoria'],
        descripcion=data.get('descripcion'),
        id_categoria_padre=data.get('id_categoria_padre')
    )
    db.session.add(nueva_categoria)
    db.session.commit()
    return jsonify(categoria_schema.dump(nueva_categoria)), 201

@bp.route('/<int:id>', methods=['PUT'])
def actualizar_categoria(id):
    categoria = Categoria.query.get_or_404(id)
    data = request.json
    errors = categoria_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    categoria.nombre_categoria = data.get('nombre_categoria', categoria.nombre_categoria)
    categoria.descripcion = data.get('descripcion', categoria.descripcion)
    categoria.id_categoria_padre = data.get('id_categoria_padre', categoria.id_categoria_padre)
    db.session.commit()
    return jsonify(categoria_schema.dump(categoria)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def eliminar_categoria(id):
    categoria = Categoria.query.get_or_404(id)
    db.session.delete(categoria)
    db.session.commit()
    return jsonify({"mensaje": "Categoría eliminada exitosamente"}), 200
