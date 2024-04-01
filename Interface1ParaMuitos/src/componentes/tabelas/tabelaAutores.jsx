import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

export default function TabelaAutores(props) {
    const [listaAutores, setListaAutores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/autor')
            .then(response => {
                if (response.data.status) {
                    setListaAutores(response.data.listaAutores);
                } else {
                    console.error('Erro ao buscar autores:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar autores:', error);
            });
    }, []);

    return (
        <div>
            <Button onClick={() => {
                props.setExibirTabela(false);
            }}>
                Cadastrar Novo Autor
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {listaAutores.map((autor, index) => (
                        <tr key={index}>
                            <td>{autor.codigo}</td>
                            <td>{autor.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
