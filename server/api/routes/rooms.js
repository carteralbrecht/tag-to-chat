const express = require('express');
const router = express.Router();
const Room = require ("../../models/Room");

// create a room
router.post('/create', async (req, res, next) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const roomToCreate = new Room({
        name: req.body.name,
        users: [],
        createdBy: req.body.id,
    });

    roomToCreate.users.push({
        id: req.body.id,
        active: false
    })

    roomToCreate
        .save(roomToCreate)
        .then(data => {
        res.send(data)
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

// leave a user from room
// (mark as not active)
router.post('/leaveUser/:id', async (req, res, next) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const conditions = {
        _id: req.params.id,
        'users.id': req.body.id
    };

    const update = {
        $set: {"users.$.active": false}
    };

    Room.findOneAndUpdate(conditions, update, {new: true}, (err, room) => {
        if (err)
            res.send(err);
        else
            res.send(room);
    });

});

// join a user to room
// (mark as active)
router.post('/joinUser/:id', async (req, res, next) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const conditions = {
        _id: req.params.id,
        'users.id': req.body.id
    };

    const update = {
        $set: {"users.$.active": true}
    };

    Room.findOneAndUpdate(conditions, update, {new: true}, (err, room) => {
        if (err)
            res.send(err);
        else
            res.send(room);
    });

});

// add user to room
router.post('/addUser/:id', async (req, res, next) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const conditions = {
        _id: req.params.id,
        'users.id': {$ne: req.body.id}
    };

    const update = {
        $addToSet: {users: {id: req.body.id, active: false}}
    };

    Room.findOneAndUpdate(conditions, update, {new: true}, (err, room) => {
        if (err)
            res.send(err);
        else
            res.send(room);
    });

});

// remove user from room
router.post('/removeUser/:id', async (req, res, next) => {
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

    Room.findOneAndUpdate(conditions, update, {new: true}, (err, room) => {
        if (err)
            res.send(err);
        else
            res.send(room);
    });

});

module.exports = router;