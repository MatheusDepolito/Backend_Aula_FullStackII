import Autor from "../Modelo/autor.js";
import conectar from "./conexao.js";



export default class AutorDao{
    async gravar(autor){
        if (autor instanceof Autor){
            const sql = "INSERT INTO autor(autor_Nome) VALUES(?)"; 
            const parametros = [autor.autorNome];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql,parametros); 
            autor.autorCodigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(autor){
        if (autor instanceof Autor){
            const sql = "UPDATE autor SET autor_nome = ? WHERE autor_codigo = ?"; 
            const parametros = [autor.autorNome, autor.autorCodigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(autor){
        if (autor instanceof Autor){
            const sql = "DELETE FROM autor WHERE autor_codigo = ?"; 
            const parametros = [autor.autorCodigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];

        if (!isNaN(parseInt(parametroConsulta))){
            sql='SELECT * FROM autor WHERE autor_codigo = ? order by autor_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM autor WHERE autor_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaAutores = [];
        for (const registro of registros){
            const autor = new Autor(registro.autor_codigo,registro.autor_nome);
            listaAutores.push({
                codigo: autor.autorCodigo,
                nome: autor.autorNome
            });
            console.log(listaAutores)
        }
        return listaAutores;
    }
}