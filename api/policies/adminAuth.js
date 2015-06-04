/**
 * adminAuth
 *
 * @module      :: Policy
 * @description :: Checks to see the the user is an admin for certain rotues
 *                 that require admin only level access
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function (req, res, next) {

  if (req.user.admin == true) {
    return next();
  } else {
    return res.forbidden();
  }

};
