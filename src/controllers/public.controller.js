const Public = require('../models/Publicacion');

const publicController = {}

publicController.getPublic = async (req, res) => {
    const userId = req.user._id;

    const public = await Public.find({ userId, isActive: true });

    if (!public) {
        return res.status(400).json({
            message: 'No se encontraron publicaciones para el usuario.'
        });
    }

    return res.json({
        message: 'publicaciones encontradas.',
        public
    });
}

publicController.getPublicById = async (req, res) => {
    const id = req.params.taskId;
    const userId = req.user._id;

    const public = await Public.find({ _id: id, userId, isActive: true });

    if (!public || public.length === 0) {
        return res.status(400).json({
            message: 'No se encontró o no se puede acceder a la publicacion.'
        });
    }

    return res.json({
        message: 'publicacion encontrada.',
        public
    });
}

publicController.postPublic = async (req, res) => {
    console.log("entro")
    const { tipo, titulo, descripcion, palabrasClaves } = req.body;
    const userId = req.user._id;

    const newPublic = new Public({
        tipo,
        titulo,
        descripcion,
        userId,
        palabrasClaves
    });

    const public = await newPublic.save();
    
    return res.json({
        message: 'publicacion creada correctamente.',
        public
    });
}

publicController.putPublic = async (req, res) => {
    const publicId = req.params.publicId;
    const userId = req.user._id;
    const { tipo, titulo, descripcion, palabrasClaves } = req.body;

    const filter = { _id: publicId, userId, isActive: true }
    const update = {}

    if (tipo) {
        update.tipo = tipo;
    }

    if (titulo) {
        update.titulo = titulo;
    }

    if (descripcion) {
        update.descripcion = descripcion;
    }

    if (palabrasClaves) {
        update.palabrasClaves = palabrasClaves;
    }

    const publicUpdated = await Public.findOneAndUpdate(filter, update);

    if (!publicUpdated) {
        return res.status(400).json({
            message: 'No se pudo actualizar la publicacion.'
        });
    }

    const public = await Public.findById(publicId)

    return res.json({
        message: 'publicacion actualizda correctamente.',
        task
    });
}

publicController.deletePublic = async (req, res) => {
    const publicId = req.params.publicId;
    const userId = req.user._id;

    const filter = { _id: publicId, userId }
    const update = { isActive: false }

    const publicUpdated = await Public.findOneAndUpdate(filter, update);

    if (!publicUpdated) {
        return res.status(400).json({
            message: 'No se pudo eliminar la publicacion.'
        });
    }

    return res.json({
        message: 'publicacion eliminada correctamente.'
    });
}

module.exports = publicController;