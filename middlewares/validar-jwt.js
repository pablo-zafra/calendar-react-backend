const { response } = require('express');


const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    console.log(token);

    next();
};

module.export = {
    validarJWT
}