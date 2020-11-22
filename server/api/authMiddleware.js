const validateToken = require('./lib/validateToken');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);

  const accessToken = authHeader.split(' ')[1];

  const response = await validateToken(accessToken);

  if (response.err) {
    console.log(response.err);
    return res.sendStatus(403);
  }

  res.locals.claims = response.claims;

  return next();
};

module.exports = authenticateUser;
