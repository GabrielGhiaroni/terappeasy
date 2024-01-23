const express = require('express');
const routes = express.Router();
require('dotenv').config();
const {
    login
} = require('./controllers/controllers');

routes.post('/login', login);

routes.get('/:id/minhas-notas', (req, res) => {

    const usuario = users.find(user => user.id === parseInt(req.params.id));

    if (!usuario) {
        return res.status(404).json('Usuário não encontrado.')
    }

    const notasDoUsuario = usuario.notas;

    res.status(200).json(notasDoUsuario);

});

module.exports = routes;