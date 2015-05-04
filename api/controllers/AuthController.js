/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */

var AuthController = {
  
  /**
   * Checks to see if the current user is authenticated
   *
   * @param {Object} req
   * @param {Object} res
   */
  authenticated: function (req, res) {
    if (!req.user) {
      res.send(401, {status: false});
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

    Passport.find({
      user: user.id
    }, function (err, passport) {
      if (err) {
        res.send(404, {error: 'Error.Passport.NotFound'});
      } else {
        res.send(200, {passport: passport});
      }
    });
  },

  /**
   * Log out a user and return them to the homepage
   *
   * Passport exposes a logout() function on req (also aliased as logOut()) that
   * can be called from any route handler which needs to terminate a login
   * session. Invoking logout() will remove the req.user property and clear the
   * login session (if any).
   *
   * For more information on logging out users in Passport.js, check out:
   * http://passportjs.org/guide/logout/
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
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
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
        res.send(400, {error: 'Error.Passport.Generic'});
      } else if (flashError && !provider) {
        res.send(400, {error: flashError});
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

module.exports = AuthController;
