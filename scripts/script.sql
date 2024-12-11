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

drop table if exists Productos;
create table Productos(
	Idproducto integer not null auto_increment primary key,
	NombreProducto varchar (50),
	PrecioProducto decimal (16,2),
	EstatusProducto boolean,
	ExistenciaProducto int(10)
);


drop table if exists Movimientos;
create table Movimientos(
	Idmovimiento integer not null auto_increment primary key,
	Movimiento varchar (50)
);

drop table if exists Inventarios;
create table Inventarios(
	Idinventario integer not null auto_increment primary key,
	FechaInventario datetime,
	Cantidad int(10),
	UsuarioId int not null,
	foreign key (UsuarioId) references Usuarios(Idusuario) on delete cascade on update cascade,
	ProductoId int not null,	
	foreign key (ProductoId) references Productos(Idproducto) on delete cascade on update cascade,
	MovimientoId int not null,
	foreign key (MovimientoId) references Movimientos(Idmovimiento) on delete cascade on update cascade
);