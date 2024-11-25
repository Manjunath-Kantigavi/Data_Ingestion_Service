// middlewares/authenticateToken.js

import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Assumes 'Bearer <token>' format

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach user info from token to request (e.g., user_id)
    next();
  });
};

export default authenticateToken;
