const express = require('express');
const router = express.Router();
const Room = require ("../../models/Room");
const {v4: uuidv4} = require('uuid');
const oktaClient = require('../lib/oktaClient');

// TODO: Everything shouldn't be a post
// TODO: Better Responses
// TODO: Edge Cases and Error Handling
// create a room
router.post('/create', async (req, res) => {
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
router.delete('/delete/:id', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    try {
        await Room.deleteOne({ _id: req.params.id })
    } catch (err) {
        return res.sendStatus(404);
    }

    return res.sendStatus(204);
});

// leave a user from room
// (mark as not active)
router.post('/leave/:id', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const conditions = {
        _id: req.params.id,
        'users.userId': req.body.id
    };

    const update = {
        $set: {"users.$.active": false}
    };

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
router.post('/join/:id', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const conditions = {
        _id: req.params.id,
        'users.id': req.body.id
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
router.post('/add/:id', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const conditions = {
        _id: req.params.id,
        joinCode: req.body.joinCode,
        'users.id': {$ne: req.body.userId}
    };

    const update = {
        $addToSet: {users: {userId: req.body.userId, active: false}}
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
router.delete('/remove/:id', async (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const conditions = {
        _id: req.params.id,
        'users.id': req.body.id
    };

    const update = {
        $pull: {users: {id: req.body.id}}
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