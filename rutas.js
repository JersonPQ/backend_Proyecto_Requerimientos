import express from 'express'
import { 
    consultarProyectos, consultarProyectoById, obtenerIdProyectoByNombre,
    consultarColaboradores, consultarColaboradorById, obtenerIdColaboradorByNombreUsuario, obtenerIdColaboradorByCorreo, obtenerIdColaboradorByCedula, obtenerIdColaboradorByNombreCompleto,
    consultarDepartamentos, obtenerIdDepartamentoByNombre,
    consultarTareas, consultarTareaById, consultarTareasByIdProyecto, 

    insertarColaborador,
    insertarProyecto,
    insertarTarea
 } from './database.js'

 import {PORT} from './config.js'

const app = express()

// ---------------------------------- Consultas ----------------------------------

// **************** Proyectos ****************
app.get('/consultarProyectos', async (req, res) => {
    const proyectos = await consultarProyectos()
    res.send(proyectos)
})

app.get('/consultarProyectoById/:id', async (req, res) => {
    const idProyecto = req.params.id
    const proyecto = await consultarProyectoById(idProyecto)
    res.send(proyecto)
})

app.get('/obtenerIdProyectoByNombre/:nombreProyecto', async (req, res) => {
    const nombreProyecto = req.params.nombreProyecto
    const idProyecto = await obtenerIdProyectoByNombre(nombreProyecto)
    res.send(idProyecto)
})

// **************** Colaboradores ****************
app.get('/consultarColaboradores', async (req, res) => {
    const colaboradores = await consultarColaboradores()
    res.send(colaboradores)
})

app.get('/consultarColaboradorById/:id', async (req, res) => {
    const idColaborador = req.params.id
    const colaborador = await consultarColaboradorById(idColaborador)
    res.send(colaborador)
})

app.get('/obtenerIdColaboradorByNombreUsuario/:nombreUsuario', async (req, res) => {
    const nombreUsuario = req.params.nombreUsuario
    const idColaborador = await obtenerIdColaboradorByNombreUsuario(nombreUsuario)
    res.send(idColaborador)
})

app.get('/obtenerIdColaboradorByCorreo/:correo', async (req, res) => {
    const correo = req.params.correo
    const idColaborador = await obtenerIdColaboradorByCorreo(correo)
    res.send(idColaborador)
})

app.get('/obtenerIdColaboradorByCedula/:cedula', async (req, res) => {
    const cedula = req.params.cedula
    const idColaborador = await obtenerIdColaboradorByCedula(cedula)
    res.send(idColaborador)
})

app.get('/obtenerIdColaboradorByNombreCompleto/:nombreCompleto', async (req, res) => {
    const nombreCompleto = req.params.nombreCompleto
    const idColaborador = await obtenerIdColaboradorByNombreCompleto(nombreCompleto)
    res.send(idColaborador)
})

// **************** Departamentos ****************
app.get('/consultarDepartamentos', async (req, res) => {
    const departamentos = await consultarDepartamentos()
    res.send(departamentos)
})

app.get('/obtenerIdDepartamentoByNombre/:nombreDepartamento', async (req, res) => {
    const nombreDepartamento = req.params.nombreDepartamento
    const idDepartamento = await obtenerIdDepartamentoByNombre(nombreDepartamento)
    res.send(idDepartamento)
})

// **************** Tareas ****************
app.get('/consultarTareas', async (req, res) => {
    const tareas = await consultarTareas()
    res.send(tareas)
})

app.get('/consultarTareaById/:id', async (req, res) => {
    const idTarea = req.params.id
    const tarea = await consultarTareaById(idTarea)
    res.send(tarea)
})

app.get('/consultarTareasByIdProyecto/:id', async (req, res) => {
    const idProyecto = req.params.id
    const tareas = await consultarTareasByIdProyecto(idProyecto)
    res.send(tareas)
})


// ---------------------------------- Inserción ----------------------------------

// **************** Proyectos ****************
app.post('/insertarProyecto', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarProyecto(bodyJson['nombreProyecto'], bodyJson['recursosNecesarios'], bodyJson['presupuesto'],
        bodyJson['descripcion'], bodyJson['idEstadoProyecto'], bodyJson['fechaInicio'], bodyJson['historialCambios'],
        bodyJson['idPersonaResponsable'], bodyJson['ffechaFin'])
    res.send(result)
})

// **************** Colaboradores ****************
app.post('/insertarColaborador', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarColaborador(bodyJson['correo'], bodyJson['contrasena'], bodyJson['nombre'], bodyJson['primerApellido'],
        bodyJson['segundoApellido'], bodyJson['cedula'], bodyJson['nombreUsuario'], bodyJson['idEstadoColaborador'],
        bodyJson['idDepartamento'], bodyJson['administrador'])
    res.send(result)
})

// **************** Tareas ****************
app.post('/insertarTarea', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarTarea(bodyJson['nombreTarea'], bodyJson['idProyecto'], bodyJson['idEstadoTarea'],
        bodyJson['idColaborador'], bodyJson['storyPoints'])
    res.send(result)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, () => {
    console.log('Example app listening on port ', PORT)
})
