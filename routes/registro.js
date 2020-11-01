// Ruta Login
const express = require('express');
const router = express.Router();

//const mongoose = require('../config/conexion');
const auth = require('../controllers/auth');

// Consume el servicio de registro
router.post('/registro', auth.registro);

module.exports = router;