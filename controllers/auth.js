const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { name, email, password } = req.body;

    
    try {
        
        let usuario = await Usuario.findOne({ email });
        
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email',
            })
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        // console.log(salt);

        
        await usuario.save();

        const token = await generarJWT( usuario.id, usuario.name );

    
        res.status(201).json({
            ok : true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            ok : false,
            msg: 'Habla con papá',
        });

    }

};

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email',
                error: error,
            });
        };

        const validPassword = bcrypt.compareSync( password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        };

        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok : true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: error,
        });        
    }
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