// Servicio para crear TOKENs y descrifrarlos

//const jwt = require('jwt-simple');  //--> Prueba con jwt
const jwt = require('jsonwebtoken')
const config = require('../config/config');
// Importamos la clave de config
const clave = require('../config/config');

/* Cambiada, cracion de token por JWT simple
function crearToken(usuario) {
    // la informacion o "carga" del token https://www.npmjs.com/package/jwt-simple
    const payload = {
        sub: usuario._id
        // iat: creacion del token
        // exp: caducidad del token
    };
    return jwt.encode(payload, clave.secreto);
}
*/
// Token por JWT con caducidad
function crearToken(usuario) {
    const payload = jwt.sign({
        sub: usuario._id,
    }, clave.secreto, {
        expiresIn: 60 * 60 * 24 * 15
    }); // caduca en 30 dias
    return payload;
}

function descifrarToken(token) {
    // Guardamos el toquen descifrado y empleamos una promesa(resolve,reject)
    const decoded = new Promise((res, rej) => {
        try {
            /*jwt.verify(token, config.secreto, (error, decode) => {
                if (error) rej({
                    status: 500,
                    msg: 'Token invalido'
                });
                res(decode);
            });*/
            const payload = jwt.decode(token, config.secreto);
            // si resuelve envia 
            res(payload.sub);

        } catch (error) {
            // Con error rechaza la promesa
            rej({
                status: 500,
                msg: 'Token invalido'
            });
        }
    });
    // Devuelve el resultados
    return decoded;
}
module.exports = {
    crearToken,
    descifrarToken
}