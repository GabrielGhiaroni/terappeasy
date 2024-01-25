const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.headers['authorization'];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json('Token inválido.');

        const userId = decoded.userId;

        req.params.id = userId;

        next();
    });
};

module.exports = {
    verifyJWT
};