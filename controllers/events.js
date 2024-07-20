const { response } = require('express');
const Evento = require('../models/evento');


const obtenerEventos = async(req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');
    
    res.json({
        ok: true,
        eventos
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

const actualizarEventos = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no con esa ID no existe'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El user no tiene permisos para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
    
        res.json({
            ok: true,
            msg: 'Evento actualizado',
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const borrarEventos = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no con esa ID no existe'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El user no tiene permisos para borrar este evento'
            });
        }

        await Evento.findByIdAndDelete( evento );
    
        res.json({
            ok: true,
            msg: 'Evento borrado'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    obtenerEventos,
    crearEventos,
    actualizarEventos,
    borrarEventos
}


