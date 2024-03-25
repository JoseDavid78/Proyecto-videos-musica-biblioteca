const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conneccionMySQL');

router.post("./crear", (req, res) => {
    const nombre = req.body.nombre;
    const sql = conexionMySQL.query("insert into musica values (default, '" + nombre + "')");
    conexionMySQL.query(sql, error => {
        if (error) {
            res.json({
                "status": 500,
                "mensaje": "Error en la insercion de datos. ERROR: " + error
            });
        } else {
            res.json({
                "status": 200,
                "mensaje": "Dato insertado correctamente"
            });
        }
    });
});


router.post("./crear", (req, res) => {
    const nombre = req.body.nombre;
    const sql = conexionMySQL.query("insert into videos values (default, '" + nombre2 + "')");
    conexionMySQL.query(sql, error => {
        if (error) {
            res.json({
                "status": 500,
                "mensaje": "Error en la insercion de datos. ERROR: " + error
            });
        } else {
            res.json({
                "status": 200,
                "mensaje": "Dato insertado correctamente"
            });
        }
    });
});

router.post("./leer", (req, res) => {
    const nombre = req.body.nombre;
    const sql = conexionMySQL.query("insert into usuarios values (default, '" + nombre1 + "')");
    conexionMySQL.query(sql, error => {
        if (error) {
            res.json({
                "status": 500,
                "mensaje": "Error en la insercion de datos. ERROR: " + error
            });
        } else {
            res.json({
                "status": 200,
                "mensaje": "Datos insertados correctamente"
            });
        }
    });
});


//mejorar codigo y ver lo errores.
// investigar si esta bien o mal ya que no se entiende del todo.

//aun falta arreglar el codigo y acoplarlo bien ademas de mejorarlo

// el segundo es un esqueleto de los videos falta mejorarlo hacerlo despues de terminar la api de musica.
// aun falta mas rutas para combinar mysql y visual basicamente la base de datos aun no se cuales pero lo averiguare
// aun son prototipos no estan completos
