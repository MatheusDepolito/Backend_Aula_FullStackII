import Categoria from "../Modelo/categoria.js";
import conectar from "./conexao.js";

export default class CategoriaDao {
    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "INSERT INTO categoria_livro(categoria_nome) VALUES(?)";
            const parametros = [categoria.categoriaNome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            categoria.categoriaCodigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "UPDATE categoria_livro SET categoria_nome = ? WHERE categoria_codigo = ?";
            const parametros = [categoria.categoriaNome, categoria.categoriaCodigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "DELETE FROM categoria_livro WHERE categoria_codigo = ?";
            const parametros = [categoria.categoriaCodigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM categoria_livro WHERE categoria_codigo = ? ORDER BY categoria_nome';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM categoria_livro WHERE categoria_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaCategoriasLivros = [];
        for (const registro of registros) {
            const categoria = new Categoria(registro.categoria_codigo, registro.categoria_nome);
            listaCategoriasLivros.push({
                codigo: categoria.categoriaCodigo,
                nome: categoria.categoriaNome
            });
        }
        return listaCategoriasLivros;
    }
}
