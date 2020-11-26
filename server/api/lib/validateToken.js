const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-1701617.okta.com/oauth2/default',
});

const validateToken = async (accessToken) => {
  let jwt;
  try {
    jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
  } catch (err) {
    return {err};
  }

  jwt.claims.userId = jwt.claims.uid;
  jwt.claims.email = jwt.claims.sub;

  return {claims: jwt.claims};
};

module.exports = validateToken;
