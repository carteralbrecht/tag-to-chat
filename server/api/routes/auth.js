const express = require('express');
const router = express.Router();
const got = require('got');

// These fields are public and can be displayed
const clientId = '0oafbxrwozMdHHnSC5d5';
const oktaDomain = 'dev-1701617.okta.com';

router.post('/access', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const sessionToken = req.body.sessionToken;

    const qs = `client_id=${clientId}&sessionToken=${sessionToken}&response_type=token&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2Fcallback&nonce=testNonce&state=testState`;
        
    const url = `https://${oktaDomain}/oauth2/v1/authorize?${qs}`;
    console.log('url: ', url);
    let response;
    try {
        response = await got(url, {
            followRedirect: false
        });
    } catch (err) {
        return res.status(500).send(err);
    }

    const locationUrl = response.headers.location;
    let match = locationUrl.match(/access_token=(.+)\&token/);
    if (!match || !match[1]) {
        return res.status(500).send('Error parsing access token');
    }
    const accessToken = match[1];
    return res.status(200).send({accessToken});
});

module.exports = router;