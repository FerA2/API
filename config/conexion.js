// Libreria para trabajar bbdd MongoDb
const mongoose = require('mongoose');

// Direccion BBDD en local
mongoose.connect('mongodb://localhost:27017/hotel', (err, res) => {
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

module.exports = mongoose;