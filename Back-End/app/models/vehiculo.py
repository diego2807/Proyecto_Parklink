from app.database.database import db
from datetime import datetime

class Vehiculo(db.Model):
    __tablename__ = 'vehiculos'
    
    id = db.Column(db.Integer, primary_key=True)
    placa = db.Column(db.String(10), unique=True, nullable=False, index=True)
    
    # Conexión directa con el usuario dueño del carro/moto
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False)
    
    tipo_vehiculo = db.Column(db.String(20), nullable=False) # "Automóvil", "Moto", "Camioneta"
    marca = db.Column(db.String(50), nullable=True)
    color = db.Column(db.String(30), nullable=True)
    area = db.Column(db.String(100), nullable=False) # Ej: Tecnología, Operaciones
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Historial de entradas y salidas de este vehículo específico
    movimientos = db.relationship('Acceso', backref='vehiculo_relacionado', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Vehiculo {self.placa}>"