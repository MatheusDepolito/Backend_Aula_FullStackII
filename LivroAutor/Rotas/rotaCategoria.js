import { Router } from "express";
import CategoriaCtrl from "../Controle/categoriaCtrl.js";

const categoriaCtrl = new CategoriaCtrl();
const rotaCategoria = new Router();

rotaCategoria
    .post('/', categoriaCtrl.gravar)
    .put('/', categoriaCtrl.atualizar)
    .patch('/', categoriaCtrl.atualizar)
    .get('/', categoriaCtrl.consultar)
    .get('/:termo', categoriaCtrl.consultar)
    .delete('/', categoriaCtrl.excluir);

export default rotaCategoria;
