require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');

// Conectar a la base de datos
connectDB();

// Crear aplicación Express
const app = express();

// Middlewares globales
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    success: true,
    mensaje: '🏥 API Sistema de Gestión de Citas Médicas - ESFTEC',
    version: '1.0.0',
    entorno: process.env.NODE_ENV,
    baseDatos: process.env.MONGODB_URI.includes('localhost') ? 'MongoDB Local' : 'MongoDB Atlas',
    endpoints: {
      auth: '/api/auth',
      especialidades: '/api/especialidades',
      pacientes: '/api/pacientes',
      citas: '/api/citas'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: 'Servidor saludable',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: process.env.MONGODB_URI.includes('localhost') ? 'Local' : 'Atlas'
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);

// Manejo de rutas no encontradas
app.use(notFound);

// Manejador global de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
🚀 Servidor corriendo en puerto ${PORT}
📡 Entorno: ${process.env.NODE_ENV}
🌐 URL: http://localhost:${PORT}
💾 Base de datos: ${process.env.MONGODB_URI.includes('localhost') ? 'MongoDB Local' : 'MongoDB Atlas'}
  `);
});

// Manejo de promesas no capturadas
process.on('unhandledRejection', (err) => {
  console.error(`❌ Error no manejado: ${err.message}`);
  server.close(() => process.exit(1));
});