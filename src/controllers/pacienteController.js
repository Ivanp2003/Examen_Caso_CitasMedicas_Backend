const Paciente = require('../models/Paciente');

// @desc    Obtener todos los pacientes
// @route   GET /api/pacientes
// @access  Private
exports.obtenerTodos = async (req, res, next) => {
  try {
    const pacientes = await Paciente.find().sort({ apellido: 1, nombre: 1 });

    res.status(200).json({
      success: true,
      count: pacientes.length,
      data: pacientes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener paciente por ID
// @route   GET /api/pacientes/:id
// @access  Private
exports.obtenerPorId = async (req, res, next) => {
  try {
    const paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
      return res.status(404).json({
        success: false,
        mensaje: 'Paciente no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: paciente
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear paciente
// @route   POST /api/pacientes
// @access  Private
exports.crear = async (req, res, next) => {
  try {
    const paciente = await Paciente.create(req.body);

    res.status(201).json({
      success: true,
      mensaje: 'Paciente creado correctamente',
      exito: true,
      data: paciente
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar paciente
// @route   PUT /api/pacientes/:id
// @access  Private
exports.actualizar = async (req, res, next) => {
  try {
    const paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
      return res.status(404).json({
        success: false,
        mensaje: 'Paciente no encontrado',
        exito: false
      });
    }

    const pacienteActualizado = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      mensaje: 'Paciente actualizado correctamente',
      exito: true,
      data: pacienteActualizado
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar paciente
// @route   DELETE /api/pacientes/:id
// @access  Private
exports.eliminar = async (req, res, next) => {
  try {
    const paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
      return res.status(404).json({
        success: false,
        mensaje: 'Paciente no encontrado',
        exito: false
      });
    }

    await Paciente.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      mensaje: 'Paciente eliminado correctamente',
      exito: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};