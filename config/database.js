const mongoose = require('mongoose');
// const logInfo = require('./log')
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:1234@cluster0.h4iejmb.mongodb.net/Marketing-xml', {
     // useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log('[INFO] Connected to MongoDB');
    //logInfo('INFO','Connected to MongoDB Successfully')
  } catch (error) {
    console.error('[ERROR] Error connecting to MongoDB:', error);
    //logInfo('ERROR',`Error connecting to MongoDB: ${error}`)
  }
};

module.exports = connectDB;