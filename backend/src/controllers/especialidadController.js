const Especialidad = require('../models/Especialidad');

// @desc    Obtener todas las especialidades
// @route   GET /api/especialidades
// @access  Private
exports.obtenerTodas = async (req, res, next) => {
  try {
    const especialidades = await Especialidad.find().sort({ nombre: 1 });

    res.status(200).json({
      success: true,
      count: especialidades.length,
      data: especialidades
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener especialidad por ID
// @route   GET /api/especialidades/:id
// @access  Private
exports.obtenerPorId = async (req, res, next) => {
  try {
    const especialidad = await Especialidad.findById(req.params.id);

    if (!especialidad) {
      return res.status(404).json({
        success: false,
        mensaje: 'Especialidad no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: especialidad
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear especialidad
// @route   POST /api/especialidades
// @access  Private
exports.crear = async (req, res, next) => {
  try {
    const { codigo } = req.body;

    // Verificar si ya existe una especialidad con ese código
    const especialidadExiste = await Especialidad.findOne({ codigo });

    if (especialidadExiste) {
      return res.status(400).json({
        success: false,
        mensaje: 'Ya existe una especialidad con ese código',
        exito: false
      });
    }

    const especialidad = await Especialidad.create(req.body);

    res.status(201).json({
      success: true,
      mensaje: 'Especialidad creada correctamente',
      exito: true,
      data: especialidad
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar especialidad
// @route   PUT /api/especialidades/:id
// @access  Private
exports.actualizar = async (req, res, next) => {
  try {
    const especialidad = await Especialidad.findById(req.params.id);

    if (!especialidad) {
      return res.status(404).json({
        success: false,
        mensaje: 'Especialidad no encontrada',
        exito: false
      });
    }

    const especialidadActualizada = await Especialidad.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      mensaje: 'Especialidad actualizada correctamente',
      exito: true,
      data: especialidadActualizada
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar especialidad
// @route   DELETE /api/especialidades/:id
// @access  Private
exports.eliminar = async (req, res, next) => {
  try {
    const especialidad = await Especialidad.findById(req.params.id);

    if (!especialidad) {
      return res.status(404).json({
        success: false,
        mensaje: 'Especialidad no encontrada',
        exito: false
      });
    }

    await Especialidad.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      mensaje: 'Especialidad eliminada correctamente',
      exito: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};