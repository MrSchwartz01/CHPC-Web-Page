# config.py
import os
from dotenv import load_dotenv

load_dotenv()  # Cargar variables de entorno desde .env

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "postgresql://neondb_owner:dQMAqfB3O5ch@ep-holy-dawn-a52nuahn-pooler.us-east-2.aws.neon.tech/practricasAnthony?sslmode=require")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "anothersecretkey")
