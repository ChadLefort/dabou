/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var cases = require('../services/cases');

module.exports = {
  account: function (req, res) {
    var user = req.user;

    Passport.find({
      user: user.id
    }, function (err, passport) {
      if (err) {
        return next(err);
      }
      res.send({passport: passport})
    });
  },

  unlink: function (req, res) {
    var user = req.user,
      provider = req.param('provider');

    Passport.count({
      user: user.id
    }, function (err, count) {
      if (count == 1) {
        res.send({error: 'Error.Passport.Unlink'});
      } else {
        passport.disconnect(req, res);
        res.send({status: true, success: 'Success.Passport.' + cases.toProperCase(provider) + '.Unlink'});
      }
    });
  },
  
  profile: function (req, res) {
    var user = req.user,
        name = req.param('name'),
        gender = req.param('gender'),
        location = req.param('location'),
        bio = req.param('bio');
        
        Profile.create({
          name: name,
          gender: gender,
          location: location,
          bio: bio,
          user: user.id
        }, function (err, profile) {
          if (err) {
            req.flash('error', 'Error.User.Profile');
          }
          
          res.send({success: 'Success.User.Profile.Created', profile: profile})
        })
  }
}
;
