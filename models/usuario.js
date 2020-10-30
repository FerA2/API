const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Definimos un esquema de mongoose
const UsuarioSchema = Schema({
    name: String,
    telefono: Number,
    categoria: {
        type: String,
        enum: ['cliente', 'admin']
    }
});

let usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = usuario;