// server.js
const express = require('express');
const cors = require('cors');
const db = require('./models/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const absensiRoutes = require('./routes/absensi');
const studentsRoutes = require('./routes/students');
const usersRoutes = require('./routes/users');
const parentsRoutes = require('./routes/parents');

app.use('/absensi', absensiRoutes);
app.use('/students', studentsRoutes);
app.use('/users', usersRoutes);
app.use('/parents', parentsRoutes);

// Route untuk testing
app.get('/', (req, res) => {
  res.json({ message: 'API TA Absensi is running!' });
});

// Untuk Vercel Serverless Function
module.exports = app;

// Hanya jalankan server jika file dijalankan langsung (untuk development)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
}