const mongoose = require("mongoose")
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Request Failed (Invalid ID)" })
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    const {
        user,
        pass,
        perms
    } = req.body;
    try {
        const existingUser = await User.find({user: user})
        if (existingUser) {
            res.status(400).json({ error: "User already exists" })
        }
        const newUser = await User.create({
            user,
            pass,
            perms
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json(error);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Request Failed (Invalid ID)" })
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }
    res.status(200).json(user);
};

const loginUser = async (req, res) => {
    const {
        user,
        pass
    } = req.body;
    try {
        const userItem = await User.findOne({user: user})
        if (userItem) {
            const result = userItem.pass === pass;
            if (result) {
                res.status(200).json(userItem);
            } else {
                res.status(403).json({ error: "Incorrect Password" });
            }    
        } else {
            res.status(404).json({ error: "User doesn't exist" });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    loginUser,
};