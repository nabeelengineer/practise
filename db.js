const mongoose = require('mongoose');
// const mysql = require('mysql');

const mongooseURL = 'mongodb://localhost:27017/';

mongoose.connect(mongooseURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB server');
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'mydatabase'
// });

// db.connect((err) => {
//   if(err) {
//     console.log("Error connecting to the database:", err.stack);
//   }
//   console.log("Conected to the database as id" + db.threadId);
// });

// db.query('SELECT * FROM mytable', (error, results, fields) =>  {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// db.end();

module.exports = db;
