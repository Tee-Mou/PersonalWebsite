const express = require("express");
const {
    test,
} = require("../controllers/galleryControllers");
const { authSession } = require("../helpers/authSession")

const router = express.Router();

router.get("/", authSession, test);

module.exports = router;
