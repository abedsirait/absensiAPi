// db.js
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // ← tambahkan ini!
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

// Optional: Tes koneksi saat awal
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Gagal koneksi ke database:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke database MySQL');
    connection.release(); // selalu release setelah dipakai
  }
});

module.exports = db;
