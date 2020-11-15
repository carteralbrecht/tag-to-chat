const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');
const got = require('got');

router.post('/forgot', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const email = req.body.email;

  let user;
  try {
    user = await oktaClient.getUser(email);
  } catch (err) {
    // Sends success if email not found for user security
    return res.status(200).send();
  }

  // Send recovery email
  let response;
  try {
    response = await got.post(user._links.forgotPassword.href, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `SSWS ${process.env.OKTA_TOKEN}`
      }
    }).json();
  } catch (err) {
    return res.status(400).send(err);
  }

  return res.status(200).send();
});

router.put('/create', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      email: req.body.email,
      login: req.body.email,
      nickName: req.body.nickName,
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
    return res.status(400).send(err);
  }

  return res.status(201).send(user);
});

module.exports = router;