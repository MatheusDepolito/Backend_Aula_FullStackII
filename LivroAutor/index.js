import express from 'express';
import cors from 'cors';
import rotaAutor from './Rotas/rotaAutor.js';
import rotaLivro from './Rotas/rotaLivro.js';
import { verificarAcesso } from './Segurança/Autenticacao.js'
import rotaCategoria from './Rotas/rotaCategoria.js'
import dotenv from 'dotenv';
import session from 'express-session'
import rotaLogin from './Rotas/rotaLogin.js'
import rotaLivroCategoria from './Rotas/rotaLivroCategoria.js'

const host = "0.0.0.0";
const porta = "4000"

dotenv.config();

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: true,
    maxAge: 60000
}))

app.use('/login', rotaLogin);
app.use('/autor', /*verificarAcesso,*/ rotaAutor);
app.use('/livro', /*verificarAcesso,*/ rotaLivro);
app.use('/categoria', /*verificarAcesso,*/ rotaCategoria);
app.use('/livroCategoria', /*verificarAcesso,*/  rotaLivroCategoria)

app.listen(porta, host, ()=>{
    console.log(`Server listening in the port http://${host}:${porta}`);
});