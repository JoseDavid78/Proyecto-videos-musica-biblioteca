const express = require("express");
const cors = require("cors");
const port = 3000;

const api = express();

api.use(express.json());
api.use(cors());
api.use('/api/v1', require('./rutas.js'));

api.listen(port, () =>{
    console.log(`servidor corriendo por el puerto: ${port}`);
});