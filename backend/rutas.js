// Busqueda de datos (musica)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuid_v4 } = require('uuid');

const conexionMySQL = require('./conneccionMySQL');

// Crear nueva canción
router.post("/musica", async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ status: 400, mensaje: "El nombre de la canción es obligatorio" });
        }
        await conexionMySQL.query("INSERT INTO musica (nombre) VALUES (?)", [nombre]);
        res.status(200).json({ status: 200, mensaje: "Canción creada correctamente" });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: "Error en la inserción de datos. ERROR: " + error });
    }
});

// Crear nuevo video
router.post("/videos", async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ status: 400, mensaje: "El nombre del video es obligatorio" });
        }
        await conexionMySQL.query("INSERT INTO videos (nombre) VALUES (?)", [nombre]);
        res.status(200).json({ status: 200, mensaje: "Video creado correctamente" });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: "Error en la inserción de datos. ERROR: " + error });
    }
});

// Crear nuevo usuario
router.post("/usuarios", async (req, res) => {
    try {
        const { nombre, apellido, email, contraseña, fecha_nacimiento, genero } = req.body;
        if (!nombre || !apellido || !email || !contraseña || !fecha_nacimiento || !genero) {
            return res.status(400).json({ status: 400, mensaje: "Todos los campos son obligatorios" });
        }
        const hashPassword = await bcrypt.hash(contraseña, 10);
        await conexionMySQL.query("INSERT INTO usuarios (nombre, apellido, email, contraseña, fecha_nacimiento, genero) VALUES (?, ?, ?, ?, ?, ?)", 
            [nombre, apellido, email, hashPassword, fecha_nacimiento, genero]);
        res.status(200).json({ status: 200, mensaje: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: "Error en el registro de usuario. ERROR: " + error });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        if (!email || !contraseña) {
            return res.status(400).json({ status: 400, mensaje: "Email y contraseña son obligatorios" });
        }
        const usuario = await conexionMySQL.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (usuario.length === 0) {
            return res.status(404).json({ status: 404, mensaje: "Usuario no encontrado" });
        }
        const match = await bcrypt.compare(contraseña, usuario[0].contraseña);
        if (!match) {
            return res.status(401).json({ status: 401, mensaje: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ id: usuario[0].id, email: usuario[0].email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ status: 200, token });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: "Error en el servidor. ERROR: " + error });
    }
});

module.exports = router;
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