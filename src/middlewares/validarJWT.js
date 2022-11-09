const jwt = require('jsonwebtoken');
const Users = require('../models/User');

const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: 'Error de autenticación - No hay token en la petición'
        });
    };

    try {
        const { uid } = await jwt.verify(token, process.env.SECRET)
        const usuario = await Users.findById(uid)
        console.log(usuario)

        if (!usuario) {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe en BD'
            });
        }

        if (!usuario.isActive) {
            return res.status(401).json({
                msg: 'Token no válido o usuario inactivo'
            });
        }

        req.user = usuario._doc;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
}

module.exports = validarJWT