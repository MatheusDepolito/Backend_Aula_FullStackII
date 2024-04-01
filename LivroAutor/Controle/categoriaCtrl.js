import Categoria from "../Modelo/categoria.js";

export default class CategoriaCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nomeCategoria = dados.nomeCategoria;
            if (nomeCategoria) {
                const categoria = new Categoria(0, nomeCategoria);
                categoria.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "categoria": categoria.categoriaNome,
                        "mensagem": "Categoria de livro incluída com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a categoria de livro:" + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome da categoria de livro!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma categoria de livro!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoCategoria = dados.codigoCategoria;
            const nomeCategoria = dados.nomeCategoria;
            if (codigoCategoria && nomeCategoria) {
                const categoria = new Categoria(codigoCategoria, nomeCategoria);
                categoria.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Categoria de livro atualizada com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a categoria de livro:" + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e o nome da categoria de livro!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma categoria de livro!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoCategoria = dados.codigoCategoria;
            if (codigoCategoria) {
                const categoria = new Categoria(codigoCategoria);
                categoria.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Categoria de livro excluída com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a categoria de livro:" + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da categoria de livro!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma categoria de livro!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const categoria = new Categoria();
            categoria.consultar(termo).then((listaCategoriasLivros) => {
                resposta.json({
                    status: true,
                    listaCategoriasLivros
                });
            })
            .catch((erro) => {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter as categorias de livros: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar categorias de livros!"
            });
        }
    }
}
