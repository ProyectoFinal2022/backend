const User = require('./../models/User');

const { encriptarPassword } = require('./../helpers/password');

const userController = {};

userController.getUser = (req, res) => {
    return res.json({ ...req.user });
}

userController.getUsers = async (req, res) => {
    const users = await User.find({ isActive: true });

    return res.json({ users });
}

userController.postUser = async (req, res) => {
    const { email, password, name } = req.body;
    
    const passwordEncriptada = encriptarPassword(password);

    const newUser = new User({
        name,
        password: passwordEncriptada,
        email
    });

    try {
        const user = await newUser.save();
    
        return res.json({
            message: 'Usuario cargado correctamente',
            user
        });
    } catch (error) {
        return res.json({
            message: 'No se pudo cargar el usuario.',
            error
        });
    }
}

userController.putUser = (req, res) => {
    
}

userController.deleteUser = (req, res) => {
    
}

module.exports = userController;