const Usuario = require("../model/usuario");
const jwt = require("jsonwebtoken")

const findByIdUsuario = (id) => {
 return Usuario.findById(id);
}

const findAllUsuario = () => {
    return Usuario.find();
}

const createUsuario = (usuario) => {
return Usuario.create(usuario);
}

const updateUsuario = (id, usuario) => {
return Usuario.findByIdAndUpdate(id, usuario, {returnDocument: "after"});
}

const deleteUsuario = (id) => {
return Usuario.findByIdAndRemove(id);
}

const loginService = (email) => Usuario.findOne({ email });

const updateToken = (user) => {
    return Usuario.findByIdAndUpdate(user.id, user, { returnDocument: "after" });
};

const generateToken = (user, segredo) => jwt.sign({user}, segredo);

module.exports = {
    findByIdUsuario,
    findAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginService,
    updateToken,
    generateToken
}

