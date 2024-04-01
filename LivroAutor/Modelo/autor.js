import AutorDAO from "../Persistencia/autorDao.js"


export default class Autor {

    #autorCodigo;
    #autorNome;

    constructor(autorCodigo = 0, autorNome = '')
    {
        this.#autorCodigo = autorCodigo;
        this.#autorNome = autorNome;
    }

    get autorCodigo() {
        return this.#autorCodigo;
    }

    set autorCodigo(autorCodigo) {
        this.#autorCodigo = autorCodigo;
    }

    get autorNome() {
        return this.#autorNome;
    }

    set autorNome(autorNome) {
        this.#autorNome = autorNome;
    }

    toJson()
    {
        return {
            autorCodigo: this.#autorCodigo,
            autorNome: this.#autorNome
        }
    }

    async gravar(){
        const autDAO = new AutorDAO();
        await autDAO.gravar(this);
    }

    async excluir(){
        const autDAO = new AutorDAO();
        await autDAO.excluir(this);
    }

    async atualizar(){
        const autDAO = new AutorDAO();
        await autDAO.atualizar(this);

    }

    async consultar(parametro){
        const autDAO = new AutorDAO();
        return await autDAO.consultar(parametro);
    }
}