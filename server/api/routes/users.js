const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');

router.post('/create', async (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  let user;
  try {
    user = await oktaClient.createUser(newUser);
  } catch (err) {
    res.status(400);
    return res.send(err);
  }

  res.status(201);
  return res.send(user);
});

module.exports = router;