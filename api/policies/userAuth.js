module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.user.id == req.param('id')) {
    return next();
  }

  return res.forbidden();
};