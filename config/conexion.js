// Libreria para trabajar bbdd MongoDb
const mongoose = require('mongoose');

const BBDD = require('./config');

// Direccion BBDD en local
mongoose.connect(BBDD.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar BBDD: ${err}`);
    }
    console.log('Conectado a la BBDD');
}, {
    useMongoClient: true
}, {
    useUnifiedTopology: true
}, {
    useFindAndModify: false
});



module.exports = {
    mongoose
    //port
};