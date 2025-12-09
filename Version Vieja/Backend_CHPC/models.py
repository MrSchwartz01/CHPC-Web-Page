from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
from sqlalchemy import Enum

db = SQLAlchemy()
bcrypt = Bcrypt()


class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(80), unique=True, nullable=False)
    contraseña = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    direccion = db.Column(db.String(255))
    rol = db.Column(Enum('cliente', 'administrador', name='roles'), nullable=False, default='cliente')
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    fecha_modificacion = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relaciones
    reseñas_usuario = db.relationship('Reseña', backref='cliente', cascade='all, delete-orphan', lazy="dynamic")
    carrito_usuario = db.relationship('Carrito', backref='cliente', cascade='all, delete-orphan', lazy="dynamic")

    def set_password(self, contraseña):
        self.contraseña = bcrypt.generate_password_hash(contraseña).decode('utf-8')

    def check_password(self, contraseña):
        return bcrypt.check_password_hash(self.contraseña, contraseña)

    def es_administrador(self):
        return self.rol == 'administrador'


class Categoria(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    nombre_categoria = db.Column(db.String(80), nullable=False)
    descripcion = db.Column(db.Text)
    id_categoria_padre = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=True)

    # Relaciones
    subcategorias = db.relationship('Categoria', backref=db.backref('categoria_padre', remote_side=[id]), lazy=True)
    productos_categoria = db.relationship('Producto', backref='categoria', cascade='all, delete-orphan', lazy=True)


class Marca(db.Model):
    __tablename__ = 'marcas'
    id = db.Column(db.Integer, primary_key=True)
    nombre_marca = db.Column(db.String(80), nullable=False)
    descripcion = db.Column(db.Text)
    sitio_web = db.Column(db.String(255))
    imagen_url = db.Column(db.String(255), nullable=False)  # Campo para almacenar la URL de la imagen de la marca

    # Relaciones
    productos_marca = db.relationship('Producto', backref='marca', cascade='all, delete-orphan', lazy=True)


class Producto(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True)
    nombre_producto = db.Column(db.String(80), nullable=False)
    descripcion = db.Column(db.Text)
    precio = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    peso = db.Column(db.Numeric(10, 2), nullable=False)
    color = db.Column(db.String(50))
    volumen = db.Column(db.Numeric(10, 2))
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    id_marca = db.Column(db.Integer, db.ForeignKey('marcas.id'), nullable=False)

    # Relaciones
    media_producto = db.relationship('Media', backref='producto', cascade='all, delete-orphan', lazy=True)
    reseñas_producto = db.relationship('Reseña', backref='producto', cascade='all, delete-orphan', lazy=True)
    carrito_producto = db.relationship('Carrito', backref='producto', cascade='all, delete-orphan', lazy=True)


class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    tipo_media = db.Column(db.String(20), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    orden = db.Column(db.Integer, default=0, nullable=False)

    __table_args__ = (
        db.UniqueConstraint('id_producto', 'orden', name='unique_orden_producto'),
    )


class Reseña(db.Model):
    __tablename__ = 'reseñas'
    id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    id_cliente = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    calificacion = db.Column(db.Integer, nullable=False)
    texto_resena = db.Column(db.Text)
    fecha_resena = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.CheckConstraint('calificacion BETWEEN 1 AND 5', name='check_calificacion_valida'),
    )


class Carrito(db.Model):
    __tablename__ = 'carrito'
    id = db.Column(db.Integer, primary_key=True)
    id_cliente = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    fecha_agregado = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('id_cliente', 'id_producto', name='unique_cliente_producto'),
    )


class Banner(db.Model):
    __tablename__ = 'banners'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    imagen_url = db.Column(db.String(255), nullable=False)
    orden = db.Column(db.Integer, default=0)
    estado = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    fecha_modificacion = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    fecha_inicio = db.Column(db.DateTime, nullable=True)
    fecha_fin = db.Column(db.DateTime, nullable=True)
