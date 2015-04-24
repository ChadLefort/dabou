/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
    var user = req.user;

    Passport.count({
      user: user.id
    }, function (err, count) {
      if (count == 1) {
        res.send({error: 'You cannnot unlink this account without linking another or deleting your account.'});
      } else {
        passport.disconnect(req, res);
        res.send({status: true});
      }
    });
  }
};
