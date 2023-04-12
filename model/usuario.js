const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    pNome: {type: String, required: true},
    sNome: {type: String, required: true},
    email: {type: String, unique: true, required: true}
});

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;