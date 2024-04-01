import { Router } from "express";
import LivroCategoriaCtrl from "../Controle/livroCategoriaCtrl.js";

const livroCategoriaCtrl = new LivroCategoriaCtrl();
const rotaLivroCategoria = new Router();

rotaLivroCategoria
    .post('/', livroCategoriaCtrl.gravar)
    .delete('/', livroCategoriaCtrl.excluir);

export default rotaLivroCategoria;
