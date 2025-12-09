from models import db, Usuario
from app import app  # Importa la aplicación Flask desde app.py
from datetime import datetime


def crear_admin():
    # Solicitar los datos del administrador mediante la consola
    nombre_usuario = input("Ingrese el nombre de usuario del administrador: ")
    contraseña = input("Ingrese la contraseña del administrador: ")
    email = input("Ingrese el correo electrónico del administrador: ")
    telefono = input("Ingrese el número de teléfono del administrador: ")
    direccion = input("Ingrese la dirección del administrador: ")

    # Crear el administrador solo si no existe
    if not Usuario.query.filter_by(nombre_usuario=nombre_usuario).first():
        admin = Usuario(
            nombre_usuario=nombre_usuario,
            email=email,
            telefono=telefono,
            direccion=direccion,
            rol='administrador',
            
            fecha_registro=datetime.utcnow(),
            fecha_modificacion=datetime.utcnow(),
        )
        admin.set_password(contraseña)
        db.session.add(admin)
        db.session.commit()
        print("Administrador creado con éxito.")
    else:
        print(f"El administrador con nombre de usuario '{nombre_usuario}' ya existe.")

if __name__ == "__main__":
    # Iniciar el contexto de la aplicación
    with app.app_context():
        crear_admin()
