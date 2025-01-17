const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

// Rutas de Usuarios / Auth
// host + /api/auth

const holaMundo = () => {
    console.log('Hola Mundo');
}

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene formato correcto').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'El email no tiene formato correcto').isEmail(),
        validarCampos
    ],
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);


module.exports = router;