const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  fecha_nacimiento: {
    type: String,
    trim: true
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    trim: true
  },
  ciudad: {
    type: String,
    trim: true
  },
  direccion: {
    type: String,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Paciente', pacienteSchema);