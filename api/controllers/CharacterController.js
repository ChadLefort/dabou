/**
 * CharacterController
 *
 * @description :: Server-side logic for managing characters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  /**
   * Returns the access token of a battle.net user
   *
   * @param {Object} req
   * @param {Object} res
   */
  token: function (req, res) {
    var user = req.user;

    Passport.findOne({
      user: user.id,
      provider: 'bnet'
    }, function (err, passport) {
      if (err) {
        res.send(500);
      } else if (!passport) {
        res.send(404, {error: 'Error.Bnet.Passport.NotFound'});
      } else {
        res.send(200, {token: passport.tokens.accessToken});
      }
    });
  },
	
};

