const express = require("express");
const {
    getAllSessions,
    getSession,
    addSession,
    getAllPlayers,
    getPlayer,
    addPlayer,
    addPlayerToSession,
    updatePlayerStats,
} = require("../controllers/pokerControllers");
const { authSession } = require("../helpers/authSession")

const router = express.Router();

router.get("/session", authSession, getAllSessions);
router.get("/session/:id", authSession, getSession);
router.post("/session", authSession, addSession);
router.get("/player/", authSession, getAllPlayers);
router.get("/player/:id", authSession, getPlayer);
router.post("/player", authSession, addPlayer);
router.post("/session/player", authSession, addPlayerToSession);
router.post("/player/update", authSession, updatePlayerStats)


module.exports = router;
