const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tasknest', {
      serverSelectionTimeoutMS: 3000 // Quick timeout to failover elegantly
    });
    console.log(`\x1b[32m[MongoDB Connected]: ${conn.connection.host}\x1b[0m`);
    return true;
  } catch (error) {
    console.error(`\x1b[33m[Database Connection Failed]: ${error.message}\x1b[0m`);
    console.log('\x1b[36m[System Status]: Defaulting to high-performance in-memory local data store fallback for active testing.\x1b[0m');
    return false;
  }
};

module.exports = connectDB;
