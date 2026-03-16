const express = require("express");
const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
} = require("../controllers/userControllers");
const { authSession } = require("../helpers/authSession");

const router = express.Router();

router.get("/", authSession, getAllUsers);
router.get("/:id", authSession, getUser);
router.post("/", authSession, createUser);
router.delete("/:id", authSession, deleteUser);

module.exports = router;
