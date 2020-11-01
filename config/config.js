// puerto API
const port = process.env.PORT || 3000;
// URL mongoDb
const db = 'mongodb://localhost:27017/hotel';
// Clave Jwt
const secreto = "clave-JWT";

module.exports = {
    port,
    db,
    secreto
}