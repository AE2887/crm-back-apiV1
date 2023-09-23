USE farmacia_moyano

CREATE TABLE clientes (
    id INT(10) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    apellido VARCHAR(45) DEFAULT NULL,
    afiliado INT(255) NOT NULL,
    dni INT(255) NOT NULL,
    direccion VARCHAR(45) DEFAULT NULL,
    telefono INT(55) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE recetas (
    id INT(10) NOT NULL AUTO_INCREMENT,
    persona_id INT(45) DEFAULT NULL,
    dni INT(20) DEFAULT NULL,
    afiliado INT(255) NOT NULL,
    fecha_de_vencimiento DATE,
     PRIMARY KEY (id)
    );
