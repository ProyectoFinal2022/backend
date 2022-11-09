const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');
const {
    getPublic,
    getPublicById,
    postPublic,
    putPublic,
    deletePublic
} = require('../controllers/public.controller')

/* ----------- GET ----------- */

// Ver las public creadas
router.get('/public', [validarJWT], getPublic);

// Ver una sola public: Por ID
router.get('/public/:publicId', [validarJWT], getPublicById);

/* ----------- POST ----------- */

// Crear una public:
router.post('/public', [validarJWT], postPublic);

/* ----------- PUT ----------- */

// Actualizar una public:
router.put('/public/:publicId', [validarJWT], putPublic);

/* ----------- DELETE ----------- */

// Eliminar una public:
router.delete('/public/:publicId', [validarJWT], deletePublic);

module.exports = router;