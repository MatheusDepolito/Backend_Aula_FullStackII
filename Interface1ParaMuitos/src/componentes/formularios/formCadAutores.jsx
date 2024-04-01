import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios'; // Importe o Axios


export default function FormCadAutores(props) {
    // ? Conceito de estado de um componente React
    // ? O estado de um componente React é preservado independete de quantas vezes o componente foi renderizado (reiniciado)
    const [validado, setValidado] = useState(false);
    const [autor, setAutor] = useState({
        nome: "",
    });

    function manipularMudanca(evento) {
        //extrair do evento onChange quem provocou a sua ocorrência
        const componente = evento.currentTarget;
        setAutor({ ...autor, [componente.name]: componente.value });
    }

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity() === false) {
            setValidado(true);
        } else {
            setValidado(false);
            // ! Dados a serem enviados para o servidor
            const dadosAutor = {
                nomeAutor: autor.nome,
            };
            // Enviar os dados para o servidor usando Axios
            axios.post('http://localhost:4000/autor', dadosAutor)
                .then(response => {
                    console.log('Autor cadastrado com sucesso:', response.data);
                    // Adicionar o novo autor à lista local
                    props.setListaAutores([...props.listaAutores, response.data.autor]);
                    // Voltar a exibir a tabela após cadastrar o autor
                    props.setExibirTabela(true);
                })
                .catch(error => {
                    console.error('Erro ao cadastrar autor:', error);
                });
        }
    }
    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Primeiro nome"
                        value={autor.nome}
                        id="nome"
                        name="nome"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o primeiro nome.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Gravar</Button>
            <Button onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}