const jwt = require('jsonwebtoken');
const users = require('../../dados/usuarios');

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

module.exports = {
    login
};