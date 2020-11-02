//const jwt = require('jwt-simple');
//const config = require('../config/config');

//const { response } = require('express');

const services = require('../services/token');

// Comprueba los tokens
function isAuth(req, res, next) {
    // Comprueba en los header de la peticion
    if (!req.headers.authorization) {
        return res.status(403).send({
            msg: ' No estas autorizado'
        });
    }
    // extraemos el token de la cabecera (Bearer 123123.asdasd<--token)
    const token = req.headers.authorization.split(" ")[1];
    // Extraemos el cuerpo del token decodificado ---> movido al servicio token
    //const payload = jwt.decode(token, config.secreto);
    // El servicio es una promesa, cuando se resuelve continua la funcion
    //console.log(token);
    services.descifrarToken(token)
        .then(respuesta => {
            req.usuario = respuesta;
            next();
        })
        .catch(respuesta => {
            res.status(respuesta.status);
        })
    return req.usuario;
}

module.exports = isAuth;