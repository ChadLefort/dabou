/**
 * Authentication Controller
 *
 * @description :: Server-side logic for authentication
 */
module.exports = {
  
  /**
   * Checks to see if the current user is authenticated
   *
   * @param {Object} req
   * @param {Object} res
   */
  authenticated: function (req, res) {
    if (!req.user) {
      res.send({status: false});
    } else {
      res.send(200, {status: true, user: req.user});
    }
  },
  
  /**
   * Returns all of the passports of the current loggin in user
   *
   * @param {Object} req
   * @param {Object} res
   */
  passports: function (req, res) {
    var user = req.user;
    
    Passport.find({user: user.id}).then(function (passport) {
      if (!passport) {
        res.send(404, {error: 'Error.Passport.NotFound'});
      } else {
        res.send(200, {passport: passport.tokens});
      }
    }).catch(function (error) {
      res.send(500);
      console.log(error);
    });
  },

  /**
   * Log out a user and return them to the homepage
   *
   * @param {Object} req
   * @param {Object} res
   */
  logout: function (req, res) {
    req.logout();
    // mark the user as logged out for auth purposes
    req.session.authenticated = false;
    res.send(200);
  },

  /**
   * Create a third-party authentication endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  provider: function (req, res) {
    passport.endpoint(req, res);
  },

  /**
   * Create a authentication callback endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function (req, res) {
    function tryAgain(provider, err) {

      // Only certain error messages are returned via req.flash('error', someError)
      // because we shouldn't expose internal authorization errors to the user.
      // We do return a generic error and the original request body.
      var flashError = req.flash('error');

      if (err && !flashError && !provider) {
        res.send({error: 'Error.Passport.Generic'});
      } else if (flashError && !provider) {
        res.send({error: flashError});
      } else if (err && provider && !flashError) {
        res.view('layouts/layout', {error: 'Error.Passport.Generic', state: req.session.redirect});
      } else {
        res.view('layouts/layout', {error: flashError, state: req.session.redirect});
      }
    }

    passport.callback(req, res, function (err, user, challenges) {
      if (err || !user) {
        return tryAgain(req.param('provider'), challenges);
      }

      req.login(user, function (err) {
        if (err) {
          return tryAgain(err);
        }

        // Mark the session as authenticated to work with default Sails sessionAuth.js policy
        req.session.authenticated = true;

        // Upon successful login, send the user to the homepage were req.user
        // will be available.
        if(req.session.redirect == 'account'){
          var flashSuccess = req.flash('success');
          res.view('layouts/layout', {success: flashSuccess, state: 'account'});
        } else {
          res.redirect('/#/index');
        }
      });
    });
  }
  
};
