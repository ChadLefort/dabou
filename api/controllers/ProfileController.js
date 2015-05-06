/**
 * ProfileController
 *
 * @description :: Server-side logic for managing user's profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 module.exports = {

  /**
   * Create a profile for a user if they don't already have one
   *
   * @param {Object} req
   * @param {Object} res
   */
  create: function (req, res) {
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
        res.send(409, {error: 'Error.User.Profile'});
      } else {
        User.update(user.id, {
          profile: profile.id
        }, function (err, user) {
          if (err) {
            res.send(400, {error: 'Error.User.Profile'})
          } else {
            res.send(200, {success: 'Success.User.Profile.Created', profile: profile});
          }
        });
      }         
    });
  }
  
};
