const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// encriptado de contraseña
const bcrypt = require('bcrypt-nodejs');

// Definimos un esquema de mongoose
const UsuarioSchema = Schema({
    name: String,
    telefono: Number,
    // emails unicos en la base
    email: {
        type: String,
        //unique: true,
        lowercase: true
    },
    // no puede ser devuelto el campo en un select
    password: {
        type: String,
        select: false
    },
    fechaAlta: {
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: String,
        enum: ['cliente', 'admin']
    }
});

// encripta la contraseña antes de guardarse https://www.npmjs.com/package/bcrypt
UsuarioSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

let usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = usuario;