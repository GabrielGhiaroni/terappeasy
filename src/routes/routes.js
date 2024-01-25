const express = require('express');
const routes = express.Router();
require('dotenv').config();
const {
    login
} = require('../controllers/controllers');
const jwt = require('jsonwebtoken');
// const {
//     verifyJWT
// } = require('../middleware/middleware');
const dados = require('../../dados/usuarios');

function verifyJWT(req, res, next) {
    const token = req.headers['authorization'];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json('Token inválido.');

        const userId = decoded.userId;

        req.params.id = userId;

        next();
    });
};

routes.post('/login', login);

routes.get('/:id/minhas-notas', verifyJWT, (req, res) => {
    const usuario = dados.find(user => user.id === parseInt(req.params.id));

    const notas = usuario.notas;

    res.status(200).json(notas);
});

module.exports = routes;