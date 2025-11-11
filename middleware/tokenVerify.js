

const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Authorization header not provided or invalid' });
  }

  const token = bearer.split(' ')[1];

  if (!token || token === 'null') {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_AUTH_SCRET);
    req.user = decodedToken;
    next(); 
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = tokenVerify;
