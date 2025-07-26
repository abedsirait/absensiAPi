const express = require('express');
const cors = require('cors');
const db = require('./models/db');
require('dotenv').config();


const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
