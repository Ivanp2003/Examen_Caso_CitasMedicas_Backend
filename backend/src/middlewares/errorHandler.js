// Manejador global de errores
exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Error de Mongoose: ID inválido
  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado';
    error = { statusCode: 404, message };
  }

  // Error de Mongoose: Campo duplicado
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue)[0];
    const message = `El ${campo} ya existe`;
    error = { statusCode: 400, message };
  }

  // Error de Mongoose: Validación
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { statusCode: 400, message };
  }

  // Error de JWT: Token expirado
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expirado';
    error = { statusCode: 401, message };
  }

  // Error de JWT: Token inválido
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token inválido';
    error = { statusCode: 401, message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    mensaje: error.message || 'Error del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Manejador de rutas no encontradas
exports.notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    mensaje: `Ruta no encontrada - ${req.originalUrl}`
  });
};