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
