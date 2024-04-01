import LivroCategoria from "../Modelo/livroCategoria.js";

export default class LivroCategoriaCtrl {
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const livroCodigo = dados.livroCodigo;
            const categorias = dados.categoriaCodigo; // Alteração para receber um array de categorias
            console.log(livroCodigo, categorias);
            if (livroCodigo && categorias && Array.isArray(categorias) && categorias.length > 0) { // Verifica se categorias é um array
                try {
                    const livroCategoria = new LivroCategoria(livroCodigo, categorias);
                    await livroCategoria.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Relação livro-categoria incluída com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a relação livro-categoria:" + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do livro e pelo menos uma categoria!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma relação livro-categoria!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const livroCodigo = dados.livroCodigo;
            const categorias = dados.categoriaCodigo; // Alteração para receber um array de categorias
            if (livroCodigo && categorias && Array.isArray(categorias) && categorias.length > 0) {
                try {
                    for (const categoriaCodigo of categorias) {
                        const livroCategoria = new LivroCategoria(livroCodigo, categoriaCodigo);
                        await livroCategoria.excluir();
                    }
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Relação livro-categoria excluída com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a relação livro-categoria:" + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do livro e pelo menos uma categoria!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma relação livro-categoria!"
            });
        }
    }
}
