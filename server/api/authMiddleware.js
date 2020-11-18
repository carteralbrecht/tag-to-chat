const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-1701617/oauth2/default'
});

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(403);
    }

    const token = authHeader.split(' ')[1];

    console.log('Token: ', token);

    let jwt;
    try {
        jwt = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
    } catch (err) {
        console.log(err);
        return res.sendStatus(403);
    }

    console.log(jwt);

    res.locals.claims = jwt.claims;

    return next();
}

module.exports = authenticateUser;