-- Crear la base de datos
DROP DATABASE IF EXISTS proyecto;
CREATE DATABASE proyecto;
USE proyecto;

-- Tabla para almacenar datos de música consumidos de la API
CREATE TABLE IF NOT EXISTS `proyecto`.`musica` (
    `id` INT NOT NULL,
    `nombre` VARCHAR(255) NOT NULL, 
    `autor_id` INT NOT NULL,
    `fecha` DATE NOT NULL,
    `album_id` INT NOT NULL,
    PRIMARY KEY AUTO_INCREMENT (`id`),
    CONSTRAINT ´fk_musica_artistas_albums´
		FOREIGN KEY (`autor_id`) REFERENCES `proyecto`.`artistas`(`id`),
		FOREIGN KEY (`album_id`) REFERENCES `proyecto`.`albums`(`id`)
);

-- Tabla para almacenar datos de videos consumidos de la API
CREATE TABLE IF NOT EXISTS `proyecto`.`videos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(255),
    `autor_id` INT,
    `fecha` DATE,
    `album_id` INT,
    FOREIGN KEY (`autor_id`) REFERENCES `proyecto`.`artistas`(`id`),
    FOREIGN KEY (`album_id`) REFERENCES `proyecto`.`albums`(`id`)
);

-- Tabla para almacenar información sobre los usuarios
CREATE TABLE IF NOT EXISTS `proyecto`.`usuarios` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(255),
    `apellido` VARCHAR(255),
    `email` VARCHAR(255) UNIQUE,
    `contraseña` VARCHAR(255),
    `fecha_nacimiento` DATE,
    `genero` ENUM('Masculino', 'Femenino', 'Otro')
);

-- Tabla para almacenar información sobre los álbumes
CREATE TABLE IF NOT EXISTS `proyecto`.`albums` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(255),
    `tipo` ENUM('Musica', 'Video'),
    `numero_de_canciones` INT
);

-- Tabla para almacenar información sobre los artistas
CREATE TABLE IF NOT EXISTS `proyecto`.`artistas` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(255)
);

-- Tabla para almacenar las relaciones entre usuarios y música
CREATE TABLE IF NOT EXISTS `proyecto`.`usuario_musica` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `usuario_id` INT,
    `musica_id` INT,
    FOREIGN KEY (`usuario_id`) REFERENCES `proyecto`.`usuarios`(`id`),
    FOREIGN KEY (`musica_id`) REFERENCES `proyecto`.`musica`(`id`)
);

-- Tabla para almacenar las relaciones entre usuarios y videos
CREATE TABLE IF NOT EXISTS `proyecto`.`usuario_videos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `usuario_id` INT,
    `video_id` INT,
    FOREIGN KEY (`usuario_id`) REFERENCES `proyecto`.`usuarios`(`id`),
    FOREIGN KEY (`video_id`) REFERENCES `proyecto`.`videos`(`id`)
);

insert into albums values (default, "", "", "");

select * from usuarios;

select * from videos;

select * from musica; 

select * from albums;

--poner tablas que tenga relacion coerente y los campos adecuados para cada tabla