const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: [true, 'El código es requerido']
  },
  descripcion: {
    type: String,
    trim: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: [true, 'El paciente es requerido']
  },
  especialidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Especialidad',
    required: [true, 'La especialidad es requerida']
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices para optimizar consultas
citaSchema.index({ paciente: 1, especialidad: 1 });
citaSchema.index({ codigo: 1 });

module.exports = mongoose.model('Cita', citaSchema);