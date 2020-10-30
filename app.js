// Usando ES5 para evitar errores con Bavel en heroku

// Importamos express
const express = require('express');
// Middleware para las peticiones http
const bodyParser = require('body-parser');
// Middleware para evitar CORS
const cors = require('cors');



//  importamos rutas
const indexRouter = require('./routes/index');
const userRouter = require('./routes/usuario');

const app = express();

// El puerto sera una variable de entorno PORT o en su defecto 3000
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
// Usamos formato JSON
app.use(bodyParser.json());

app.use(cors());

//Rutas
app.use('/', indexRouter);
app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`API REST http://localhost:${port}`);
});