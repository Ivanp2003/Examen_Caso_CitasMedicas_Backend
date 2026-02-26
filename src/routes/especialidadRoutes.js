const express = require('express');
const router = express.Router();
const {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
} = require('../controllers/especialidadController');
const { protegerRuta } = require('../middlewares/authMiddleware');

// Todas las rutas protegidas
router.use(protegerRuta);

router.route('/')
  .get(obtenerTodas)
  .post(crear);

router.route('/:id')
  .get(obtenerPorId)
  .put(actualizar)
  .delete(eliminar);

module.exports = router;