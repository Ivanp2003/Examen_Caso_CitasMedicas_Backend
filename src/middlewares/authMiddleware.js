const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.protegerRuta = async (req, res, next) => {
  let token;

  // Verificar si existe token en headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({
      success: false,
      mensaje: 'No autorizado para acceder a esta ruta'
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener usuario del token
    req.usuario = await Usuario.findById(decoded.id).select('-password');

    if (!req.usuario || !req.usuario.activo) {
      return res.status(401).json({
        success: false,
        mensaje: 'Usuario no autorizado'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      mensaje: 'Token inválido o expirado'
    });
  }
};