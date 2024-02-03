const express = require('express');
const routes = express.Router();
require('dotenv').config();
const {
    login,
    listarUsuarios,
    acessarNotas,
    criarNotas
} = require('../controllers/controllers');
const {
    verifyJWT
} = require('../middleware/middleware');

routes.get('/usuarios', listarUsuarios);
routes.post('/login', login);
routes.get('/notas/:id', verifyJWT, acessarNotas);
routes.post('/:id/minhas-notas', verifyJWT, criarNotas);

module.exports = routes;