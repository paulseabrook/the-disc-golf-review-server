const express = require('express');
const router = express.Router();

// require disc model
const Disc = require('../models/disc');
const { handle404 } = require('../lib/custom-errors');
const { requireToken } = require('../config/auth');



// CREATE
// POST /reviews/
router.post('/reviews', requireToken, (req, res, next) => {

  const review = req.body.review;
  review.user = req.user._id;

  Disc.findById(discId)
    .then(handle404)
    .then((disc) => {
      disc.reviews.push(req.body.review);

      return disc.save();
    })

    .then((disc) => res.status(201).json({ disc: disc }))
    .catch(next);
});

module.exports = router;
