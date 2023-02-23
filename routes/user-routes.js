const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/user')
// this will be used when we sign in
const { createUserToken } = require('../config/auth')

// SIGN UP
// POST /sign-up
router.post(
  'https://pauls-plastics-server.onrender.com/sign-up',
  (req, res, next) => {
    bcrypt
      .hash(req.body.credentials.password, 10)
      .then((hash) => ({
        email: req.body.credentials.email,
        password: hash,
      }))
      .then((user) => User.create(user))
      .then((user) => res.status(201).json(user))
      .catch(next)
  }
)

// SIGN IN
// POST /sign-in
router.post(
  'https://pauls-plastics-server.onrender.com/sign-in',
  (req, res, next) => {
    User.findOne({ email: req.body.credentials.email })
      // upon signing in, we want to create a token for the user each time
      // this token gives them access
      .then((user) => createUserToken(req, user))
      .then((token) => res.json({ token }))
      .catch(next)
  }
)

module.exports = router
