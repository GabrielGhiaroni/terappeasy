const express = require('express');
const routes = express.Router();
require('dotenv').config();
const {
    login,
    listarUsuarios,
    acessarNotas,
    criarNotas,
    editarNotas,
    deletarNotas
} = require('../controllers/controllers');
const {
    verifyJWT
} = require('../middleware/middleware');

routes.get('/usuarios', listarUsuarios);
routes.post('/login', login);
routes.get('/notas/:id', verifyJWT, acessarNotas);
routes.post('/notas/:id', verifyJWT, criarNotas);
routes.put('/notas/:idNota', verifyJWT, editarNotas);
routes.delete('/notas/:idNota', verifyJWT, deletarNotas);

module.exports = routes;