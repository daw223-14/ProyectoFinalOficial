CREATE DATABASE cycle;
USE `cycle`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `pedidos` (
  `pedidoID` int(11) NOT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `fechaPedido` datetime DEFAULT current_timestamp(),
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pedidos` (`pedidoID`, `correo`, `telefono`, `direccion`, `fechaPedido`, `nombre`) VALUES
(1, 'patricia@gmail.com', '60309423', 'Calle ejemplo 4', '2023-08-10 01:53:23', 'patr'),
(2, 'ejemplo@gmail.com', '63823941', 'avd lorem 2', '2023-08-10 14:32:30', 'ejem'),
(3, 'juan@gmail.com', '40385829', 'plaza verde', '2023-08-10 14:41:00', 'austin');

CREATE TABLE `productos_pedidos` (
  `productos_pedidosID` int(11) NOT NULL,
  `pedidoID` int(11) NOT NULL,
  `productoID` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `productos_pedidos` (`productos_pedidosID`, `pedidoID`, `productoID`, `cantidad`) VALUES
(1, 2, 1, 1),
(2, 3, 1, 2),
(3, 3, 8, 1);

CREATE TABLE `productos` (
  `productoID` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `marca` varchar(50) NOT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  `cantidadVendido` int(11) DEFAULT NULL,
  `fechaAñadido` date NOT NULL DEFAULT CURRENT_DATE,
  `rutaimg` varchar(150) DEFAULT NULL,
  `precio_anterior` int(11) DEFAULT NULL,
  PRIMARY KEY (`productoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `productos` (`productoID`, `nombre`, `genero`, `descripcion`, `marca`, `precio`, `cantidadVendido`, `fechaAñadido`, `rutaimg`, `precio_anterior`) VALUES
(1, 'Nike LD Waffle Sacai Black Nylon', 'hombre', 'Nike LD Waffle Sacai Black Nylon', 'Nike', '401.00', 3, '2023-05-25', 'src/assets/img01.jpg', NULL),
(2, 'Nike Dunk Low Off-White Pine Green', 'hombre', 'Nike Dunk Low Off-White Pine Green', 'Nike', '49.99', 10, '2023-05-25', 'src/assets/img02.jpg', 55),
(3, 'Nike Air Force 1 Low Supreme Black', 'hombre', 'Nike Air Force 1 Low Supreme Black', 'Nike', '59.99', 3, '2023-05-25', 'src/assets/img03.jpg', NULL),
(4, 'Nike LD Waffle Sacai White Nylon', 'hombre', 'Nike LD Waffle Sacai White Nylon', 'Nike', '79.99', 0, '2023-05-25', 'src/assets/img04.jpg', NULL),
(5, 'NikNike Dunk Low SP Kentucky (2021)e', 'mujer', 'Nike Dunk Low SP Kentucky (2021)', 'Nike', '39.99', 0, '2023-05-25', 'src/assets/img05.jpg', NULL),
(6, 'Nike Dunk Low Off-White University', 'mujer', 'Nike Dunk Low Off-White University', 'Nike', '19.99', 0, '2023-05-25', 'src/assets/img06.jpg', 0),
(7, 'Nike Air Max 2 Light Atmos', 'mujer', 'Nike Air Max 2 Light Atmos', 'Nike', '34.99', 0, '2023-05-25', 'src/assets/img07.jpg', NULL),
(8, 'Nike Air Force 1 Low CLOT Blue Silk', 'mujer', 'Nike Air Force 1 Low CLOT Blue Silk', 'Nike', '24.99', 5, '2023-05-25', 'src/assets/img08.jpg', 56),
(9, 'Nike Air Max 90 OG Volt (2020)', 'niños', 'Nike Air Max 90 OG Volt (2020)', 'Nike', '89.99', 1, '2023-05-25', 'src/assets/img09.jpg', NULL),
(10, 'Nike Dunk High Varsity Maize', 'niños', 'Nike Dunk High Varsity Maize', 'Nike', '59.99', 8, '2023-05-25', 'src/assets/img010.jpg', 88),
(11, 'Nike Air Rubber Dunk Off-White UNC', 'niños', 'Nike Air Rubber Dunk Off-White UNC', 'Nike', '29.99', 0, '2023-05-25', 'src/assets/img011.jpg', NULL),
(12, 'Adidas Campus 00s Core Black', 'hombre', 'Adidas Campus 00s Core Black', 'Adidas', '106.00', 0, '2024-05-03', 'src/assets/img012.jpg', NULL),
(13, 'Adidas Handball Spezial',	'mujer',	'Adidas Handball Spezial Navy Gum',	'Adidas',	'112.00',	0, '2024-05-11', 'src/assets/img013.jpg', NULL),
(14, 'Adidas', 'Yeezy Boost 350 V2',	'hombre',	'Adidas Yeezy Boost 350 V2 Core Black Red',	'Adidas',	'303.00',	0,	'2024-05-09',	'src/assets/img014.jpg', NULL),
(15, 'Adidas', 'Superstart', 'hombre',	'Adidas Superstar Shelltoe Teenage Mutant Ninja Turtles',	'Adidas',	'126.00',	0,	'2024-05-02',	'src/assets/img015.jpg', NULL),
(16, 'Adidas', 'Gazelle Bold True Pink',	'mujer',	"Adidas Gazelle Bold True Pink (Women's)",	'Adidas',	'152.00',	0,	'2024-05-10',	'src/assets/img016.jpg', NULL),
(17, 'Adidas', 'Samba OG Silver Green',	'mujer',	'Adidas Samba OG Silver Green',	'Adidas',	'143.00',	0,	'2024-05-10',	'src/assets/img017.jpg', NULL),
(18, 'Adidas', 'Samba OG Black White Gum (GS)',	'niños',	'Adidas Samba OG Black White Gum (GS)',	'Adidas',	'73.00',	0,	'2024-05-01',	'src/assets/img018.jpg', NULL),
(19, 'Adidas', 'Samba OG Footwear White Purple (Kids)',	'niños',	'Adidas Samba OG Footwear White Purple (Kids)',	'Adidas',	'173.00',	0,	'2024-04-26',	'src/assets/img019.jpg', NULL),
(20, 'Puma', 'Suede One Piece Straw Hat Luffy',	'mujer',	'Puma Suede One Piece Straw Hat Luffy',	'Puma',	'102.00',	0,	'2024-05-10',	'src/assets/img020.jpg', NULL),
(21, 'Puma', 'Suede One Piece Blackbeard Teech'	'hombre',	'Puma Suede One Piece Blackbeard Teech',	'Puma',	'97.00',	0,	'2024-05-03',	'src/assets/img021.jpg', NULL),
(22, 'Puma', 'Palermo Palomo Regal Red'	'hombre',	'Puma Palermo Palomo Regal Red', 'Puma',	'106.00',	0,	'2024-05-02',	'src/assets/img022.jpg', NULL),
(23, 'Puma', 'Palermo Sophia Chang Frosted Ivory',	'mujer', 'Puma Palermo Sophia Chang Frosted Ivory',	'Puma',	'136.00',	0,	'2024-05-03',	'src/assets/img023.jpg', NULL);
(24, 'Puma', 'Future Rider SpongeBob SquarePants (GS)',	'niños',	'Puma Future Rider SpongeBob SquarePants (GS)',	'Puma',	'61.00'	0,	'2024-05-03',	'src/assets/img024.jpg', NULL);
(25, 'Puma', 'RS-X Toys White (GS)',	'niños',	'Puma RS-X Toys White (GS)',	'Puma',	'93.00',	0,	'2024-05-03',	'src/assets/img025.jpg', NULL);

CREATE TABLE `subscripciones` (
  `subscripcionID` int(11) NOT NULL,
  `correos` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `subscripciones` (`subscripcionID`, `correos`) VALUES
(156, 'altinduraku02@gmail.com'),
(158, 'altinduraku2@gmail.com');

CREATE TABLE `usuarios` (
  `usuarioID` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `contraseña` varchar(128) NOT NULL,
  `direccion` varchar(128) DEFAULT NULL,
  `telefono` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `usuarios` (`usuarioID`, `nombre`, `correo`, `username`, `contraseña`, `direccion`, `telefono`) VALUES
(30, 'Admin', 'admin@gmail.com', 'admin', 'root.', 'lorem', '044111000'),
(32, 'Jimmy', 'jimmy@gmail.com', 'jimmy', 'admin', 'lorem', '23121445566');

CREATE TABLE `tallas` (
  tallaID  INT PRIMARY KEY AUTO_INCREMENT,
  talla VARCHAR(10) NOT NULL
);
INSERT INTO  `tallas` (talla) VALUES 
('24'), ('24.5'), ('25'), ('25.5'), ('26'), ('26.5'), ('27'), ('27.5'), ('28'), ('28.5'), ('29'), ('29.5'), 
('30'), ('30.5'), ('31'), ('31.5'), ('32'), ('32.5'), ('33'), ('33.5'), ('34'), ('34.5'), ('35'), ('35.5'), 
('36'), ('36.5'), ('37'), ('37.5'), ('38'), ('38.5'), ('39'), ('39.5'), ('40'), ('40.5'), ('41'), ('41.5'), 
('42'), ('42.5'), ('43'), ('43.5'), ('44'), ('44.5'), ('45'), ('45.5'), ('46'), ('46.5'), ('47'), ('47.5'), 
('48');

CREATE TABLE `infoProductos` (
  productoID INT,
  tallaID INT,
  PRIMARY KEY (productoID, tallaID),
  FOREIGN KEY (productoID) REFERENCES productos(productoID),
  FOREIGN KEY (tallaID) REFERENCES tallas(tallaID)
);

INSERT INTO infoProductos (productoID, tallaID) VALUES 
(2, 33),(2, 35),(2, 36),(2, 37),(2, 41),(2, 47),(3, 33),(3, 35),(3, 36),(3, 37),(3, 41),(3, 47),
(4, 33),
(4, 35),
(4, 36),
(4, 37),
(4, 41),
(4, 47),
(5, 33),
(5, 35),
(5, 36),
(5, 37),
(5, 41),
(5, 47),
(6, 33),
(6, 35),
(6, 36),
(6, 37),
(6, 41),
(6, 47),
(7, 33),
(7, 35),
(7, 36),
(7, 37),
(7, 41),
(7, 47),
(8, 33),
(8, 35),
(8, 36),
(8, 37),
(8, 41),
(8, 47),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 6),
(9, 7),
(9, 8),
(9, 9),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(10, 6),
(10, 7),
(10, 8),
(10, 9),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(11, 9);



CREATE TABLE `admin` (
  adminID INT PRIMARY KEY AUTO_INCREMENT,
  usuario VARCHAR(50),
  contraseña VARCHAR(180)
);

ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedidoID`),
  ADD UNIQUE KEY `orderId_UNIQUE` (`pedidoID`);

ALTER TABLE `productos_pedidos`
  ADD PRIMARY KEY (`productos_pedidosID`),
  ADD KEY `FK_order_items_orders` (`pedidoID`);

ALTER TABLE `productos`
  ADD UNIQUE KEY `idproducts_UNIQUE` (`productoID`);

ALTER TABLE `subscripciones`
  ADD PRIMARY KEY (`subscripcionID`),
  ADD UNIQUE KEY `idsubscriptions_UNIQUE` (`subscripcionID`),
  ADD UNIQUE KEY `emails_UNIQUE` (`correos`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioID`),
  ADD UNIQUE KEY `email_UNIQUE` (`correo`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `phonenumber_UNIQUE` (`telefono`),
  ADD UNIQUE KEY `iduser_UNIQUE` (`usuarioID`);

ALTER TABLE `pedidos`
  MODIFY `pedidoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `productos_pedidos`
  MODIFY `productos_pedidosID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `subscripciones`
  MODIFY `subscripcionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;

ALTER TABLE `usuarios`
  MODIFY `usuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

ALTER TABLE `productos_pedidos`
  ADD CONSTRAINT `FK_order_items_orders` FOREIGN KEY (`pedidoID`) REFERENCES `pedidos` (`pedidoID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;