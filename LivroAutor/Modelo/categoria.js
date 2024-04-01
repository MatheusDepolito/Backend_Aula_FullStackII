import CategoriaDAO from "../Persistencia/categoriaDao.js"

export default class Categoria {

    #categoriaCodigo;
    #categoriaNome;

    constructor(categoriaCodigo = 0, categoriaNome = '') {
        this.#categoriaCodigo = categoriaCodigo;
        this.#categoriaNome = categoriaNome;
    }

    get categoriaCodigo() {
        return this.#categoriaCodigo;
    }

    set categoriaCodigo(categoriaCodigo) {
        this.#categoriaCodigo = categoriaCodigo;
    }

    get categoriaNome() {
        return this.#categoriaNome;
    }

    set categoriaNome(categoriaNome) {
        this.#categoriaNome = categoriaNome;
    }

    toJson() {
        return {
            categoriaCodigo: this.#categoriaCodigo,
            categoriaNome: this.#categoriaNome
        }
    }

    async gravar() {
        const categoriaDAO = new CategoriaDAO();
        await categoriaDAO.gravar(this);
    }

    async excluir() {
        const categoriaDAO = new CategoriaDAO();
        await categoriaDAO.excluir(this);
    }

    async atualizar() {
        const categoriaDAO = new CategoriaDAO();
        await categoriaDAO.atualizar(this);
    }

    async consultar(parametro) {
        const categoriaDAO = new CategoriaDAO();
        return await categoriaDAO.consultar(parametro);
    }
}
