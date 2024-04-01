import LivroCategoriaDAO from "../Persistencia/livroCategoriaDao.js";

export default class LivroCategoria {
    #livroCodigo;
    #categoriaCodigo;

    constructor(livroCodigo = 0, categoriaCodigo = []) {
        this.#livroCodigo = livroCodigo;
        this.#categoriaCodigo = categoriaCodigo;
    }

    get livroCodigo() {
        return this.#livroCodigo;
    }

    set livroCodigo(livroCodigo) {
        this.#livroCodigo = livroCodigo;
    }

    get categoriaCodigo() {
        return this.#categoriaCodigo;
    }

    set categoriaCodigo(categoriaCodigo) {
        this.#categoriaCodigo = categoriaCodigo;
    }

    async gravar() {
        const livroCategoriaDAO = new LivroCategoriaDAO();
        await livroCategoriaDAO.gravar(this);
    }

    async excluir() {
        const livroCategoriaDAO = new LivroCategoriaDAO();
        await livroCategoriaDAO.excluir(this);
    }

    async atualizar() {
        const livroCategoriaDAO = new LivroCategoriaDAO();
        await livroCategoriaDAO.atualizar(this);
    }

    async consultar(parametro) {
        const livroCategoriaDAO = new LivroCategoriaDAO();
        return await livroCategoriaDAO.consultar(parametro);
    }
}
