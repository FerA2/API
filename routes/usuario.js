// Rutas usuario
const express = require('express');
const router = express.Router();

// Conecta a la base y al modelo usuario
const mongoose = require('../config/conexion');
const Usuario = require('../models/usuario');

//const userController = require('../controllers/usuario');
/*
 Rutas de Usuario segun la peticion HTTP
*/

// Get todos los usuarios
router.get('/usuario', (req, res) => {
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
});

// Get usuario con _id
router.get('/usuario/:id', (req, res) => {
    let id = req.params.id;
    // buscamos usuarios con ese id
    Usuario.findById(id, (err, usuario) => {
        // Fallo con la base
        if (err) return res.status(500).send({
            msg: `Error con la BBDD usuario: ${err}`
        });
        // Usuario no encontrado
        if (!usuario) return res.status(404).send({
            msg: 'Error, el usuario no existe'
        });
        //Clave y variable mismo nombre
        res.status(200).send({
            usuario
        });
    });
});


// controlar error email duplicado
// Post añadir usuario
router.post('/usuario', (req, res) => {
    console.log(req.body);
    let usuario = new Usuario();
    usuario.name = req.body.name;
    usuario.telefono = req.body.telefono;
    usuario.email = req.body.email;
    usuario.password = req.body.password;
    usuario.categoria = req.body.categoria;
    // usuario es un objeto de mongoose por lo que podemos usar save
    usuario.save((err, usuarioStored) => {
        if (err) res.status(500).send({
            msg: `Error al registrar usuario: ${err}`
        });
        res.status(200).send({
            usuario: usuarioStored
        });
    });
});

// Put modificar usuario
router.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    // parametros a actualizar
    let update = req.body;
    Usuario.findByIdAndUpdate(id, update, (err, usuarioUpdate) => {
        if (err) res.status(500).send({
            msg: `Error al alctualizar usuario: ${err}`
        });
        res.status(200).send({
            usuario: usuarioUpdate
        });
    })
});

// Delete añadir usuario
router.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findById(id, (err, usuarioDelete) => {
        //error base
        /* Conflicto con no encontrar usuario
        if (err) res.status(500).send({
            msg: `Error al borrar usuario: ${err}`
        });*/
        if (!usuarioDelete) return res.status(404).send({
            msg: 'Error, el usuario no existe'
        });
        usuarioDelete.remove(err => {
            //error borrar usuario
            if (err) res.status(500).send({
                msg: `Error al borrar usuario: ${err}`
            });
            //delete aceptado
            res.status(200).send({
                msg: 'Usuario eliminado'
            });
        });
    });
});

// exportamos el modulo
module.exports = router;