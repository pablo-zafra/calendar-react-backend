const { Router } = require('express');
const { check } =  require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');
const router = Router();
const { obtenerEventos, crearEventos, actualizarEventos, borrarEventos } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');

router.use(validarJWT);

// Obtener evento
router.get('/', obtenerEventos);

// Crear evento
router.post(
    '/',
    [
        check('title', 'El título  es obligatiorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEventos,
);

// Actualizar evento
router.put('/:id', actualizarEventos);

// Borrar evento
router.delete('/:id', borrarEventos);

module.exports = router;