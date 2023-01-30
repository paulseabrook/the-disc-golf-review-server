// require Express
const express = require('express');
const { handle404 } = require('../lib/custom-errors');

// require the Model we just created
const Disc = require('../models/disc');
const { requireToken } = require('../config/auth');

// Creating a router for us to make paths on
const router = express.Router();

// INDEX
// GET /discs
router.get('/discs', requireToken, (req, res, next) => {
  Disc.find()
    .then((discs) => {
      return discs.map((disc) => disc);
    })
    .then((discs) => res.status(200).json({ discs: discs }))
    .catch(next);
});

// SHOW
// GET /discs/5a7db6c74d55bc51bdf39793
router.get('/discs/:id', requireToken, (req, res, next) => {
  Disc.findById(req.params.id)
    .then(handle404)
    .then((disc) => res.status(200).json({ disc: disc }))
    .catch(next);
});

// CREATE
// POST /discs
router.post('/discs', requireToken, (req, res, next) => {
  Disc.userCreated = req.user._id;
  Disc.create(req.body.disc)
    .then((disc) => {
      res.status(201).json({ disc: disc });
    })
    .catch(next);
});

// UPDATE
// PATCH /discs/5a7db6c74d55bc51bdf39793
router.patch('/discs/:id', requireToken, (req, res, next) => {
  Disc.findById(req.params.id)
    .then(handle404)
    .then((disc) => {
      return disc.updateOne(req.body.disc);
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// DESTROY
// DELETE /discs/5a7db6c74d55bc51bdf39793
router.delete('/discs/:id', requireToken, (req, res, next) => {
  Disc.findOneAndDelete(
    { _id: req.params.id, userRecommending: req.user._id },
    function (err) {
      res.redirect('/discs');
    }
  );
  // Disc.findById(req.params.id)
  //   .then(handle404)
  //   .then((disc) => {
  //     disc.deleteOne();
  //   })
  //   .then(() => res.sendStatus(204))
  //   .catch(next);
});

// exporting the router to use elsewhere
module.exports = router;
