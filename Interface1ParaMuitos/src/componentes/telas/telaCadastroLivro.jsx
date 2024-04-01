import FormCadLivros from "../formularios/formCadLivros";
import TabelaLivros from "../tabelas/tabelaLivros";
import Pagina from "../templates/pagina";
import { useState } from "react";

export default function TelaCadastroLivro(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaLivros, setListaLivros] = useState([]);
    
    const [modoEdicao, setModoEdicao] = useState(false);
    const [livroParaEditar, setLivroParaEditar] = useState(null);

     if (exibirTabela) {
        return (
                    <div>
                        <Pagina>
                            <h1>Tela de Cadastro de Livros</h1>
                            <br />
                            <h2>Lista de Livros</h2>
                            <TabelaLivros
                                listaLivros={listaLivros}
                                setExibirTabela={setExibirTabela}
                                setModoEdicao={setModoEdicao}
                                setLivroParaEditar={setLivroParaEditar}
                            />
                        </Pagina>
                    </div>
                );
    } else {
                return (
            <div>
                <Pagina>
                    <h1>Tela de Atualização de Livro</h1>
                    <br />
                    <h2>Atualizar Livro</h2>
                    <FormCadLivros
                        setExibirTabela={setExibirTabela}
                        listaLivros={listaLivros}
                        setListaLivros={setListaLivros}
                        modoEdicao={modoEdicao}
                        livroParaEditar={livroParaEditar}
                    />
                </Pagina>
            </div>
        );
    }
}