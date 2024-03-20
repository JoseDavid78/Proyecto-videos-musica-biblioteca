const express = require ('express');
const router  = express.Router();

const conexionMySQL = require('./conneccionMySQL');

router.post("./crear", (req,res) => {
    const nombre = req.body.nombre;
    const sql = conexionMySQL.query("insert into Musica values (default, '" + nombre + "')");
    conexionMySQL.query(sql, error => {
        if (error) {
            res.json({
                "status": 500,
                "mensaje": "Error en la insercion de datos. ERROR: "  +error
            });
        } else {
            res.json({
                "status": 200,
                "mensaje": "Dato insertado correctamente"
            });
        }
    });
});

//mejorar codigo y ver lo errores
// investigar si esta bien o mal ya que no se entiende del todo