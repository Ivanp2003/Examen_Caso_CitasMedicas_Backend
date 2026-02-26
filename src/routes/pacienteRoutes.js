const express = require('express');
const router = express.Router();
const {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
} = require('../controllers/pacienteController');
const { protegerRuta } = require('../middlewares/authMiddleware');

// Todas las rutas protegidas
router.use(protegerRuta);

router.route('/')
  .get(obtenerTodos)
  .post(crear);

router.route('/:id')
  .get(obtenerPorId)
  .put(actualizar)
  .delete(eliminar);

module.exports = router;