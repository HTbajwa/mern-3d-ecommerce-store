const jwt = require('jsonwebtoken');
const secretKey = "123456789";

const checkuser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    req.user = "not_login";
    return next();
  }

  const token = authorizationHeader.slice(7).replace(/"/g, '');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = checkuser;
