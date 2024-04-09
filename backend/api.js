// Abrir el servidor 

const express = require("express");
const cors = require("cors");
const port = 3000;
const api = express();

api.use(express.json());
api.use(cors());
api.use('/api/v1', require('./rutas.js'));

api.listen(port, () => {
    console.log(`servidor corriendo por el puerto: ${port}`);
});

// posible fallo en el codigo buscar en caso de que sea el caso revisar el codigo
// la linea 9 esta mal creo que es por el use('/api/v1') revisarlo bien en casa