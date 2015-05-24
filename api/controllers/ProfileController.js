/**
 * ProfileController
 *
 * @description :: Server-side logic for managing user's profiles
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
    }).then(function (profile) {
      User.update(user.id, {
          profile: profile.id
        }).then(function (user) {
           res.send(200, {success: 'Success.User.Profile.Created', profile: profile});
        }).catch(function (error) {
          res.send(400, {error: 'Error.User.Profile'});
        });
    }).catch(function (error) {
      res.send(409, {error: 'Error.User.Profile'});
    });
  },
  
  
  /**
   * Updates a user's profile
   *
   * @param {Object} req
   * @param {Object} res
   */
  update: function (req, res) {
    var user = req.user,
        id = req.param('id'),
        name = req.param('name'),
        gender = req.param('gender'),
        location = req.param('location'),
        bio = req.param('bio');
        
    Profile.update(id, {
      name: name,
      gender: gender,
      location: location,
      bio: bio
    }).then(function (profile) {
      res.send(200, {success: 'Success.User.Profile.Updated', profile: profile[0]});
    }).catch(function (error) {
      res.send(500, {error: 'Error.User.Profile.Updated'});
    });
  }
  
};
