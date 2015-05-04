/**
 * ProfileController
 *
 * @description :: Server-side logic for managing user's profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 module.exports = {
   
  /**
   * Gets all of the profiles for every user
   *
   * @param {Object} req
   * @param {Object} res
   */
  profile: function (req, res) {        
    Profile.find(function (err, profiles) {
      if (err) {
        res.send(400, {error: 'Error.User.Profile'});
      } else {
        res.send({profiles: profiles});
      }
    });
  },
  
  /**
   * Gets a specific profile based on a user's id
   *
   * @param {Object} req
   * @param {Object} res
   */
  getProfile: function (req, res) {
    var user = req.param('user');
        
    Profile.findOne({
      user: user
    }, function (err, profile) {                         
      if (err) {
        res.send(400, {error: 'Error.User.Profile'});
      } else {
        res.send(200, {profile: profile});
      }
    });
  },
  
  /**
   * Create a profile for a user if they don't already have one
   *
   * @param {Object} req
   * @param {Object} res
   */
  createProfile: function (req, res) {
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
        res.send(200, {success: 'Success.User.Profile.Created', profile: profile});
      }         
    });
  }
  
};
