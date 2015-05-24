/**
 * userOwnership
 *
 * @module      :: Policy
 * @description :: Based on the controller, checks to see if the model's user 
 *                 is the same user that is currently logged in
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {
  
  var model = req.options.controller,
      user = req.user,
      id = req.param('id');
  
  sails.models[model].findOne({id: id}).then(function (data) {
      if (user.id == data.user) {
        return next();
      } else {
        return res.forbidden();
      }
  }).catch(function (error) {
    console.log(error);
  });  
  
};