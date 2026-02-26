const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`✅ MongoDB conectado: ${mongoose.connection.host}`);
    console.log(`📊 Base de datos: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Eventos de conexión
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Error de MongoDB: ${err.message}`);
});

module.exports = connectDB;