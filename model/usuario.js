const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    senha: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    token: {type: String, required: false},
});

const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;