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

module.exports = router;