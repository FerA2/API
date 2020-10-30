/*
// Controladores (funciones) para las posibles rutas de la API
const userRouter = require('./routes/usuario');
app.use('/api', userRouter);
const Usuario = require('../models/usuario');

// GET todos los usuarios */
//Añadir permisos solo admin
/*
function getUsuarios(req, res) {
    Usuario.find({}, (err, usuarios) => {
        if (err) return res.status(500).send({
            msg: `Error con la BBDD usuario: ${err}`
        });
        if (!usuarios) return res.status(404).send({
            msg: 'Error, no hay usuarios registrados'
        });
        res.status(200).send({
            usuarios
        });
    });
}
/*
function getUsuario(id, req, res) {

}

function updateUsuario(id, req, res) {

}

function deleteUsuario(id, req, res) {

}


// Exportamos las funciones
exports = {
    // getUsuario,
    getUsuarios,
    //updateUsuario,
    //deleteUsuario
}
-*/