// Busqueda de datos (musica)

const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conneccionMySQL');

router.post("/crear", (req, res) => {
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

// Busqueda de datos (videos)
router.post("/crear", (req, res) => {
    const nombre2 = req.body.nombre;
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

router.post("/leer", (req, res) => {
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

// Busqueda de datos (Albums)
router.post('/entrada', async (req, res) => {
    try  {
        const email = req.body.reslutadoinput;
        const contrasena = req.body.reslutadoinput2;
        if (!email || !contrasena) {
            return res.status(200).json({ status: 204, mensaje: "Ningun campo puede estar vacion" });
        }
        const result = await Mysqlconn.query("select * from usuarios where email = ?", [email]);
        if (result.length > 0 ) {
            if (bcrypt.compareSync(contrasena, result[0].contrasena)) {
                const login_token =jwt.sing({ email }, process.env.secret_key, { expirestIn: "24h" });
                return res.status(200).json({ status: 200, login_token });
            }
        }
        res.status(401).json({ status: 401, message: "Datos de entrada incorrectos" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Error en el servidor" + error  });
    }
});
// prototipo de entrada

router.post('/login', async (req, res) => {
    try {
        const nombre = req.body.reslutadoinput3;
        const email = req.body.reslutadoinput4;
        const contrasena = req.body.reslutadoinput5;
        if (!nombre || !email || !contrasena) {
            return res.status(200).json({ status: 204, message: "Ningun campo puede estar vacio"});
        }
        const id = uuid_v4();
        const salt = bcrypt.genSaltSync(10);4
        const hashPassword = bcrypt.hashSync(contrasena,salt);
        await Mysqlconn.query("insert into usuarios values (?, ?, ?, ?, default)", [id, email, nombre, hashPassword]);
        res.status(200).json({ status: 200, message: "Usuario registrado correctamente" });
    } catch (error) {
        handleError(re, error, "Error en el registro de usuario");
    }
});
// prototipo de login
// aun falta acoplarlo y que sea coherente 


router.post('./album', async (req,res) => {
    try{
        const numero_album = req.body.numero_album;
        const nombre_album = req.bofy.nombre_album;
        const tipo = req.body.tipo;
        if (!numero_album || !nombre_album || !tipo) {
            return res.status(200).json({status: 204, mensaje: "No existe el album o los campos estan bacios"});
        }
        await Mysqlconn.query("insert into albums values (default, ?, ?, ? )", [numero_album,nombre_album,tipo]);
        res.status(200).json({ status: 200, message: "Albun encontrado" });
    }catch (error) {
        handleError(re, error, "Error al colocar lo datos");
    }
});


//mejorar codigo y ver lo errores.
// investigar si esta bien o mal ya que no se entiende del todo.

//aun falta arreglar el codigo y acoplarlo bien ademas de mejorarlo

// el segundo es un esqueleto de los videos falta mejorarlo hacerlo despues de terminar la api de musica.
// aun falta mas rutas para combinar mysql y visual basicamente la base de datos aun no se cuales pero lo averiguare
// aun son prototipos no estan completos
// url api de artista de la aplicacion dezzer https://api.deezer.com/search/artist?q=metallica
// buscar sonicApi puede ser muy interesante
// AI Vocal Remover este es tipo karaoke hay  otro mas
// https://www.splitter.ai/ ese