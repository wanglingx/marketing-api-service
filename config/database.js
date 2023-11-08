const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:1234@cluster0.h4iejmb.mongodb.net/Marketing-xml', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('[INFO] Connected to MongoDB');
  } catch (error) {
    console.error('[ERROR] Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;