from flask import Blueprint, request, jsonify
from models import Media
from schemas.media_schema import MediaSchema
from app import db

bp = Blueprint('media_routes', __name__, url_prefix='/media')

media_schema = MediaSchema()
medias_schema = MediaSchema(many=True)

@bp.route('/', methods=['GET'])
def obtener_medias():
    medias = Media.query.all()
    return jsonify(medias_schema.dump(medias)), 200

@bp.route('/<int:id>', methods=['GET'])
def obtener_media(id):
    media = Media.query.get_or_404(id)
    return jsonify(media_schema.dump(media)), 200

@bp.route('/', methods=['POST'])
def crear_media():
    data = request.json
    errors = media_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    nueva_media = Media(
        id_producto=data['id_producto'],
        tipo_media=data['tipo_media'],
        url=data['url'],
        descripcion=data.get('descripcion'),
        orden=data.get('orden', 0)
    )
    db.session.add(nueva_media)
    db.session.commit()
    return jsonify(media_schema.dump(nueva_media)), 201

@bp.route('/<int:id>', methods=['PUT'])
def actualizar_media(id):
    media = Media.query.get_or_404(id)
    data = request.json
    errors = media_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    media.id_producto = data.get('id_producto', media.id_producto)
    media.tipo_media = data.get('tipo_media', media.tipo_media)
    media.url = data.get('url', media.url)
    media.descripcion = data.get('descripcion', media.descripcion)
    media.orden = data.get('orden', media.orden)
    db.session.commit()
    return jsonify(media_schema.dump(media)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def eliminar_media(id):
    media = Media.query.get_or_404(id)
    db.session.delete(media)
    db.session.commit()
    return jsonify({"mensaje": "Media eliminada exitosamente"}), 200
