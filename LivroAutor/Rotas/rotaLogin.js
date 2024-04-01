import { Router } from "express";
import { autenticar } from "../Segurança/Autenticacao.js"

const rotaLogin = new Router();
rotaLogin.post('/', (req, res) => {
    autenticar(req, res);
})


export default rotaLogin;