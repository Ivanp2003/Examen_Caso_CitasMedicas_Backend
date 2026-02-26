const mongoose = require('mongoose');

const especialidadSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, 'El código es requerido'],
    unique: true,
    trim: true,
    uppercase: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Especialidad', especialidadSchema);