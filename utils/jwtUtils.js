const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = process.env.RSA_PRIVATE_KEY;

/**
 The user object is needed to set the JWT `sub` payload property equal to user._id
 */
function issueJWT(user) {
  const _id = user._id;

  const expiresIn = process.env.EXPIRES_IN;

  const payload = {
    sub: _id
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT;