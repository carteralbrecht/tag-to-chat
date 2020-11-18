const express = require('express');
const router = express.Router();
const Room = require ("../../models/Room");
const {v4: uuidv4} = require('uuid');
const oktaClient = require('../lib/oktaClient');
const authenticateUser = require('../authMiddleware');

// TODO: Everything shouldn't be a post
// TODO: Better Responses
// TODO: Edge Cases and Error Handling
// create a room
router.post('/create', authenticateUser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const email = req.body.email;
    const private = req.body.private;

    let user;
    try {
        user = await oktaClient.getUser(email);
    } catch (err) {
        return res.status(500).send(err);
    }

    const ownerId = user.id;

    const roomToCreate = new Room({
        name,
        ownerId,
        private,
        joinCode: uuidv4(),
        users: [],
        messages: []
    });

    roomToCreate.users.push({
        userId: req.body.id,
        active: false
    });

    let data;
    try {
        data = await roomToCreate.save();
    } catch (err) {
        return res.status(500).send(err);
    }

    const roomId = data._id;

    // Adds authentication claims to user
    if (!user.profile.roomsOwned) {
        user.profile.roomsOwned = [];
    }

    if (!user.profile.roomsAdded) {
        user.profile.roomsAdded = [];
    }

    user.profile.roomsOwned.push(roomId);
    user.profile.roomsAdded.push(roomId);

    console.log(user.profile);

    await user.update();

    return res.status(200).send(data);
});

// delete room
router.delete('/delete/:roomId', authenticateUser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const roomId = req.params.roomId;
    const roomsOwned = res.locals.claims.roomsOwned;

    // Check user claims before executing transaction
    if (!roomsOwned || !roomsOwned.includes(roomId)) return res.sendStatus(403);

    try {
        await Room.deleteOne({ _id: roomId })
    } catch (err) {
        return res.sendStatus(404);
    }

    return res.sendStatus(204);
});

// leave a user from room
// (mark as not active)
router.post('/leave/:roomId', authenticateUser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const roomId = req.params.roomId;
    const userId = req.body.userId;
    const roomsAdded = res.locals.claims.roomsAdded;

    // Check user claims before executing transaction
    if (!roomsAdded || !roomsAdded.includes(roomId)) return res.sendStatus(403);

    const conditions = {
        _id: roomId,
        'users.userId': userId
    };

    const update = { $set: { "users.$.active": false } };

    let room;
    try {
        room = await Room.findOneAndUpdate(conditions, update, {new: true});
    } catch (err) {
        return res.status(500).send(err);
    }

    return res.status(200).send(room);
});

// join a user to room
// (mark as active)
router.post('/join/:roomId', authenticateUser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const roomId = req.params.roomId;
    const userId = req.body.userId;
    const roomsAdded = res.locals.claims.roomsAdded;

    // Check user claims before executing transaction
    if (!roomsAdded || !roomsAdded.includes(roomId)) return res.sendStatus(403);

    const conditions = {
        _id: roomId,
        'users.id': userId
    };

    const update = {
        $set: {"users.$.active": true}
    };

    let room;
    try {
        room = await Room.findOneAndUpdate(conditions, update, {new: true});
    } catch (err) {
        res.status(500).send(err);
    }

    return res.status(200).send(room);
});

// add user to room
router.post('/add/:roomId', authenticateUser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const roomId = req.params.roomId;
    const userId = req.body.userId;
    const joinCode = req.body.joinCode;

    const conditions = {
        _id: roomId,
        joinCode,
        'users.id': {$ne: userId}
    };

    const update = {
        $addToSet: {users: {userId, active: false}}
    };

    let room;
    try {
        room = await Room.findOneAndUpdate(conditions, update, {new: true});
    } catch (err) {
        return res.status(500).send(err);
    }

    return res.status(200).send(room);
});

// remove user from room
router.delete('/remove/:roomId', authenticateUser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const roomId = req.params.roomId;
    const userId = req.body.userId;

    // Check user claims before executing transaction
    if (!res.locals.claims.roomsOwned.includes(roomId)) return res.sendStatus(403);

    const conditions = {
        _id: roomId,
        'users.id': userId
    };

    const update = {
        $pull: {users: { userId }}
    };

    let room;
    try {
        room = await Room.findOneAndUpdate(conditions, update, {new: true});
    } catch (err) {
        return res.status(500).send(err);
    }

    return res.status(200).send(room);
});

module.exports = router;