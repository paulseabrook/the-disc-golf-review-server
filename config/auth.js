// Require the needed npm packages
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret used to encrypt and decrypt token
// if we don't have something local in process.env, use some string value
const secret =
  process.env.JWT_SECRET || 'some string value only your app knows';

// the Strategy is exactly "how" we will extract the token
const { Strategy, ExtractJwt } = require('passport-jwt');

// Minimum required options for passport-jwt
const opts = {
  // using the Bearer scheme for extraction
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Any secret string to use that is unique to your app
  secretOrKey: secret,
};

// Require the user model
const User = require('../models/user');

// new Strategy from passport constructor, pass in our options, and pass in the call back function with the payload and done method as params
const strategy = new Strategy(opts, function (jwt_payload, done) {
  // find the user by the id in the payload
  User.findById(jwt_payload.id)
    // done method to pass on our user to the routes
    .then((user) => done(null, user))
    // If there was an error, we pass it to done so it is eventually handled
    // by our error handlers in Express
    .catch((err) => done(err));
});

// must register strategy
passport.use(strategy);

// we MUST initialize or all of this code will not work
passport.initialize();

// this is what we will use for the User to have access to different routes and actions
const requireToken = passport.authenticate('jwt', { session: false });

// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user
const createUserToken = (req, user) => {
  // if no user or if no passord or if the password given doesn't match our database password, throw a 422 error (Unprocessible Entity)
  console.log(req.body);
  if (
    !user ||
    !req.body.credentials.password ||
    !bcrypt.compareSync(req.body.credentials.password, user.password)
  ) {
    const err = new Error('The provided username or password is incorrect');
    err.statusCode = 422;
    throw err;
  }
  // if no error, create the token and return it
  return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

module.exports = {
  requireToken,
  createUserToken,
};
