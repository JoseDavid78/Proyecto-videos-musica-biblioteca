drop database if exists proyecto;
create database proyecto;
use proyecto;

create table musica(
id int primary key auto_increment,
nombre_musica varchar (255),
autor varchar (255)
);

insert into musica values (default, "","");


create table videos(
id int primary key auto_increment,
nombre_video varchar (255),
autor varchar (255),
);

insert into videos values (default, "", "");

select * from videos;

select * from musica; 

poner mas tablas que tenga relacion coerente y los campos adecuados para cada tabla