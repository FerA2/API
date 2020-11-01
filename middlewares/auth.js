// comprobar rutas autorizadas

//const jwt = require('jwt-simple');
//const config = require('../config/config');

//const { response } = require('express');

const services = require('../services/token');

function isAdmin(req, res, next) {
    // Comprueba en los header de la peticion
    if (!req.headers.autorization) {
        return res.status(403).send({
            msg: ' No estas autorizado'
        });
    }
    // extraemos el token de la cabecera
    const token = req.headers.autorization.split(" ")[1];
    // Extraemos el cuerpo del token decodificado ---> movido al servicio token
    //const payload = jwt.decode(token, config.secreto);
    // El sercicio es una promesa, cuando se resuelve continua la funcion
    services.descifrarToken(token)
        .then(respuesta => {
            req.user = respuesta;
        })
        .catch(respuesta => {
            res.status(respuesta.status);
        })
    return req.user = payload.sub;
}

module.exports = isAdmin;