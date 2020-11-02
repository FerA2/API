// controlador para verificar los JWT

const mongoose = require('mongoose');

const Usuario = require('../models/usuario');

const service = require('../services/token');

// Desencriptado de contraseña
const bcrypt = require('bcrypt-nodejs');

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


        if (err) return res.status(500).send({
            msg: `Error al crear usuario (registro): ${err}`
        });
        // servicio que crea el token
        return res.status(200).send({
            token: service.crearToken(usuario)
        });

    });

}

function login(req, res) {

    let body = req.body;
    Usuario.findOne({
        email: body.email
    }, (err, usuario) => {
        if (err) return res.status(500).send({
            mesg: `Error (login):${err}`
        });
        // No encuentra usuario
        if (!usuario) return res.status(404).send({
            msg: 'No existe el usuario'
        });
        // Comparamos contraseñas
        bcrypt.compare(body.password, usuario.password, (err, result) => {
            if (err) return res.status(400).send({
                msg: 'Error en el proceso',
                req: body.password,
                db: usuario.password
            });
            if (result) {
                //Logeado
                res.status(200).send({
                    msg: "Logeado",
                    token: service.crearToken(usuario)
                });
            } else {
                return res.status(400).send({
                    msg: 'Contraseña incorrecta'
                });
            }
        });
    });
}

module.exports = {
    registro,
    login
}