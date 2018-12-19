var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var TwinShips = require('../models/TwinShips.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL TwinShips */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
  TwinShips.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
} else {
  return res.status(403).send({success: false, msg: 'Adgang nægtet!'});
}
});

/* GET SINGLE TwinShips BY ID */
router.get('/:id', function(req, res, next) {
  TwinShips.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE TwinShips */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    TwinShips.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
} else {
    return res.status(403).send({success: false, msg: 'Adgang nægtet!'});
  }
});

/* UPDATE TwinShips */
router.put('/:id', function(req, res, next) {
  TwinShips.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE TwinShips */
router.delete('/:id', function(req, res, next) {
  TwinShips.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Extract JWT Token */
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;