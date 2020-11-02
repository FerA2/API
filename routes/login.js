// Ruta Login
const express = require('express');
const router = express.Router();

//const mongoose = require('../config/conexion');
const auth = require('../controllers/auth');

// get
router.get('/login', (req, res) => {
    res.status(200).send({
        msg: 'Login'
    });
});
// Consume el servicio de registro
router.post('/login', auth.login);

module.exports = router;