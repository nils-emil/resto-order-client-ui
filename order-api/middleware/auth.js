const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.headers["Authorization"] || req.headers["authorization"];
  if (!token) return res.status(401).send({ error: 'Access denied. No token provided.' })
  try {
    // TODO extract myPrivateKey
    const decoded = jwt.verify(token, "myPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send({ error: 'Invalid token.' })
  }
};

