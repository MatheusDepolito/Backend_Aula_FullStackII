import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Dropdown } from 'react-bootstrap';
import axios from 'axios';

export default function FormCadLivros(props) {
    const [validado, setValidado] = useState(false);
    const [livro, setLivro] = useState({
        codigo: "",
        titulo: "",
        dataPublicacao: "",
        qtdEstoque: "",
        autorCodigo: "", // Adicionando o campo para o código do autor
        categoriaCodigo: [], // Adicionando o campo para o código da categoria
    });
    const [autores, setAutores] = useState([]); // Estado para armazenar a lista de autores
    const [categorias, setCategorias] = useState([]); // Estado para armazenar a lista de categorias
    

    useEffect(() => {
        if (props.modoEdicao && props.livroParaEditar) {
            const { livroCodigo, livroTitulo, livroDataPublicacao, livroQtdEstoque, autor, categoria } = props.livroParaEditar;
            // Formatar a data para o formato YYYY-MM-DD
            const dataFormatada = new Date(livroDataPublicacao).toISOString().slice(0, 10);
            setLivro({
                codigo: livroCodigo,
                titulo: livroTitulo,
                dataPublicacao: dataFormatada,
                qtdEstoque: livroQtdEstoque,
                autorCodigo: autor,
                categoriaCodigo: categoria,
            });
        }
    }, [props.modoEdicao, props.livroParaEditar]);
    

    useEffect(() => {
        // Buscar lista de autores
        axios.get('http://localhost:4000/autor')
            .then(response => {
                if (response.data.status) {
                    setAutores(response.data.listaAutores);
                } else {
                    console.error('Erro ao buscar autores:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar autores:', error);
            });
        
        // Buscar lista de categorias
        axios.get('http://localhost:4000/categoria')
            .then(response => {
                if (response.data.status) {
                    setCategorias(response.data.listaCategoriasLivros);
                } else {
                    console.error('Erro ao buscar categorias:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    }, []);

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setLivro(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function manipularMudancaCat(codigoCategoria) {
        const categoriasSelecionadas = livro.categoriaCodigo.includes(codigoCategoria)
            ? livro.categoriaCodigo.filter((codigo) => codigo !== codigoCategoria)
            : [...livro.categoriaCodigo, codigoCategoria];
    
        setLivro({ ...livro, categoriaCodigo: categoriasSelecionadas });
    }

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity() === false) {
            setValidado(true);
        } else {
            setValidado(false);
            const dadosLivro = {
                livroTitulo: livro.titulo,
                livroDataPublicacao: livro.dataPublicacao,
                livroQtdEstoque: livro.qtdEstoque,
                autor: livro.autorCodigo
                //categoria: livro.categoriaCodigo,
            };
            if (props.modoEdicao) {
                const dadosLivroAtt = {
                    livroCodigo: parseInt(livro.codigo),
                    livroTitulo: livro.titulo,
                    livroDataPublicacao: livro.dataPublicacao,
                    livroQtdEstoque: parseInt(livro.qtdEstoque),
                    autor: parseInt(livro.autorCodigo)
                };
                // Envie uma solicitação PUT para atualizar o livro
                axios.put(`http://localhost:4000/livro`, dadosLivroAtt)
                    .then(response => {
                        console.log('Livro atualizado com sucesso:', response.data);
                        props.setExibirTabela(true);
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar livro:', error);
                    });
            } else {
                // Envie uma solicitação POST para criar um novo livro
                axios.post('http://localhost:4000/livro', dadosLivro)
                    .then(response => {
                        console.log('Livro cadastrado com sucesso:', response.data);
                        const codigoLivro = response.data.codigoLivro; // Obter o código do livro
                        console.log(codigoLivro)
                        props.setExibirTabela(true);
    
                        // Enviar a solicitação POST para cadastrar as categorias do livro
                        const dadosLivroCategoria = {
                            livroCodigo: codigoLivro, // Usar o código do livro obtido
                            categoriaCodigo: livro.categoriaCodigo
                        };
                        axios.post('http://localhost:4000/livroCategoria', dadosLivroCategoria)
                            .then(response => {
                                console.log('Categorias do livro cadastradas com sucesso:', response.data);
                            })
                            .catch(error => {
                                console.error('Erro ao cadastrar categorias do livro:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Erro ao cadastrar livro:', error);
                    });
            }
        }
    }
    
    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        value={livro.codigo}
                        name="codigo"
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do livro.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="12">
                    <Form.Label>Título do Livro:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Título do Livro"
                        value={livro.titulo}
                        name="titulo"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o título do livro.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Data de Publicação:</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="Data de Publicação"
                        value={livro.dataPublicacao}
                        name="dataPublicacao"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a data de publicação.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Quantidade em Estoque:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Quantidade em Estoque"
                        value={livro.qtdEstoque}
                        name="qtdEstoque"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a quantidade em estoque.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Autor:</Form.Label>
                    <Form.Select
                        required
                        value={livro.autorCodigo}
                        name="autorCodigo"
                        onChange={manipularMudanca}>
                        <option value="">Selecione um autor</option>
                        {autores.map((autor, index) => (
                            <option key={index} value={autor.codigo} selected={livro.autorCodigo === autor.nome}>
                                {autor.nome}
                            </option>
                        ))}
                    </Form.Select>     
                    <Form.Control.Feedback type='invalid'>Por favor, selecione um autor.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label>Categorias:</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Selecione as categorias
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                            {categorias.map((categoria) => (
                                <Form.Check
                                    key={categoria.codigo}
                                    type="checkbox"
                                    label={categoria.nome}
                                    value={categoria.codigo}
                                    checked={livro.categoriaCodigo.includes(categoria.codigo)}
                                    onChange={() => manipularMudancaCat(categoria.codigo)}
                                />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control.Feedback type='invalid'>Por favor, selecione pelo menos uma categoria.</Form.Control.Feedback>
                </Form.Group>


            </Row>
            <Button type="submit">{props.modoEdicao ? 'Atualizar' : 'Gravar'}</Button>
            <Button onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    )
}
