import conectar from "./conexao.js";
import LivroCategoria from "../Modelo/livroCategoria.js";

export default class LivroCategoriaDAO {
    async gravar(livroCategoria) {
        if (livroCategoria instanceof LivroCategoria) {
            const categorias = livroCategoria.categoriaCodigo;
            if (categorias.length === 0) {
                return; // Não há categorias para inserir
            }
            
            const sql = "INSERT INTO livro_categoria(livro_codigo, categoria_codigo) VALUES(?, ?)";
            const conexao = await conectar();

            for (const categoria of categorias) {
                const parametros = [livroCategoria.livroCodigo, categoria];
                await conexao.execute(sql, parametros);
            }

            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livroCategoria) {
        if (livroCategoria instanceof LivroCategoria) {
            const sql = "DELETE FROM livro_categoria WHERE livro_codigo = ? AND categoria_codigo = ?";
            const parametros = [livroCategoria.livroCodigo, livroCategoria.categoriaCodigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultarPorLivro(livroCodigo) {
        const sql = "SELECT * FROM livro_categoria WHERE livro_codigo = ?";
        const parametros = [livroCodigo];
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaLivroCategorias = [];
        for (const registro of registros) {
            listaLivroCategorias.push(new LivroCategoria(registro.livro_codigo, registro.categoria_codigo));
        }
        return listaLivroCategorias;
    }

    async consultarPorCategoria(categoriaCodigo) {
        const sql = "SELECT * FROM livro_categoria WHERE categoria_codigo = ?";
        const parametros = [categoriaCodigo];
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaLivroCategorias = [];
        for (const registro of registros) {
            listaLivroCategorias.push(new LivroCategoria(registro.livro_codigo, registro.categoria_codigo));
        }
        return listaLivroCategorias;
    }
}
