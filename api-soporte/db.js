   require('dotenv').config();
   const mysql = require('mysql2/promise');

   const db = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: process.env.DB_PASSWORD,
     database: 'soporte_db'
   });

   module.exports = db;