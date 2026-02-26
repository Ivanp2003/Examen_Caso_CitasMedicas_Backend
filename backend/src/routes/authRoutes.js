const express = require('express');
const router = express.Router();
const {
  login,
  registro,
  obtenerUsuarioActual
} = require('../controllers/authController');
const { protegerRuta } = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/login', login);
router.post('/registro', registro);

// Rutas protegidas
router.get('/me', protegerRuta, obtenerUsuarioActual);

module.exports = router;