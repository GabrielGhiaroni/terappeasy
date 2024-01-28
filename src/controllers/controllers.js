const jwt = require('jsonwebtoken');
const users = require('../../dados/usuarios');
const dados = require('../../dados/usuarios');

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
            usuario,
            token
        });
    } else {
        return res.status(401).json({
            message: "Credenciais inválidas"
        });
    }
}

function acessarNotas(req, res) {

    const usuario = dados.find(user => user.id === parseInt(req.params.id));

    const notas = usuario.notas;

    if (notas.length > 0) {
        res.status(200).json(notas);
    } else {
        res.status(404).json('Não há notas cadastradas para esse usuário.');
    }
}

module.exports = {
    login,
    acessarNotas
};