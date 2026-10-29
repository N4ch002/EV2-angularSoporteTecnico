CREATE DATABASE IF NOT EXISTS soporte_db;
USE soporte_db;

CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asunto VARCHAR(150) NOT NULL,
  solicitante VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  prioridad ENUM('Baja', 'Media', 'Alta') NOT NULL,
  estado ENUM('Pendiente', 'En Proceso', 'Resuelto') NOT NULL,
  fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado) VALUES
('Impresora no imprime', 'Ana Torres', 'La impresora de recepción muestra error de papel atascado.', 'Hardware', 'Media', 'Pendiente'),
('Sin acceso a internet', 'Luis Rojas', 'El laboratorio 2 no tiene conexión desde la mañana.', 'Redes', 'Alta', 'En Proceso'),
('Restablecer contraseña', 'Carla Muñoz', 'La usuaria no puede ingresar a su correo institucional.', 'Cuentas y accesos', 'Baja', 'Resuelto');