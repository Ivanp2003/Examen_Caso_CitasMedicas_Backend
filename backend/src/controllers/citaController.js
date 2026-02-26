const Cita = require('../models/Cita');

// @desc    Obtener todas las citas
// @route   GET /api/citas
// @access  Private
exports.obtenerTodas = async (req, res, next) => {
  try {
    const citas = await Cita.find()
      .populate('paciente', 'nombre apellido email telefono')
      .populate('especialidad', 'codigo nombre descripcion')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: citas.length,
      data: citas
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener cita por ID
// @route   GET /api/citas/:id
// @access  Private
exports.obtenerPorId = async (req, res, next) => {
  try {
    const cita = await Cita.findById(req.params.id)
      .populate('paciente', 'nombre apellido email telefono')
      .populate('especialidad', 'codigo nombre descripcion');

    if (!cita) {
      return res.status(404).json({
        success: false,
        mensaje: 'Cita no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: cita
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear cita
// @route   POST /api/citas
// @access  Private
exports.crear = async (req, res, next) => {
  try {
    const cita = await Cita.create(req.body);

    const citaCompleta = await Cita.findById(cita._id)
      .populate('paciente', 'nombre apellido email telefono')
      .populate('especialidad', 'codigo nombre descripcion');

    res.status(201).json({
      success: true,
      mensaje: 'Cita creada correctamente',
      exito: true,
      data: citaCompleta
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar cita
// @route   PUT /api/citas/:id
// @access  Private
exports.actualizar = async (req, res, next) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({
        success: false,
        mensaje: 'Cita no encontrada',
        exito: false
      });
    }

    const citaActualizada = await Cita.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate('paciente', 'nombre apellido email telefono')
      .populate('especialidad', 'codigo nombre descripcion');

    res.status(200).json({
      success: true,
      mensaje: 'Cita actualizada correctamente',
      exito: true,
      data: citaActualizada
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar cita
// @route   DELETE /api/citas/:id
// @access  Private
exports.eliminar = async (req, res, next) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({
        success: false,
        mensaje: 'Cita no encontrada',
        exito: false
      });
    }

    await Cita.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      mensaje: 'Cita eliminada correctamente',
      exito: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};