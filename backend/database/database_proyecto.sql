drop database if exists proyecto;
create database proyecto;
use proyecto;

create table musica(
id int primary key auto_increment,
nombre_musica varchar (255),
autor varchar (255),
fecha date
);

insert into musica values (default, "","", "");


create table videos(
id int primary key auto_increment,
nombre_video varchar (255),
autor varchar (255),
fecha date
);

insert into videos values (default, "", "","");

create table usuarios(
id int primary key auto_increment,
nombre varchar (255),
apellido varchar (255),
email varchar (255),
contraseña varchar (255),
fecha_nacimiento date,
genero boolean
);

insert into usuarios values (default, "", "", "","",""); 

create table albums(
numero_album int primary key auto_increment,
nombre_album varchar (255),
tipo varchar(255),
numero_de_canciones int
);

insert into albums values (default, "", "", "",);

select * from usuarios;

select * from videos;

select * from musica; 

select * from albums;

poner mas tablas que tenga relacion coerente y los campos adecuados para cada tabla