const mongoose = require('mongoose');
const url = 'mongodb://localhost/MoviePlug';

async function dbconnect() {
  try {
    await mongoose.connect(url, { useNewUrlParser: false, useUnifiedTopology: false });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

module.exports = dbconnect;
