const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-1701617.okta.com/oauth2/default',
});

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(' ')[1];

  let jwt;
  try {
    jwt = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }

  res.locals.claims = {
    userId: jwt.claims.uid,
    roomsAdded: jwt.claims.roomsAdded,
    roomsOwned: jwt.claims.roomsOwned,
  };

  return next();
};

module.exports = authenticateUser;
