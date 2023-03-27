const express = require('express')
const router = express.Router()

// require disc model
const Disc = require('../models/disc')
// require Review Mode;
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

  // find the disc by the id given
  Disc.findById(discId)
    // call the handle404 function which throws an error if no record is found
    .then(handle404)
    // then take the disc and push the review into the reviews sub doc
    .then((disc) => {
      disc.reviews.push(req.body.review)

      // make sure to save the disc
      return disc.save()
    })

    // if successful, give a 201 status
    .then((disc) => res.status(201).json({ disc: disc }))
    .catch(next)
})

// PATCH

router.patch('/reviews/:id', requireToken, (req, res, next) => {
  // from the body, the discID is the ObjectID of the disc we are reviewing
  const discId = req.body.review.discId
  Disc.findById(discId)
    .then((disc) => {
      // if the user updating the review created the review...
      if (disc.user.equals(req.user._id)) {
        // look through the reviews and find the review matching the request
        const review = disc.reviews.id(req.params.id)
        // update the comment, rating
        review.comment = req.body.review.comment
        review.rating = req.body.review.rating
        return disc.save() // saves document with subdocuments and triggers validation
      } else {
        res.sendStatus(401)
      }
    })
    .then((disc) => {
      res.send({ disc: disc })
    })
    .catch(next)
})

// DELETE

router.delete('/reviews/:id', requireToken, (req, res, next) => {
  // from the body, the discID is the ObjectID of the disc we are reviewing
  const discId = req.body.review.discId
  Disc.findById(discId)
    .then((disc) => {
      if (disc.user.equals(req.user._id)) {
        disc.reviews.pull(req.params.id)
        return disc.save()
      } else {
        res.sendStatus(401)
      }
    })
    .then((disc) => {
      res.send({ disc })
    })
    .catch(next)
})

module.exports = router

// TODO

// Ability to edit a comment and its rating

// Ability to delete a comment and its rating
