const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('xxxxxxxxxxxxxxxxxxxxxxxxxx', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('[INFO] Connected to MongoDB');
  } catch (error) {
    console.error('[ERROR] Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;