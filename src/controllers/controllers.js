const jwt = require('jsonwebtoken');
const users = require('../../dados/usuarios');
const {
    verifyJWT
} = require('../middleware/middleware');

function login(req, res) {
    const {
        email,
        senha
    } = req.body;

    const usuario = users.find(user => user.email === email && user.senha === senha);

    if (usuario) {
        const token = jwt.sign({
            userId: usuario.id
        }, process.env.JWT_SECRET, {
            expiresIn: 300
        })
        return res.status(200).json({
            auth: true,
            token
        });
    } else {
        return res.status(401).json({
            message: "Credenciais inválidas"
        });
    }
}

function acessarNotas(req, res, middleware) {

    const userAutenticado = middleware.userId;

    const usuario = userAutenticado.find(user => user.id === parseInt(req.params.id));

    if (!usuario) {
        return res.status(404).json('Usuário não encontrado.')
    }

    const notasDoUsuario = usuario.notas;

    res.status(200).json(notasDoUsuario);

}

module.exports = {
    login
};