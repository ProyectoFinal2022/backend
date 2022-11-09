const { model, Schema } = require('mongoose');

const PubliSchema = new Schema({
    tipo: {
        type: String, // 'servicio' || 'solicitante'
        require: true,
    },
    titulo: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    palabrasClaves:[{
        type: String
    }],
    fechaPublicacion: {
        type: Date,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('Publicacion', PubliSchema);
