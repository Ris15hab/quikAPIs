const jwt = require('jsonwebtoken');
const { createError } = require('./error')

const verifyToken = (req, res, next) => {
    const token = req.header('authentication')
    if (!token) {
        return next(createError(400, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return next(createError(400, "Token is not valid!"));
        req.user = user;
        next();
    });
};

module.exports = { verifyToken };