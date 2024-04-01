import Autor from "../Modelo/autor.js";

export default class AutorCtrl {


    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nomeAutor = dados.nomeAutor;
            if (nomeAutor) {
                const autor = new Autor(0, nomeAutor);
                //resolver a promise
                autor.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "autor": autor.autorNome,
                        "mensagem": "Autor incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o autor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome do Autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um autor!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoAutor = dados.codigoAutor;
            const nomeAutor = dados.nomeAutor;
            if (codigoAutor && nomeAutor) {
                const autor = new Autor(codigoAutor, nomeAutor);
                //resolver a promise
                autor.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Autor atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o autor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e o nome do autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um autor!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoAutor = dados.codigoAutor;
            if (codigoAutor) {
                const autor = new Autor(codigoAutor);
                //resolver a promise
                autor.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Autor excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o autor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um autor!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const autor = new Autor();
            autor.consultar(termo).then((listaAutores)=>{
                resposta.json(
                    {
                        status:true,
                        listaAutores
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os autores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar autores!"
            });
        }
    }
}
