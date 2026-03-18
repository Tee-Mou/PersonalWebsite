const express = require("express");
const {
    getAllUsers,
    getUser,
    deleteUser,
} = require("../controllers/userControllers");
const { authAdminSession } = require("../helpers/authSession");

const router = express.Router();

router.get("/", authAdminSession, getAllUsers);
router.get("/one/:id", authAdminSession, getUser);
router.delete("/:id", authAdminSession, deleteUser);

module.exports = router;
