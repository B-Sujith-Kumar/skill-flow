const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) {
        console.log("token is null");
        return res.status(401).send({ message: 'Access Denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Error:", err);
            return res.status(403).send({ message: 'Invalid Token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;