-- Crear base de datos
create database almacen;

-- Gestionar bd
use almacen;

 -- Crear tablas
drop table if exists Roles;
create table Roles(
	Idrol integer not null auto_increment primary key,
	Rolusuario varchar (50)
);

drop table if exists Usuarios;
create table Usuarios(
	Idusuario integer not null auto_increment primary key,
	NombreUsuario varchar (50),
	CorreoUsuario varchar (70),
	PasswordUsuario varchar (70),
	EstatusUsuario bool,
	RolId int not null,
	foreign key (RolId) references Roles(Idrol) on delete cascade on update cascade
);