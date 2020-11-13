const express = require('express');
const router = express.Router();
const Room = require ("../../Room")

// create a room
router.post('/create', async (req, res, next) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const roomToCreate = new Room({
        name: req.body.name
    });

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