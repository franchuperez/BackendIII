const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adoptme');
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
