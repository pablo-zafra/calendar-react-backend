const { response } = require("express");


const obtenerEventos = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'Obtener eventos'
    })

}

const crearEventos = (req, res = response) => {

    console.log(req.body);
    
    res.json({
        ok: true,
        msg: 'Crear eventos'
    })

}

const actualizarEventos = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'Actualizar eventos'
    })

}

const borrarEventos = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'Borrar eventos'
    })

}

module.exports = {
    obtenerEventos,
    crearEventos,
    actualizarEventos,
    borrarEventos
}


