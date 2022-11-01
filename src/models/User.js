const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

UserSchema.methods.toJSON = () => {
    const methods = typeof UserSchema.methods === 'object' ? UserSchema.methods : UserSchema.methods.toObject();
    const { password, _id, ...user } = methods;
    user.uid = _id;

    return user;
}

module.exports = model('Users', UserSchema);