drop database if exists proyecto;
create database proyecto;
use proyecto;

create table musica(
id int primary key auto_increment,
nombre varchar (255)
);

select * from musica; 