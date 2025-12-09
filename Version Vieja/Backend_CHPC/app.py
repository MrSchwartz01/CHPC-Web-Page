from flask import Flask, jsonify, send_from_directory
from config import Config
from models import db, bcrypt
from flask_jwt_extended import JWTManager
from auth.routes import auth as auth_bp
from routes.banner_routes import bp as banner_bp
from routes.carrito_routes import bp as carrito_bp
from routes.categoria_routes import bp as categoria_bp
from routes.marca_routes import bp as marca_bp
from routes.media_routes import bp as media_bp
from routes.producto_routes import bp as producto_bp
from routes.reseña_routes import bp as reseña_routes  # Nuevo: Rutas para reseñas
from routes.upload_routes import upload_bp  # Nuevo: Rutas para cargar imágenes

from flask_migrate import Migrate
from flask_cors import CORS
from marshmallow import ValidationError
import logging
import os

# Inicializar la aplicación Flask
app = Flask(__name__)
app.config.from_object(Config)

# Configuración de carpetas para imágenes
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'static', 'uploads')
app.config['AIMAPRO_FOLDER'] = os.path.join(os.getcwd(), 'static', 'AimaPro')
app.config['LOGOSMARCAS_FOLDER'] = os.path.join(os.getcwd(), 'static', 'logosmarcas')  # Nueva carpeta
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# Asegurar que las carpetas estáticas existen
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['AIMAPRO_FOLDER'], exist_ok=True)
os.makedirs(app.config['LOGOSMARCAS_FOLDER'], exist_ok=True)

# Habilitar CORS
CORS(app)

# Inicializar extensiones
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Configurar logging
logging.basicConfig(level=logging.INFO)

# Manejo de errores de validación
@app.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify({
        "status": "error",
        "message": "Errores de validación",
        "errors": error.messages
    }), 400

# Ruta para servir archivos de AimaPro
@app.route('/AimaPro/<path:filename>')
def serve_aima_pro(filename):
    """Servir archivos desde la carpeta static/AimaPro."""
    return send_from_directory(app.config['AIMAPRO_FOLDER'], filename)

# Ruta para servir archivos de logosmarcas
@app.route('/static/logosmarcas/<path:filename>')
def serve_logosmarcas(filename):
    """Servir archivos desde la carpeta static/logosmarcas."""
    return send_from_directory(app.config['LOGOSMARCAS_FOLDER'], filename)

# Ruta de prueba
@app.route("/")
def index():
    return jsonify({"mensaje": "La API está funcionando correctamente"})

# Registrar blueprints con prefijo común "/tienda"
app.register_blueprint(auth_bp, url_prefix="/tienda/auth")
app.register_blueprint(banner_bp, url_prefix="/tienda/banners")
app.register_blueprint(carrito_bp, url_prefix="/tienda/carritos")
app.register_blueprint(categoria_bp, url_prefix="/tienda/categorias")
app.register_blueprint(marca_bp, url_prefix="/tienda/marcas")
app.register_blueprint(media_bp, url_prefix="/tienda/media")
app.register_blueprint(producto_bp, url_prefix="/tienda/productos")
app.register_blueprint(reseña_routes, url_prefix="/tienda/reseñas")  # Registrar el blueprint de reseñas
app.register_blueprint(upload_bp, url_prefix="/tienda/uploads")  # Nuevo: Cargar imágenes

# Ejecutar aplicación
if __name__ == "__main__":
    # Crear las carpetas necesarias si no existen
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['AIMAPRO_FOLDER'], exist_ok=True)
    os.makedirs(app.config['LOGOSMARCAS_FOLDER'], exist_ok=True)
    app.run(debug=True)
