const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    var userItem;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            userItem = await User.findOne({ user: id }).select('-pass');
        } else {
            userItem = await User.findById(id).select('-pass');
        }
    }
    catch {
        return res.status(400).json({ error: "Invalid ID/Username" });
    }
    if (!userItem) {
        return res.status(404).json({ error: "User doesn't exist" });
    }   
    res.status(200).json(userItem);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.token;
    var reqUserPerms;
    await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { 
        if (err) throw err;
        const reqId = decoded.userID
        userItem = await User.findOne({_id: reqId}).select('-pass');
        if (!userItem) {
            return res.status(404).json({ error: "User doesn't exist" });
        }
        reqUserPerms = userItem.perms;
    });
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Request Failed (Invalid ID)" })
    }
    const user = await User.findOneAndDelete({ _id: id, perms: { $lt: reqUserPerms } });
    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }
    res.status(200).json(user);
};

const updateCredentials = async (req, res) => {
    const { newUser, newPass } = req.body
    const token = req.cookies.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            const id = decoded.userID
            if (newUser) {
                userExists = await User.findOne({ user: newUser })
                if (userExists) {
                    return res.status(409).json({ error: "User already exists "})
                }
                await User.findOneAndUpdate({ _id: id }, { user: newUser })
                .then(() => {
                    return res.status(200).json({ message: "Sucessfully changed username" })
                })

            }
            if (newPass) {
                bcrypt.hash(newPass, 12, async (err, hashPass) => {
                    await User.findOneAndUpdate({ _id: id }, { pass: hashPass })
                    .then(() => {
                        return res.status(200).json({ message: "Successfully changed password" })
                })
                })
            }
        });
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateCredentials,
};