/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 */
module.exports = {

  /**
   * Updates a user's username
   *
   * @param {Object} req
   * @param {Object} res
   */
  update: function (req, res) {
    var user = req.user,
      username = req.param('username');

    User.update(user.id, {
      username: username,
      setUsername: true
    }).then(function () {
      res.send(200, {success: 'Success.Username.Update'});
    }).catch(function (error) {
      if (error.code === 'E_VALIDATION') {
        if (error.invalidAttributes.username) {
          res.send(409, {error: 'Error.Username.Exists'});
        }
      } else {
        res.send(400, {error: 'Error.Username.Update'});
      }
    });
  }

};

