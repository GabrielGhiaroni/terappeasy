const jwt = require('jsonwebtoken');
const {
    query
} = require('./conexao');

function login(req, res) {
    const {
        email,
        senha
    } = req.body;

    const usuario = dados.find(user => user.email === email && user.senha === senha);

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
};

const listarUsuarios = async (req, res) => {
    const usuarios = await query('select * from usuarios');
    res.status(200).json(usuarios);
}

function acessarNotas(req, res) {

    const usuario = dados.find(user => user.id === parseInt(req.params.id));

    const notas = usuario.notas;

    if (notas.length > 0) {
        res.status(200).json(notas);
    } else {
        res.status(404).json('Não há notas cadastradas para esse usuário.');
    }
};

function criarNotas(req, res) {
    const {
        id
    } = req.params

    const {
        conteudo
    } = req.body;

    const usuario = dados.find(user => user.id === parseInt(id));

    if (!usuario) {
        return res.status(404).send('Usuário não encontrado.');
    }

    const novaNota = {
        id: usuario.notas.length + 1,
        conteudo
    }

    usuario.notas.push(novaNota);

    res.status(201).send(novaNota)

};

module.exports = {
    login,
    listarUsuarios,
    acessarNotas,
    criarNotas
};