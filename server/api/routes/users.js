const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');
const got = require('got');
const authenticateUser = require('../authMiddleware');

router.get('/', authenticateUser, async (req, res) => {
  const claims = res.locals.claims;
  const userId = claims.userId;

  let user;
  try {
    user = await oktaClient.getUser(userId);
  } catch (err) {
    return res.status(500).send(err);
  }

  return res.status(200).send({user});
})

router.post('/updateProfile', authenticateUser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userInfo = req.body.userInfo;
  const claims = res.locals.claims;
  const userId = claims.userId;

  let user;
  try {
    user = await oktaClient.getUser(userId);
  } catch (err) {
    return res.status(500).send(err);
  }

  user.profile.nickName = userInfo.nickName;
  user.profile.firstName = userInfo.firstName;
  user.profile.lastName = userInfo.lastName;

  try {
    await user.update();
  } catch (err) {
    return res.status(500).send(err);
  }

  return res.sendStatus(204);
});

router.post('/login', async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let response;
  try {
    response = await got.post('https://dev-1701617.okta.com/api/v1/authn', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `SSWS ${process.env.OKTA_TOKEN}`,
      },
      body: JSON.stringify({
        username: req.body.username,
        password: req.body.password,
      })
    }).json();
  } catch (err) {
    return res.status(500).send(err);
  }

  const sessionToken = response.sessionToken;
  return res.status(200).send({sessionToken});
});

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
  try {
    await got.post(user._links.forgotPassword.href, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `SSWS ${process.env.OKTA_TOKEN}`,
      },
    });
  } catch (err) {
    return res.status(500).send(err);
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
        value: req.body.password,
      },
    },
  };
  let user;
  try {
    user = await oktaClient.createUser(newUser);
  } catch (err) {
    return res.status(500).send(err);
  }

  return res.status(201).send(user);
});

module.exports = router;
