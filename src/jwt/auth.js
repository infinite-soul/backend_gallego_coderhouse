import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

export const generateToken = (user) => {
  const { _id } = user; // Si _id es la única propiedad que necesitas del usuario

  const tokenPayload = {
    userId: _id,
  };

  const token = jwt.sign(tokenPayload, config.SECRET_KEY_JWT, {
    expiresIn: '20m',
  });

  // console.log('auth token: ' + token);
  return token;
};


