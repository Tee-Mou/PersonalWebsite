const mognoose = require("mongoose")
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectID.isValid(id)) {
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
        const user = await User.create({
            user,
            pass,
            perms
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json(error);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectID.isValid(id)) {
        return res.status(400).json({ error: "Request Failed (Invalid ID)" })
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }
    res.status(200).json(user);
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
};