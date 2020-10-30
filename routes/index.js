// home page
const express = require('express');
const router = express.Router();

// Ruta basica 
router.get('/', (req, res) => {
    res.send('API Rest Hotel');
});

// exportamos el modulo
module.exports = router;