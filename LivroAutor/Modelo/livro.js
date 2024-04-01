import LivroDAO from "../Persistencia/livroDAO.js";



export default class Livro {

    #livroCodigo;
    #livroTitulo;
    #livroDataPublicacao;
    #livroQtdEstoque;
    #autor;


    constructor(livroCodigo = 0, livroTitulo = '', livroDataPublicacao = '', livroQtdEstoque = 0, autor={}) 
    {
        this.livroCodigo = livroCodigo;
        this.#livroTitulo = livroTitulo;
        this.#livroDataPublicacao = livroDataPublicacao;
        this.livroQtdEstoque = livroQtdEstoque;
        this.#autor = autor;
    }

    get livroCodigo() {
        return this.#livroCodigo;
    }

    set livroCodigo(livroCodigo) {
        this.#livroCodigo = livroCodigo;
    }

    get livroTitulo() {
        return this.#livroTitulo;
    }

    set livroTitulo(livroTitulo) {
        this.#livroTitulo = livroTitulo;
    }

    get livroDataPublicacao() {
        return this.#livroDataPublicacao;
    }

    set livroDataPublicacao(livroDataPublicacao) {
        this.#livroDataPublicacao = livroDataPublicacao;
    }

    get livroQtdEstoque() {
        return this.#livroQtdEstoque;
    }

    set livroQtdEstoque(livroQtdEstoque) {
        this.#livroQtdEstoque = livroQtdEstoque;
    }

    get autor() {
        return this.#autor;
    }

    set autor(autor) {
        this.#autor = autor;
    }

    toJson() {
        return {
            livroCodigo:this.#livroCodigo,
            livroTitulo:this.#livroTitulo,
            livroDataPublicacao:this.#livroDataPublicacao,
            livroQtdEstoque:this.#livroQtdEstoque,
            autor:this.#autor
        }
    }

    async gravar(){
        const livroDAO = new LivroDAO();
        await livroDAO.gravar(this);
     }
 
     async excluir(){
        const livroDAO = new LivroDAO();
        await livroDAO.excluir(this);
     }
 
     async alterar(){
        const livroDAO = new LivroDAO();
        await livroDAO.atualizar(this);
     }
 
     async consultar(termo){
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(termo);
     }

     async ultimoLivro() {
        const livroDAO = new LivroDAO();
        return await livroDAO.buscarUltimoLivroCadastrado();
     }
}