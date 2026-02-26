const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '24h'
  });
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor ingrese email y contraseña'
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        success: false,
        token: null,
        nombre: null,
        apellido: null,
        email: null,
        mensaje: 'Usuario o contraseña incorrectos.'
      });
    }

    // Verificar contraseña
    const passwordValido = await usuario.compararPassword(password);

    if (!passwordValido) {
      return res.status(401).json({
        success: false,
        token: null,
        nombre: null,
        apellido: null,
        email: null,
        mensaje: 'Usuario o contraseña incorrectos.'
      });
    }

    // Generar token
    const token = generarToken(usuario._id);

    res.status(200).json({
      success: true,
      token,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      mensaje: 'Login exitoso'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Registro de usuario
// @route   POST /api/auth/registro
// @access  Public
exports.registro = async (req, res, next) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        mensaje: 'El email ya está registrado'
      });
    }

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      apellido,
      email,
      password
    });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(201).json({
      success: true,
      token,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      mensaje: 'Usuario registrado exitosamente'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Obtener usuario actual
// @route   GET /api/auth/me
// @access  Private
exports.obtenerUsuarioActual = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');

    res.status(200).json({
      success: true,
      data: usuario
    });
  } catch (error) {
    next(error);
  }
};