const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const login = async (req, res) => {
    const { user, pass } = req.body;
    const userItem = await User.findOne({ user });
    if (!userItem) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    bcrypt.compare(pass, userItem.pass)
    .then((validPassword) => {
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            {userID: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });
    
        res.status(200).json({ 
            message: "Successfully logged in", 
            user: userItem.user, 
            perms: userItem.perms });
    })
};

const logout = async (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Successfully logged out"})
}

const me = async (req, res) => {
    try {
        userItem = await User.findOne(req.user).select('-pass');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    login,
    logout,
    me,
}