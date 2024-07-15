const { response } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async(req, res = response) => {

    const { name, email, password } = req.body;

    const usuario = new Usuario( req.body );

    try {
        
        await usuario.save();
    
        res.status(201).json({
            ok : true,
            msg: 'registro',
        });

    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            ok : false,
            msg: 'Habla con papá',
        });

    }

};

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok : true,
        msg: 'login',
        email,
        password
    });
};

const revalidarToken = (req, res = response) => {

    // console.log('se requiere /');
    res.json({
        ok : true,
        msg: 'renew',
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}