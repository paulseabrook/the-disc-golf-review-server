// require Express
const express = require('express')
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Disc = require('../models/disc')
const { requireToken } = require('../config/auth')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /discs
router.get(
  'https://pauls-plastics-server.onrender.com/discs',
  requireToken,
  (req, res, next) => {
    Disc.find()
      .then((discs) => {
        return discs.map((disc) => disc)
      })
      .then((discs) => res.status(200).json({ discs: discs }))
      .catch(next)
  }
)

// SHOW
// GET /discs/5a7db6c74d55bc51bdf39793
router.get(
  'https://pauls-plastics-server.onrender.com/discs/:id',
  requireToken,
  (req, res, next) => {
    Disc.findById(req.params.id)
      .then(handle404)
      .then((disc) => res.status(200).json({ disc: disc }))
      .catch(next)
  }
)

// CREATE
// POST /discs
router.post(
  'https://pauls-plastics-server.onrender.com/discs',
  requireToken,
  (req, res, next) => {
    const disc = req.body.disc
    disc.user = req.user._id
    Disc.create(req.body.disc)
      .then((disc) => {
        res.status(201).json({ disc: disc })
      })
      .catch(next)
  }
)

// UPDATE
// PATCH /discs/5a7db6c74d55bc51bdf39793
router.patch(
  'https://pauls-plastics-server.onrender.com/discs/:id',
  requireToken,
  (req, res, next) => {
    Disc.findById(req.params.id)
      .then(handle404)
      .then((disc) => {
        // check if id's match to give user ability to update
        if (disc.user.equals(req.user._id)) {
          // if true, send status of 204 and update the disc
          res.sendStatus(204)
          return disc.updateOne(req.body.disc)
        } else {
          // else, send status of 401
          res.sendStatus(401)
        }
      })
      .catch(next)
  }
)

// DESTROY
// DELETE /discs/5a7db6c74d55bc51bdf39793
router.delete(
  'https://pauls-plastics-server.onrender.com/discs/:id',
  requireToken,
  (req, res, next) => {
    Disc.findById(req.params.id)
      .then(handle404)
      .then((disc) => {
        // check if id's match to give user ability to delete
        if (disc.user.equals(req.user._id)) {
          // if true delete the disc and send a status of 204
          disc.deleteOne()
          res.sendStatus(204)
        } else {
          // else, send a status of 401
          res.sendStatus(401)
        }
      })
      .catch(next)
  }
)

// exporting the router to use elsewhere
module.exports = router
