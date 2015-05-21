module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.user.admin == true) {
    return next();
  }
  console.log(req.user);
  return res.forbidden();
};