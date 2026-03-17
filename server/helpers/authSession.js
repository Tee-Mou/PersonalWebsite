const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
const authAdminSession = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Authentication Failed", message: "No token provided"});
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) throw err;
            const id = decoded.userID
            userItem = await User.findOne({
                $or: [
                    {_id: id, perms: "admin"},
                    {_id: id, perms: "owner"}
                ]
            }).select('-pass');

            if (!userItem) {
                return res.status(404).json({ error: 'Admin user not found' });
            }
        });
        next()
    }
    catch (error) {
        return res.status(403).json({ error: "Authentication Failed", message: "Invalid or expired token provided"})
    }
}

module.exports = { authSession, authAdminSession };