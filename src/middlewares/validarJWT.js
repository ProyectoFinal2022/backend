const jwt = require('jsonwebtoken');
const Personas = require('');

const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: 'Error de autenticación - No hay token en la petición'
        });
    };

    try {
        const { id } = await jwt.verify(token, process.env.SECRET)
        const persona = await Personas.findById(id)

        if (!persona) {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe en BD'
            });
        }

        if (!persona.activo) {
            return res.status(401).json({
                msg: 'Token no válido o usuario inactivo'
            });
        }

        req.user = persona._doc;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
}

module.exports = validarJWT