const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('connected' , () => {
  console.log('DB is connected');
});

module.exports = db

