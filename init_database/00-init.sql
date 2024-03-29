CREATE DATABASE IF NOT EXISTS `progest`;

USE `progest`;


CREATE TABLE estadosColaboradores (
    id int not null auto_increment,
    nombreEstado varchar(100) not null,

    PRIMARY KEY (id)
);

CREATE TABLE estadosTareas (
    id int not null auto_increment,
    nombreEstado varchar(100) not null,

    PRIMARY KEY (id)
);

CREATE TABLE estadosProyectos (
    id int not null auto_increment,
    nombreEstado varchar(100) not null,

    PRIMARY KEY (id)
);

CREATE TABLE departamentos (
    id int not null auto_increment,
    nombreDepartamento varchar(100) not null,

    PRIMARY KEY (id)
);

CREATE TABLE colaboradores (
    id int not null auto_increment,
    correo varchar(250) not null unique,
    contrasena varchar(100) not null,
    nombre varchar(100) not null,
    primerApellido varchar(300),
    segundoApellido varchar(300),
    cedula varchar(10) not null unique,
    nombreUsuario varchar(100) not null unique,
    idEstadoColaborador int not null,
    idDepartamento int not null,
    administrador boolean not null,

    PRIMARY KEY (id),
    FOREIGN KEY (idEstadoColaborador) REFERENCES estadosColaboradores(id),
    FOREIGN KEY (idDepartamento) REFERENCES departamentos(id)
);

CREATE TABLE proyectos (
    id int not null auto_increment,
    nombreProyecto varchar(100) not null unique,
    recursosNecesarios varchar(300),
    presupuesto int,
    descripcion varchar(300),
    idEstadoProyecto int not null,
    fechaInicio date not null,
    fechaFin date,
    historialCambios varchar(300),
    idPersonaResponsable int not null,

    PRIMARY KEY (id),
    FOREIGN KEY (idEstadoProyecto) REFERENCES estadosProyectos(id),
    FOREIGN KEY (idPersonaResponsable) REFERENCES colaboradores(id)
);

CREATE TABLE tareas (
    id int not null auto_increment,
    nombreTarea varchar(100) not null,
    idProyecto int not null,
    idEstadoTarea int not null,
    idColaborador int,
    storyPoints int not null default 1,

    PRIMARY KEY (id),
    FOREIGN KEY (idProyecto) REFERENCES proyectos(id),
    FOREIGN KEY (idEstadoTarea) REFERENCES estadosTareas(id),
    FOREIGN KEY (idColaborador) REFERENCES colaboradores(id)
);

# Si necesitan borrar tablas o la bd descomentan esto y lo corren 

/*DROP TABLE IF EXISTS tareas;
DROP TABLE IF EXISTS proyectos;
DROP TABLE IF EXISTS colaboradores;
DROP TABLE IF EXISTS departamentos;
DROP TABLE IF EXISTS estadosProyectos;
DROP TABLE IF EXISTS estadosTareas;
DROP TABLE IF EXISTS estadosColaboradores;

-- Cambiar a la base de datos principal
USE `progest`;

-- Borrar la base de datos
DROP DATABASE IF EXISTS `progest`;*/