// Ruta Registro
const express = require('express');
const router = express.Router();

//const mongoose = require('../config/conexion');
const auth = require('../controllers/auth');

// get
router.get('/registro', (req, res) => {
    res.status(200).send({
        msg: 'Registro'
    });
});
// Consume el servicio de registro
router.post('/registro', auth.registro);

module.exports = router;