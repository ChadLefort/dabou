var validator = require('validator');
var crypto = require('crypto');
var Gravatar = require('machinepack-gravatar');

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (req, res, next) {
  var email = req.param('email'),
    username = req.param('username'),
    password = req.param('password'),
    confirmPassword = req.param('confirmPassword');

  if (!email) {
    req.flash('error', 'Error.Passport.Email.Missing');
  }

  if (!username) {
    req.flash('error', 'Error.Passport.Username.Missing');
  }

  if (!password) {
    req.flash('error', 'Error.Passport.Password.Missing');
  }

  if (!confirmPassword) {
    req.flash('error', 'Error.Passport.ConfirmPassword.Missing');
  }

  if (!email || !username || !password || !confirmPassword) {
    return next(new Error('Missing requied fields.'));
  }

  Gravatar.getImageUrl({
    emailAddress: req.param('email'),
    defaultImage: 'http://chadlefort.com/content/images/default_avatar.png',
    rating: 'g',
    useHttps: true
  }).exec({
    error: function (err) {
      return next(err);
    },
    success: function (gravatarUrl) {

      User.create({
        username: username,
        email: email,
        gravatar: gravatarUrl,
        setUsername: true
      }, function (err, user) {
        if (err) {
          if (err.code === 'E_VALIDATION') {
            if (err.invalidAttributes.email) {
              req.flash('error', 'Error.Passport.Email.Exists');
            } else {
              req.flash('error', 'Error.Passport.User.Exists');
            }
          }

          return next(err);
        }

        // Generating accessToken for API authentication
        var token = crypto.randomBytes(48).toString('base64');

        Passport.create({
          protocol: 'local',
          password: password,
          user: user.id,
          accessToken: token
        }, function (err, passport) {
          if (err) {
            if (err.code === 'E_VALIDATION') {
              req.flash('error', 'Error.Passport.Password.Invalid');
            }

            return user.destroy(function (destroyErr) {
              next(destroyErr || err);
            });
          }

          return res.send({success: 'Success.Passport.User.Created', user: user});
        });
      });
    }
  });
};

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var user = req.user,
    password = req.param('password');

  Passport.findOne({
    protocol: 'local',
    user: user.id
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      Passport.create({
        protocol: 'local',
        password: password,
        user: user.id
      }, function (err, passport) {
        next(err, user);
      });
    } else {
      next(null, user);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, identifier, password, next) {
  var isEmail = validator.isEmail(identifier),
    query = {};

  if (isEmail) {
    query.email = identifier;
  } else {
    query.username = identifier;
  }

  User.findOne(query, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      if (isEmail) {
        req.flash('error', 'Error.Passport.Email.NotFound');
      } else {
        req.flash('error', 'Error.Passport.Username.NotFound');
      }
      return next(null, false);
    }

    Passport.findOne({
      protocol: 'local',
      user: user.id
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) {
            return next(err);
          }

          if (!res) {
            req.flash('error', 'Error.Passport.Password.Wrong');
            return next(null, false);
          } else {
            return next(null, user);
          }
        });
      } else {
        req.flash('error', 'Error.Passport.Password.NotSet');
        return next(null, false);
      }
    });
  });
};
