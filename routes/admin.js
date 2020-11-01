// Rutas de gestion admin
const express = require('express');
const router = express.Router();

//middelware para la autentificacion
const auth = require('../middlewares/auth');

// Ruta basica 
router.get('/admin', auth, (req, res) => {
    res.status(200).send({
        msg: 'ADMIN API'
    });
});

// exportamos el modulo
module.exports = router;