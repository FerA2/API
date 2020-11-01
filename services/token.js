// Servicio para crear el JWT

const jwt = require('jwt-simple');
const config = require('../config/config');
// Importamos la clave de config
const clave = import('../config/config');

function crearToken(usuario) {
    // la informacion o "carga" del token https://www.npmjs.com/package/jwt-simple
    const payload = {
        sub: usuario.body
        // iat: creacion del token
        // exp: caducidad del token
    };
    return jwt.encode(payload, clave.secreto);
}

function descifrarToken(token) {
    // Guardamos el toquen descifrado y empleamos una promesa(resolve,reject)
    const decoded = new Promise((res, rej) => {
        try {
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
    // Devuelve el resusltado
    return decoded;
}
module.exports = {
    crearToken,
    descifrarToken
}