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

show tables;

SELECT * FROM almacen.Roles r ;
SELECT * from almacen.Usuarios u ;
SELECT * from almacen.Productos p ;
SELECT * from almacen.Inventarios i ;
SELECT * FROM almacen.Movimientos m ;

INSERT INTO almacen.Roles (Idrol, Rolusuario) VALUES(0, 'admin');
INSERT INTO almacen.Roles (Idrol, Rolusuario) VALUES(0, 'almacenista');

INSERT INTO almacen.Movimientos (Idmovimiento, Movimiento) VALUES(0, 'Entrada');
INSERT INTO almacen.Movimientos (Idmovimiento, Movimiento) VALUES(0, 'Venta');

INSERT INTO almacen.Usuarios (NombreUsuario,CorreoUsuario,PasswordUsuario,EstatusUsuario,RolId) VALUES
	 ('fernando perez','fer@email.com','$2a$10$fBq6VSr05SgIkJwj6ZNax.Tx0bx8iVEzubvGxx.Beq7VNRMFvD6/q',1,1),
	 ('maria juarez','maria@email.com','$2a$10$fBq6VSr05SgIkJwj6ZNax.Tx0bx8iVEzubvGxx.Beq7VNRMFvD6/q',1,2),
	 ('jose ramirez','jose@email.com','$2a$10$YPjm1ItLJ5/0NBrAXPsfVONHjLmkCfnlLG3chfwytBcimxf6eFzum',1,2),
	 ('ana lopez','ana@email.com','$2a$10$7/6pQ0tv.Mj6ZwZHD0PEt.zejw36TiANqo30hbX/AvudNMc2gZRye',1,2);

-- querys productos
INSERT INTO almacen.Productos (Idproducto, Nombreproducto, Precioproducto,EstatusProducto,ExistenciaProducto) VALUES(0, 'laptop', 3000.00,1,0);
INSERT INTO almacen.Productos (Idproducto, Nombreproducto, Precioproducto,EstatusProducto,ExistenciaProducto) VALUES(0, 'pc', 4000.00,1,0);
INSERT INTO almacen.Productos (Idproducto, Nombreproducto, Precioproducto,EstatusProducto,ExistenciaProducto) VALUES(0, 'mouse', 100.00,1,0);
INSERT INTO almacen.Productos (Idproducto, Nombreproducto, Precioproducto,EstatusProducto,ExistenciaProducto) VALUES(0, 'teclado', 150.00,1,0);
INSERT INTO almacen.Productos (Idproducto, Nombreproducto, Precioproducto,EstatusProducto,ExistenciaProducto) VALUES(0, 'monitor', 2000.00,1,0);
INSERT INTO almacen.Productos (Idproducto, Nombreproducto, Precioproducto,EstatusProducto,ExistenciaProducto) VALUES(0, 'microfono', 350.00,1,0);
INSERT INTO almacen.Productos (Idproducto, Nombreproducto, Precioproducto,EstatusProducto,ExistenciaProducto) VALUES(0, 'audifonos', 450.00,1,0);

INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 8, 3, 5, 2);
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 15, 2, 1, 2); --
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 13, 4, 6, 2);
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 4, 3, 6, 2);
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 3, 2, 2, 2);
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 1, 4, 5, 2); --
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 5, 2, 4, 2); --
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 5, 3, 2, 2);
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 2, 3, 6, 2);
INSERT INTO almacen.Inventarios (Idinventario, FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId)VALUES (0, '2024-12-12', 8, 4, 1, 2);


-- Traer todos los productos que tengan una venta
select p.Idproducto, m.Movimiento, p.NombreProducto from almacen.Productos p 
join almacen.Inventarios i 
on p.Idproducto = i.ProductoId 
inner join almacen.Movimientos m 
on m.Idmovimiento = i.MovimientoId where i.MovimientoId =2 GROUP BY (p.Idproducto)  ;

-- Traer todos los productos que tengan ventas y la cantidad total de productos vendidos.
select p.Idproducto, m.Movimiento, p.NombreProducto, p.PrecioProducto, sum(i.Cantidad), sum(p.PrecioProducto*i.Cantidad) from almacen.Productos p 
inner join almacen.Inventarios i 
on p.Idproducto = i.ProductoId 
inner join almacen.Movimientos m 
on m.Idmovimiento = i.MovimientoId where p.Idproducto=2 GROUP by (i.MovimientoId );

-- Traer todos los productos (independientemente de si tienen ventas o no) y la suma total ($) vendida por producto
select p.Idproducto, p.NombreProducto, p.PrecioProducto, m.Movimiento, i.Cantidad from almacen.Productos p 
left join almacen.Inventarios i 
on p.Idproducto = i.ProductoId 
left join almacen.Movimientos m 
on m.Idmovimiento = i.MovimientoId 
 


