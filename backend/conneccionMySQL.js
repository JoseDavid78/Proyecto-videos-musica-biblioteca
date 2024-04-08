// Conexion MYSQL

const mysql = require("mysql");

const conexionMySQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto'
});

conexionMySQL.connect(err => {
    if (err) {
        console.log('Error en la conexion MySQL', err);
    }
    console.log('Base de datos MySQL conectada');
});

module.exports = conexionMySQL;

// falta la gestion de errores por si ocurre un fallo o mejorar la comunicacion cliente servidor.