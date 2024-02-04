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
        } = await query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);

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
        } = await query('SELECT * FROM usuarios');
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
        } = await query('SELECT * FROM notas WHERE usuario_id = $1', [idUsuario]);

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

const criarNotas = async (req, res) => {
    try {
        const idUsuario = req.user.userId;
        const conteudoNota = req.body.conteudo;
        const {
            rows: nota
        } = await query('INSERT INTO Notas (usuario_id, conteudo) VALUES ($1, $2) RETURNING *', [idUsuario, conteudoNota]);
        res.status(200).json(nota);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const editarNotas = async (req, res) => {
    try {
        const idNota = req.params.idNota;
        const conteudoNotaEditada = req.body.conteudo;
        const {
            rows: notaAtualizada
        } = await query('UPDATE Notas SET conteudo = $2 WHERE id = $1 RETURNING *', [idNota, conteudoNotaEditada]);

        if (notaAtualizada.lenght === 0) {
            return res.status(404).send('Essa nota não sofreu alterações.')
        }

        res.status(200).json(notaAtualizada[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    login,
    listarUsuarios,
    acessarNotas,
    criarNotas,
    editarNotas
};