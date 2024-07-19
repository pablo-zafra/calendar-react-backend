const { response } = require("express");
const Evento = require('../models/evento');


const obtenerEventos = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'Obtener eventos'
    })

}

const crearEventos = async(req, res = response) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

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


