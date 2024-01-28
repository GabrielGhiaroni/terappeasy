const express = require('express');
const routes = express.Router();
require('dotenv').config();
const {
    login,
    acessarNotas,
    criarNotas
} = require('../controllers/controllers');
const {
    verifyJWT
} = require('../middleware/middleware');

routes.post('/login', login);
routes.get('/:id/minhas-notas', verifyJWT, acessarNotas);
routes.post('/:id/minhas-notas', verifyJWT, criarNotas);

module.exports = routes;