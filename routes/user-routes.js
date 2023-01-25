const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/user');
const { createUserToken } = require('../config/auth');

router.post('/sign-up', (req, res, next) => {
  bcrypt
    .hash(req.body.credentials.password, 10)
    // return a new object with the email and hashed password
    .then((hash) =>
      // when returning an object with fat arrow syntax, we
      // need to wrap the object in parentheses so JS doesn't
      // read the object curly braces as the function block
      ({
        email: req.body.credentials.email,
        password: hash,
      })
    )
    // create user with provided email and hashed password
    .then((user) => User.create(user))
    // send the new user object back with status 201, but `hashedPassword`
    // won't be sent because of the `transform` in the User model
    .then((user) => res.status(201).json(user))
    // pass any errors along to the error handler
    .catch(next);
});

// SIGN IN
// POST /sign-in
router.post('/sign-in', (req, res, next) => {
  User.findOne({ email: req.body.credentials.email })
    // Pass the user and the request to createUserToken
    .then((user) => createUserToken(req, user))
    // createUserToken will either throw an error that
    // will be caught by our error handler or send back
    // a token that we'll in turn send to the client.
    .then((token) => res.json({ token }))
    .catch(next);
});

module.exports = router;
