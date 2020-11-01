// controlador para verificar los JWT

const mongoose = require('mongoose');

const Usuario = require('../models/usuario');

const service = require('../services/token');

function registro(req, res) {

    // Objeto usuario con los datos que iran al token
    const usuario = new Usuario({
        //name: req.body.name,
        //telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password
        //categoria: req.body.categoria
    });

    usuario.save((err) => {
        if (err) res.status(500).send({
            msg: `Error al crear usuario (registro): ${err}`
        });
        // servicio que crea el token
        return res.status(200).send({
            token: service.crearToken(usuario)
        });
    });
}

function login(req, res) {
    Usuario.find({
        email: req.body.email
    }, (err, usuario) => {
        if (err) return res.status(500).send({
            mesg: `Error:${err}`
        });
        // No encuentra usuario
        if (!user) return res.status(404).send({
            msg: 'No existe el usuario'
        });
        //Logeado
        req.usuario = usuario;
        res.status(200).send({
            msg: 'Usuario logueado',
            token: service.crearToken(usuario)
        })
    });
}

module.exports = {
    registro,
    login
}