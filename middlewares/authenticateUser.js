const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).json({ message: "Token is missing" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next()
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = authenticateUser;