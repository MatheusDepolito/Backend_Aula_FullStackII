

CREATE TABLE autor(
    autor_codigo INT NOT NULL AUTO_INCREMENT,
    autor_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_autor PRIMARY KEY(autor_codigo)
);

CREATE TABLE livros(
    livro_codigo INT NOT NULL AUTO_INCREMENT,
    livro_titulo VARCHAR(100) NOT NULL,
    livro_dataPublicacao DATE,
    livro_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    autor_codigo INT NOT NULL,
    CONSTRAINT pk_livros PRIMARY KEY(livro_codigo),
    CONSTRAINT fk_autor FOREIGN KEY(autor_codigo) REFERENCES autor(autor_codigo)
);

CREATE TABLE categoria_livro (
    categoria_codigo INT NOT NULL AUTO_INCREMENT,
    categoria_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY (categoria_codigo)
);

CREATE TABLE livro_categoria (
    livro_codigo INT NOT NULL,
    categoria_codigo INT NOT NULL,
    CONSTRAINT pk_livro_categoria PRIMARY KEY (livro_codigo, categoria_codigo),
    CONSTRAINT fk_livro_categoria_livro FOREIGN KEY (livro_codigo) REFERENCES livros (livro_codigo),
    CONSTRAINT fk_livro_cat FOREIGN KEY (categoria_codigo) REFERENCES categoria_livro (categoria_codigo)
);