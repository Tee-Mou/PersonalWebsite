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
            console.log(id)
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
        const id = decoded.userID
        userItem = await User.findOne({_id: id}).select('-pass');
        if (!userItem) {
            return res.status(404).json({ error: 'User not found' });
        }
        reqUserPerms = userItem.perms;
    });
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Request Failed (Invalid ID)" })
    }
    console.log(`Req User Perms: ${reqUserPerms}`)
    const user = await User.findOneAndDelete({ _id: id, perms: { $lt: reqUserPerms } });
    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }
    res.status(200).json(user);
};



module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
};