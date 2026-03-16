const jwt = require("jsonwebtoken");

const authSession = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Authentication Failed", message: "No token provided"});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next()
    }
    catch (error) {
        return res.status(403).json({ error: "Authentication Failed", message: "Invalid or expired token provided"})
    }
}

module.exports = { authSession };