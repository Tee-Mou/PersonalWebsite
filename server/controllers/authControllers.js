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
            {userID: userItem._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });
    
        res.status(200).json({ message: "Successfully logged in" });
    })
};

const logout = async (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Successfully logged out"})
}

const me = async (req, res) => {
    try {
        const token = req.cookies.token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { 
            const id = decoded.userID
            userItem = await User.findOne({_id: id}).select('-pass');
            if (!userItem) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(userItem);
        });
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