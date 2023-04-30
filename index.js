const express = require("express");
const connectToDatabase = require("./database/database");
const mongoose = require("mongoose");
const app = express();
const usuario = require("./router/usuario.router");
const usuarioService = require("./service/usuario.service");
const jwt = require("jsonwebtoken");



connectToDatabase();

const port = 3000;
const segredo = "huvdfuvfufdvhuio493494";

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
    const token = usuarioService.generateToken(user, segredo);
    user.token = token;
    await usuarioService.updateToken(user);
    console.log(user);
    res.status(200).send({
        user,
        token
    });
    }catch(err){
        console.log(`erro: ${err}`);
    }
});

app.post("/validar", async (req, res) => {
    const {email, token} = req.body;

    const user = await usuarioService.loginService(email);
    if(!user){
        return res.status(400).send({ message: "Usuário não encontrado, tente novamente"});
    }
    if(token != user.token){
        return res.status(400).send({ message: "Token incorreto ou expirado, tente novamente"});
    }
    user.token = "";
    await usuarioService.updateToken(user);

    res.status(200).send(user);
})


const token = function(){
    let token = Math.random().toString(36).substring(2);
    return token;
}

app.get("/teste-token", (req, res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ message: "O Token não foi informado" });
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2){
        return res.status(401).send({ message: "token inválido" });
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ message: "token mal formatado"});
    }

    jwt.verify(token, segredo, (err, decoded) => {

        if(err){
            console.log(`erro: ${err}`);
            return res.status(500).send({ message: `erro interno, tente novamente`});
        }
        console.log(decoded);
        res.send(decoded);
    })
})

app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});