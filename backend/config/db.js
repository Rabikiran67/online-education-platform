const mongoose = require('mongoose');

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rabi:rabi@cluster0.1slxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the app if the database connection fails
  }
};

module.exports = connectDB;
