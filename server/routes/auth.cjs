const express = require("express");
const {
    login,
    logout,
    register,
    me,
} = require("../controllers/authControllers");

const { authSession } = require("../helpers/authSession")
const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/me", authSession, me);

module.exports = router;
