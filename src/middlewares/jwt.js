const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.SECRETKEY_REFRESHTOKEN, {
    expiresIn: '7d',
  });
};

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token tidak ditemukan.' });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token tidak valid.',
        error: err.message,
      });
    }

    req.user = user;
    next();
  });
};

module.exports = { generateAccessToken, generateRefreshToken, authenticateJWT };
