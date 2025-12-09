import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename

# Configurar el Blueprint para las rutas de carga
upload_bp = Blueprint('upload_routes', __name__, url_prefix='/uploads')

# Extensiones de archivo permitidas
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Verificar si la extensión es válida
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/imagen', methods=['POST'])
def subir_imagen():
    if 'imagen' not in request.files:
        return jsonify({"error": "No se encontró el archivo"}), 400

    file = request.files['imagen']
    if file.filename == '':
        return jsonify({"error": "El nombre del archivo está vacío"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)  # Sanitizar el nombre
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

        # Crear la carpeta si no existe
        os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)

        # Guardar la imagen
        file.save(filepath)

        # Crear la URL de la imagen
        imagen_url = f"/static/uploads/{filename}"
        return jsonify({"imagen_url": imagen_url}), 201

    return jsonify({"error": "Tipo de archivo no permitido"}), 400
