const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log('MongoDB database connection established successfully!');
  } catch(err) {
    throw new Error('Database intialization error');
  }
};

module.exports = dbConnection;