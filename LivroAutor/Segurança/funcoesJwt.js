import jwt from 'jsonwebtoken';

export function assinar(usuario) {
    const token = jwt.sign({usuario}, process.env.SECRET, {expiresIn: '1d'});
    return token;
}

export function verificarAssinatura(token) {

    return jwt.verify(token, process.env.SECRET);
}