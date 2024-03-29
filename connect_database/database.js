import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// ---------------------------------- Consultas ----------------------------------

// **************** Proyectos ****************
export async function consultarProyectos() {
    const query = "SELECT P.id, P.nombreProyecto, P.recursosNecesarios, P.presupuesto, P.descripcion, \
                    P.idEstadoProyecto, E.nombreEstado, P.fechaInicio, P.fechaFin, P.idPersonaResponsable, C.nombre, C.primerApellido, C.segundoApellido \
                    FROM proyectos P inner join estadosProyectos E on P.idEstadoProyecto = E.id \
                    inner join colaboradores C on P.idPersonaResponsable = C.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarProyectoById(id) {
    const query = "SELECT P.id, P.nombreProyecto, P.recursosNecesarios, P.presupuesto, P.descripcion, \
                    P.idEstadoProyecto, E.nombreEstado, P.fechaInicio, P.fechaFin, P.idPersonaResponsable, C.nombre, C.primerApellido, C.segundoApellido \
                    FROM proyectos P inner join estadosProyectos E on P.idEstadoProyecto = E.id \
                    inner join colaboradores C on P.idPersonaResponsable = C.id \
                    WHERE P.id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

export async function obtenerIdProyectoByNombre(nombreProyecto) {
    const query = "SELECT id FROM proyectos WHERE nombreProyecto = ?;"
    const [rows] = await pool.query(query, [nombreProyecto])
    return rows
}

// **************** Colaboradores ****************
export async function consultarColaboradores() {
    const query = "SELECT C.id, C.nombre, C.primerApellido, C.segundoApellido, C.cedula, C.nombreUsuario, \
                    C.idEstadoColaborador,E.nombreEstado, C.idDepartamento, D.nombreDepartamento, C.administrador \
                    FROM colaboradores C inner join estadosColaboradores E on C.idEstadoColaborador = E.id \
                    inner join departamentos D on C.idDepartamento = D.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarColaboradorById(id) {
    const query = "SELECT C.id, C.correo, C.nombre, C.primerApellido, C.segundoApellido, C.cedula, C.nombreUsuario, \
                    C.idEstadoColaborador, E.nombreEstado, C.idDepartamento, D.nombreDepartamento, C.administrador \
                    FROM colaboradores C inner join estadosColaboradores E on C.idEstadoColaborador = E.id \
                    inner join departamentos D on C.idDepartamento = D.id \
                    WHERE C.id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

export async function obtenerIdColaboradorByNombreUsuario(nombreUsuario) {
    const query = "SELECT id FROM colaboradores WHERE nombreUsuario = ?;"
    const [rows] = await pool.query(query, [nombreUsuario])
    return rows
}

export async function obtenerIdColaboradorByCorreo(correo){
    const query = "SELECT id FROM colaboradores WHERE correo = ?;"
    const [rows] = await pool.query(query, [correo])
    return rows
}

export async function obtenerIdColaboradorByCedula(cedula){
    const query = "SELECT id FROM colaboradores WHERE cedula = ?;"
    const [rows] = await pool.query(query, [cedula])
    return rows
}

export async function obtenerIdColaboradorByNombreCompleto(nombre, primerApellido, segundoApellido){
    const query = "SELECT id FROM colaboradores WHERE nombre = ? AND primerApellido = ? AND segundoApellido = ?;"
    const [rows] = await pool.query(query, [nombre, primerApellido, segundoApellido])
    return rows
}

// **************** Departamentos ****************
export async function consultarDepartamentos() {
    const query = "SELECT id, nombreDepartamento FROM departamentos;"
    const [rows] = await pool.query(query)
    return rows
}

export async function obtenerIdDepartamentoByNombre(nombreDepartamento) {
    const query = "SELECT id FROM departamentos WHERE nombreDepartamento = ?;"
    const [rows] = await pool.query(query, [nombreDepartamento])
    return rows
}

// **************** Tareas ****************
export async function consultarTareas() {
    const query = "SELECT T.id, T.nombreTarea, T.idProyecto, P.nombreProyecto, T.idEstadoTarea, E.nombreEstado, \
                    T.idColaborador, C.nombre, C.primerApellido, C.segundoApellido, T.storyPoints \
                    FROM tareas T inner join proyectos P on T.idProyecto = P.id \
                    inner join colaboradores C on T.idColaborador = C.id \
                    inner join estadosTareas E on T.idEstadoTarea = E.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarTareaById(id) {
    const query = "SELECT T.id, T.nombreTarea, T.idProyecto, P.nombreProyecto, T.idEstadoTarea, E.nombreEstado, \
                    T.idColaborador, C.nombre, C.primerApellido, C.segundoApellido, T.storyPoints \
                    FROM tareas T inner join proyectos P on T.idProyecto = P.id \
                    inner join colaboradores C on T.idColaborador = C.id \
                    inner join estadosTareas E on T.idEstadoTarea = E.id \
                    WHERE T.id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

export async function consultarTareasByIdProyecto(idProyecto) {
    const query = "SELECT T.id, T.nombreTarea, T.idProyecto, P.nombreProyecto, T.idEstadoTarea, E.nombreEstado, \
                    T.idColaborador, C.nombre, C.primerApellido, C.segundoApellido, T.storyPoints \
                    FROM tareas T inner join proyectos P on T.idProyecto = P.id \
                    inner join colaboradores C on T.idColaborador = C.id \
                    inner join estadosTareas E on T.idEstadoTarea = E.id \
                    WHERE T.idProyecto = ?;"
    const [rows] = await pool.query(query, [idProyecto])
    return rows
}


// ---------------------------------- Inserciones ----------------------------------

// **************** Colaboradores ****************
export async function insertarColaborador(correo, contrasena, nombre, primerApellido, segundoApellido, cedula,
    nombreUsuario, idEstadoColaborador, idDepartamento, administrador) {
    const query = "INSERT INTO colaboradores (correo, contrasena, nombre, primerApellido, segundoApellido, cedula, nombreUsuario, idEstadoColaborador, idDepartamento, administrador)\
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const [rows] = await pool.query(query, [correo, contrasena, nombre, primerApellido, segundoApellido, cedula, nombreUsuario, idEstadoColaborador, idDepartamento, administrador])
    return consultarColaboradorById(rows.insertId)
}

// **************** Proyectos ****************
export async function insertarProyecto(nombreProyecto, recursosNecesarios, presupuesto, descripcion,
     idEstadoProyecto, fechaInicio, historialCambios, idPersonaResponsable, fechaFin = null) {
    
    if (fechaFin === null) {
        const query = "INSERT INTO proyectos (nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, \
             fechaInicio, historialCambios, idPersonaResponsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        const [rows] = await pool.query(query, [nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, fechaInicio, historialCambios, idPersonaResponsable])
        return consultarProyectoById(rows.insertId)
    } else {
        const query = "INSERT INTO proyectos (nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, \
             fechaInicio, fechaFin, historialCambios, idPersonaResponsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const [rows] = await pool.query(query, [nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, fechaInicio, fechaFin, historialCambios, idPersonaResponsable])
        return consultarProyectoById(rows.insertId)
    }
}

// **************** Tareas ****************
export async function insertarTarea(nombreTarea, idProyecto, idEstadoTarea, idColaborador, storyPoints) {
    const query = "INSERT INTO tareas (nombreTarea, idProyecto, idEstadoTarea, idColaborador, storyPoints) \
                    VALUES (?, ?, ?, ?, ?)"
    const [rows] = await pool.query(query, [nombreTarea, idProyecto, idEstadoTarea, idColaborador, storyPoints])
    return consultarTareaById(rows.insertId)
}

