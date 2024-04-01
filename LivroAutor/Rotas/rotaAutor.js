import { Router } from "express";
import AutorCtrl from "../Controle/autorCtrl.js";

const autCtrl = new AutorCtrl();
const rotaAutor = new Router();

rotaAutor
.post('/', autCtrl.gravar)
.put('/', autCtrl.atualizar)
.patch('/', autCtrl.atualizar)
.get('/', autCtrl.consultar)
.get('/:termo', autCtrl.consultar)
.delete('/', autCtrl.excluir)





export default rotaAutor;