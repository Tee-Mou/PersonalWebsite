const express = require("express");
const {
    login,
    logout,
    me
} = require("../controllers/authControllers");

const { authSession } = require("../helpers/authSession")
const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/me", authSession, me);

module.exports = router;
