import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

export const generateToken = (user) => {
  const { _id } = user; 
  const tokenPayload = {
    userId: _id,
  };

  const token = jwt.sign(tokenPayload, config.auth.SECRET_KEY_JWT, {
    expiresIn: '20m',
  });

  return token;
};


