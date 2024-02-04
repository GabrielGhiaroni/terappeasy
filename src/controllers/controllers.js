const jwt = require('jsonwebtoken');
const {
    query
} = require('./conexao');

const login = async (req, res) => {
    try {
        const {
            email,
            senha
        } = req.body;

        const {
            rows: usuario
        } = await query('SELECT * FROM USUARIOS WHERE EMAIL = $1 AND SENHA = $2', [email, senha]);

        if (usuario) {
            const token = jwt.sign({
                userId: usuario[0].id
            }, process.env.JWT_SECRET, {
                expiresIn: '300s'
            });
            return res.status(200).json({
                usuario,
                token
            });
        } else {
            return res.status(401).json({
                message: "Credenciais inválidas"
            });
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const {
            rows: usuarios
        } = await query('SELECT * FROM USUARIOS');
        if (usuarios.length > 0) {
            res.status(200).json(usuarios);
        } else {
            res.status(404).send('Não foi encontrado nenhum usuário.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocorreu um erro ao tentar acessar a lista de usuários.');
    }
}

const acessarNotas = async (req, res) => {
    try {
        const idUsuario = req.user.userId;

        const {
            rows: notas
        } = await query('SELECT * FROM NOTAS WHERE USUARIO_ID = $1', [idUsuario]);

        if (notas.length > 0) {
            res.status(200).json(notas);
        } else {
            res.status(404).send('Nenhuma nota encontrada para este usuário.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro ao acessar as notas.');
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