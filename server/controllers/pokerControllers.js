const mongoose = require("mongoose")

const Session = require("../models/sessionModel");
const Player = require("../models/playerModel");


const getAllSessions = (req, res) => {
    const allSessions = await Session.find({});
    res.status(200).json(allSessions);
}

const getSession = (req, res) => {
    const id = req.body;
    const session = await Session.find({ _id: id });
    res.status(200).json(session);
}

const addSession = (req, res) => {
    const sessionDate = req.body;
    const existingSession = await Session.find({ date: sessionDate })
    if (existingSession){
        return res.status(409).json({ error: "Session already exists" });
    }
    try {
        const newSession = await Session.create({
            date: sessionDate
        })
        .then( res.status(201).json({ message: "Successfully added session"}) )
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
}

const getAllPlayers = (req, res) => {
    const allPlayers = await Player.find({});
    res.status(200).json(allPlayers);
}

const getPlayer = (req, res) => {
    const id = req.body;
    const player = await Session.find({ _id: id });
    res.status(200).json(player);
}

const addPlayer = (req, res) => {
    const playerName = req.body
    const existingPlayer = await Player.find({ name: playerName, })
    if (existingPlayer) {
        return res.status(409).json({ error: "Player already exists" });
    }
    try {
        const newUser = await Player.create({
            name: playerName, 
            statistics: {
                cashout: 0,
                sessionsPlayed: 0,
                cashoutPerSession: 0,
                cashoutDeviation: 0,
                hoursPlayed: 0,
                cashoutPerHour: 0,
                bestSessionDate: "N/A",
                bestSessionCashout: 0,
                worstSessionDate: "N/A",
                worstSessionCashout: 0,
                lastPlayed: "N/A",
            },
        })
        .then( res.status(201).json({ message: `Successfully added a player: ${playerName}` }) )
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

const addPlayerToSession = (req, res) => {
    const {playerName, playerCashout, sessionDate} = req.body;
    const player = Player.Find({ playerName });
    if (!player) {
        return res.status(500).json({ error: `Player not found with name ${playerName}` })
    }
    try {
        const session = Session.findOneAndUpdate({ date: sessionDate }, {$push: {players: {player, playerCashout}}})
        .then(() => {
            return res.status(200).json({ message: `Sucessfully added ${playerName} to session on ${sessionDate}` })
        })
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
}

const updatePlayerStats = (req, res) => {
    const {playerName, newStats} = req.body;
    try {
        const player = Player.findOneAndUpdate({ playerName }, { statistics: newStats })
        .then(() => {
            return res.status(200).json({ message: "Successfully updated player stats." })
        })
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }    
}

module.exports = {
    getAllSessions,
    getSession,
    addSession,
    getAllPlayers,
    getPlayer,
    addPlayer,
    addPlayerToSession,
    updatePlayerStats,
}