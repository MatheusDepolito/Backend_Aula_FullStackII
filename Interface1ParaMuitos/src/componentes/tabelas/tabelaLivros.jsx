import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

export default function TabelaLivros(props) {
    const [listaLivros, setListaLivros] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/livro')
            .then(response => {
                if (response.data.status) {
                    setListaLivros(response.data.listaLivros);
                } else {
                    console.error('Erro ao buscar livros:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar livros:', error);
            });
    }, []);

    const editarLivro = (livro) => {
        props.setModoEdicao(true);
        props.setLivroParaEditar(livro);
        props.setExibirTabela(false)
    };

    const deletarLivro = (livro) => {
        axios.delete('http://localhost:4000/livro', { data: { livroCodigo: livro.livroCodigo } })
            .then(response => {
                console.log('Livro deletado com sucesso:', response.data);
                // Atualizar a lista de livros após a exclusão
                const updatedLivros = listaLivros.filter(item => item.livroCodigo !== livro.livroCodigo);
                setListaLivros(updatedLivros);
            })
            .catch(error => {
                console.error('Erro ao deletar livro:', error);
            });
    };

    return (
        <div>
            <Button onClick={() => {props.setExibirTabela(false); props.setModoEdicao(false)}}>Cadastrar Novo Livro</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Data de Publicação</th>
                        <th>Quantidade em Estoque</th>
                        <th>Autor</th>
                        <th>Categorias</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaLivros.map((livro, index) => (
                        <tr key={livro.livroCodigo}>
                            <td>{livro.livroCodigo}</td>
                            <td>{livro.livroTitulo}</td>
                            <td>{new Date(livro.livroDataPublicacao).toLocaleDateString()}</td>
                            <td>{livro.livroQtdEstoque}</td>
                            <td>{livro.autor}</td>
                            <td>
                                {livro.categorias.map((categoria, index) => (
                                    <span key={index}>{categoria.categoriaNome + ", "}</span>
                                ))}
                            </td>
                            <td>
                                <Button onClick={() => editarLivro(livro)}>Editar</Button>
                                <Button onClick={() => deletarLivro(livro)}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
