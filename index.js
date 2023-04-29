const express = require("express");
const connectToDatabase = require("./database/database");
const mongoose = require("mongoose");
const app = express();
const usuario = require("./router/usuario.router");
const usuarioService = require("./service/usuario.service");


connectToDatabase();

const port = 3000;

app.use(express.json());

app.use("/usuario", usuario);

app.get("/", (req, res) => {
    console.log(token());
    res.send("hello world");
})

app.get("/mongo", (req, res) => {
    res.send("meu email");
})

app.post("/login", async (req, res) => {
    try{
        const { email, senha } = req.body;
    const user = await usuarioService.loginService(email);

    if(!user){
        return res.status(400).send({ message: "Usuário não encontrado, tente novamente" });
    }

    if(senha != user.senha){
        return res.status(400).send({ message: "Senha inválida" });
    }
    user.token = token();
    await usuarioService.updateToken(user);
    console.log(user);

    res.send(user)
    }catch(err){
        console.log(`erro: ${err}`);
    }
    res.status(200).send(user);
});

const token = function(){
    let token = Math.random().toString(36).substring(2);
    return token;
}

app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});