import Livro from "../Modelo/livro.js";
import conectar from "./conexao.js";
import Autor from "../Modelo/autor.js";

export default class LivroDao{
    async gravar(livro){
        if (livro instanceof Livro) {
            const sql = `INSERT INTO livros(livro_titulo, livro_dataPublicacao,
                livro_qtdEstoque, autor_codigo)
                VALUES(?,?,?,?)`;
            const parametros = [livro.livroTitulo, livro.livroDataPublicacao, livro.livroQtdEstoque, livro.autor.autorCodigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            livro.livroCodigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(livro){
        if (livro instanceof Livro) {
            const sql = `UPDATE livros SET livro_titulo = ?, livro_dataPublicacao = ?,
            livro_qtdEstoque = ?, autor_codigo = ?
            WHERE livro_codigo = ?`;
            const parametros = [livro.livroTitulo, livro.livroDataPublicacao, livro.livroQtdEstoque, livro.autor.autorCodigo, livro.livroCodigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro){
        if (livro instanceof Livro) {
            const sql = `DELETE FROM livros WHERE livro_codigo = ?`;
            const parametros = [livro.livroCodigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (termo === undefined || termo === null) {
            termo = ""; // Define termo como uma string vazia apenas se for undefined ou null
        }
    
        //termo é um número
        const conexao = await conectar();
        let listaLivros = [];
        if (!isNaN(parseInt(termo))) {
    
            const sql = `SELECT l.livro_codigo, l.livro_titulo,
              l.livro_dataPublicacao, l.livro_qtdEstoque, a.autor_codigo, a.autor_nome, lc.categoria_codigo, cl.categoria_nome
              FROM livros l
              INNER JOIN autor a ON l.autor_codigo = a.autor_codigo
              LEFT JOIN livro_categoria lc ON l.livro_codigo = lc.livro_codigo
              LEFT JOIN categoria_livro cl ON lc.categoria_codigo = cl.categoria_codigo
              WHERE l.livro_codigo = ?
              ORDER BY l.livro_titulo              
            `;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const autor = new Autor(registro.autor_codigo, registro.autor_nome);
                const livro = new Livro(registro.livro_codigo, registro.livro_titulo,
                    registro.livro_dataPublicacao, registro.livro_qtdEstoque,
                    autor
                );
                listaLivros.push({
                    livroCodigo: livro.livroCodigo,
                    livroTitulo: livro.livroTitulo,
                    livroDataPublicacao: livro.livroDataPublicacao,
                    livroQtdEstoque: livro.livroQtdEstoque,
                    autor: livro.autor.autorNome,
                    categorias: [
                        {
                            categoriaCodigo: registro.categoria_codigo,
                            categoriaNome: registro.categoria_nome
                        }
                    ]
                });
            }
        } else {
            //consulta pelo titulo do livro
            const sql = `
              SELECT l.livro_codigo, l.livro_titulo,
              l.livro_dataPublicacao, l.livro_qtdEstoque, a.autor_codigo, a.autor_nome, lc.categoria_codigo, cl.categoria_nome
              FROM livros l 
              INNER JOIN autor a ON l.autor_codigo = a.autor_codigo
              LEFT JOIN livro_categoria lc ON l.livro_codigo = lc.livro_codigo
              LEFT JOIN categoria_livro cl ON lc.categoria_codigo = cl.categoria_codigo
              WHERE l.livro_titulo LIKE ?
              ORDER BY l.livro_titulo   
            `;
            const parametros = ['%' + termo + '%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const autor = new Autor(registro.autor_codigo, registro.autor_nome);
                const livro = new Livro(registro.livro_codigo, registro.livro_titulo,
                    registro.livro_dataPublicacao, registro.livro_qtdEstoque,
                    autor
                );
                let livroExistente = listaLivros.find(item => item.livroCodigo === livro.livroCodigo);
                if (livroExistente) {
                    livroExistente.categorias.push({
                        categoriaCodigo: registro.categoria_codigo,
                        categoriaNome: registro.categoria_nome
                    });
                } else {
                    listaLivros.push({
                        livroCodigo: livro.livroCodigo,
                        livroTitulo: livro.livroTitulo,
                        livroDataPublicacao: livro.livroDataPublicacao,
                        livroQtdEstoque: livro.livroQtdEstoque,
                        autor: livro.autor.autorNome,
                        categorias: [
                            {
                                categoriaCodigo: registro.categoria_codigo,
                                categoriaNome: registro.categoria_nome
                            }
                        ]
                    });
                }
            }
        }
    
        return listaLivros;
    }

    async buscarUltimoLivroCadastrado() {
        const conexao = await conectar();

        try {
            const sql = `SELECT * FROM livros ORDER BY livro_codigo DESC LIMIT 1`;
            const [registros, campos] = await conexao.execute(sql);

            if (registros.length > 0) {
                const registro = registros[0];
                return parseInt(registro.livro_codigo);
            } else {
                return null; // Retorna null se não houver livros cadastrados
            }
        } catch (erro) {
            throw new Error("Erro ao buscar último livro cadastrado: " + erro.message);
        } finally {
            global.poolConexoes.releaseConnection(conexao);
        }
    }
}