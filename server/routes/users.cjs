const express = require("express");
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateCredentials,
} = require("../controllers/userControllers");
const { authAdminSession, authSession } = require("../helpers/authSession");

const router = express.Router();

router.get("/", authAdminSession, getAllUsers);
router.get("/one/:id", authAdminSession, getUser);
router.delete("/:id", authAdminSession, deleteUser);
router.post("/update", authSession, updateCredentials)

module.exports = router;
