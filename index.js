const express = require("express");
const connectToDatabase = require("./database/database");
const mongoose = require("mongoose");
const app = express();
const usuario = require("./router/usuario.router");


connectToDatabase();

const port = 3000;

app.use(express.json());

app.use("/usuario", usuario);

app.get("/", (req, res) => {
    res.send("hello world");
})

app.get("/mongo", (req, res) => {
    res.send("meu email");
})

app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});