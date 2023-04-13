CREATE SCHEMA `mercado_casacas`;

USE `mercado_casacas`;
 CREATE TABLE clientes(
 id INT UNSIGNED PRIMARY KEY NOT NULL auto_increment,
 nombre VARCHAR(20) NOT NULL,
 email VARCHAR(50) NOT NULL UNIQUE,
 contrasena VARCHAR(200) NOT NULL,
 foto_perfil VARCHAR(200),
 dni INT NOT NULL UNIQUE,
 fecha_de_nacimiento date not null,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
 update_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );

USE `mercado_casacas`;
DESCRIBE `clientes`;

 USE `mercado_casacas`;
INSERT INTO `clientes` (nombre, email, contrasena, dni, fecha_de_nacimiento) 
VALUES ('Tomas', 'tchaiman@udesa.edu.ar', 'diego', 45582137 , '2004-02-22'),
 ('Marcos', 'mquiroga@udesa.edu.ar', 'javi123', 45652137 , '2004-03-13'), 
 ('Joaquin', 'jfernandez@udesa.edu.ar', 'bocacampeon', 45855437 , '2004-04-23'), 
 ('Martin', 'mgonzalez@udesa.edu.ar', 'losborrachos14', 44659130 , '2003-03-30'),
 ('Gonzalo', 'grodriguez@udesa.edu.ar', 'canichetoy', 45654532 , '2004-10-06')
 ;
CREATE TABLE productos(
 id INT UNSIGNED PRIMARY KEY NOT NULL auto_increment,
 id_cliente INT UNSIGNED NOT NULL,
 nombre VARCHAR(200) NOT NULL,
 descripcion VARCHAR(1500) NOT NULL UNIQUE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
 update_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP NULL,
CONSTRAINT fk_productos_clientes FOREIGN KEY(id_cliente) REFERENCES clientes(id)
);
INSERT INTO productos(id_cliente, nombre, descripcion)
VALUES (1, 'Remera Barcelona', 'Camiseta oficial de partido'),
(1, 'Remera Atletico Mineiro', 'Camiseta titular de Atletico Mineiro temporada 2021/22!Talle S al XL-Stock inmediato para despacho o retiro, en caso de ser estampada demora dos o tres dias'),
(1, 'Remera Racing', 'Camiseta oficial de partido'),
(2, 'Remera Bayer Munich', 'Camiseta oficial de partido'),
(3, 'Remera Boca', 'Camiseta oficial de partido'),
(5, 'Remera Independiente', 'Camiseta oficial de partido'),
(4, 'Remera Alaves', 'Camiseta oficial de partido'),
(2, 'Remera Juventus', 'Camiseta oficial de partido'),
(5, 'Remera Manchester City', 'Camiseta oficial de partido'),
(3, 'Remera Marsella', 'Camiseta oficial de partido')
;
CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY NOT NULL auto_increment,
id_cliente INT UNSIGNED NOT NULL,
id_producto INT UNSIGNED NOT NULL,
comentario VARCHAR(500) NOT NULL UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
update_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP NULL,
CONSTRAINT fk_comentarios_clientes FOREIGN KEY(id_cliente) REFERENCES clientes(id),
CONSTRAINT fk_comentarios_productos FOREIGN KEY(id_producto) REFERENCES productos(id)
);

INSERT INTO comentarios(id_cliente, id_producto, comentario)
 VALUES (1, 11, 'La remera del Barca, 10 puntos'),
 (5, 16, 'La remera del Rojo, 10 puntos'),
 (1, 12, 'La remera del Atletico Mineiro, increible'),
 (1, 12, 'La remera del Atletico Mineiro muy mala'),
 (1, 13, 'La remera de Racing muy buena'),
 (4, 17, 'La remera del Alaves llego perfecta'),
 (3, 15, 'La remera de Boca muy mala'),
 (4, 14, 'La remera del Bayer muy buena'),
 (5, 19, 'La remera del City muy buena'),
 (2, 18, 'La remera de la Juve muy buena')
;