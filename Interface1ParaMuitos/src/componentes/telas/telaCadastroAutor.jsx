import FormCadAutores from "../formularios/formCadAutores";
import TabelaAutores from "../tabelas/tabelaAutores";
import Pagina from "../templates/pagina";
import { useState } from "react";

export default function TelaCadastroAutor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaAutores, setListaAutores] = useState([]);

    if (exibirTabela) {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Autores</h1>
                    <br/>
                    <h2>Lista de Autores</h2>
                    <TabelaAutores listaAutores={listaAutores} setExibirTabela={setExibirTabela} />
                </Pagina>
            </div>
        )
    }
    else {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Autores</h1>
                    <br/>
                    <h2>Formulário de cadastro de Autores</h2>
                    <FormCadAutores 
                        setExibirTabela={setExibirTabela}
                        listaAutores={listaAutores}
                        setListaAutores={setListaAutores}
                     />
                </Pagina>
            </div>
        )
    }
}