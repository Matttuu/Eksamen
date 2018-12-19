var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

// Create router for signup or register the new user.

router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Indtast venglist brugernavn og kodeord!'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Brugernavn eksisterer allerede!'});
        }
        res.json({success: true, msg: 'Bruger er nu oprettet!'});
      });
    }
  });

  // Create router for login or sign-in.
  
  router.post('/login', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Fejl ved login, bruger ikke fundet!'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Fejl ved login, forkert kodeord!'});
          }
        });
      }
    });
  });

  module.exports = router;