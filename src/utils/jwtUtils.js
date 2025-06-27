const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email , role: user.role}, 
    process.env.API_SECRET, 
    { expiresIn: '24h' }
  );
};
