const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETE_KEY_JWT, { expiresIn: "1h" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRETE_KEY_JWT, {
    expiresIn: "7d",
  });
};

const authenticateJWT = (req, res, next) => {
  const bearer = req.header("Authorization");
  if (!bearer) {
    return res.status(401).json({ success: false, message: "Token tidak ditemukan." });
  }
  const token = bearer.split(" ")[1];

  jwt.verify(token, process.env.SECRETE_KEY_JWT, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token tidak valid.",
        error: err.message,
      });
    }

    req.user = user;
    next();
  });
};

module.exports = { generateAccessToken, generateRefreshToken, authenticateJWT };
