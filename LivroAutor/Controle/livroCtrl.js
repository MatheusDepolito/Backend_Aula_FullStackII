import Livro from "../Modelo/livro.js"
import AutorCtrl from "./autorCtrl.js";
import Autor from "../Modelo/autor.js"

export default class LivroCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const titulo = dados.livroTitulo;
            const livroDataPublicacao = dados.livroDataPublicacao;
            const livroQtdEstoque = dados.livroQtdEstoque;
            const autorCodigo = dados.autor;

            if (titulo && livroDataPublicacao && livroQtdEstoque >= 0 && autorCodigo) {
                const autor = new Autor(autorCodigo); 
    
                const livro = new Livro(0, titulo, livroDataPublicacao, livroQtdEstoque, autor);
    
                livro.gravar().then(async () => {
                  
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro gravado com sucesso!",
                        "codigoLivro": await livro.ultimoLivro()
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o livro:" + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça os dados do livro conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um livro!"
            });
        }
    }
    
    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.livroCodigo;
            const titulo = dados.livroTitulo;
            const livroDataPublicacao = dados.livroDataPublicacao;
            const livroQtdEstoque = dados.livroQtdEstoque;
            const autorCodigo = dados.autor; // Alterado para autorCodigo
    
            if (codigo && titulo && livroDataPublicacao && livroQtdEstoque > 0 && autorCodigo) {
                // Aqui vamos criar um objeto Autor com base no autorCodigo fornecido
                const autor = new Autor(autorCodigo);
    
                const livro = new Livro(codigo, titulo, livroDataPublicacao, livroQtdEstoque, autor);
                // Resolver a promise
                livro.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro atualizado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o livro:" + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do livro segundo a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um livro!"
            });
        }
    }
    

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.livroCodigo;
            if (codigo) {
                const livro = new Livro(codigo);
                //resolver a promise
                livro.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o livro:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do livro!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um livro!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (termo === undefined || termo === null) {
            termo = ""; // Define termo como uma string vazia apenas se for undefined ou null
        }
        
        if (requisicao.method === "GET") {
            const livro = new Livro();
            livro.consultar(termo).then((listaLivros) => {
                resposta.json(
                    {
                        status: true,
                        listaLivros
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os livros: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar livros!"
            });
        }
    }


}