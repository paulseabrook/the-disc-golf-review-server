const express = require('express')
const router = express.Router()

// require disc model
const Disc = require('../models/disc')
// handle for 404 errors
const { handle404 } = require('../lib/custom-errors')
// token needed for signing in
const { requireToken } = require('../config/auth')

// CREATE
// POST /reviews/
router.post('/reviews', requireToken, (req, res, next) => {
  // from the body, the discID is the ObjectID of the disc we are reviewing
  const discId = req.body.review.discId

  // from the request body, grab the review
  const review = req.body.review
  // assign review.user to the ObjectID of the user who send the request
  review.user = req.user._id

  Disc.findById(discId)
    .then(handle404)
    .then((disc) => {
      disc.reviews.push(req.body.review)

      return disc.save()
    })

    .then((disc) => res.status(201).json({ disc: disc }))
    .catch(next)
})

module.exports = router
