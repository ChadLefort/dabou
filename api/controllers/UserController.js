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
      username = req.param('username'),
      regex = /^[a-zA-Z0-9.\-_]{3,16}$/;

    if (!regex.test(username)) {
      res.send(403, {msg: 'Error.Username.Validation'});
    } else {
      User.update(user.id, {
        username: username,
        setUsername: true
      }).then(function () {
        res.send(200, {msg: 'Success.Username.Update'});
      }).catch(function (error) {
        if (error.code === 'E_VALIDATION') {
          if (error.invalidAttributes.username) {
            res.send(409, {msg: 'Error.Username.Exists'});
          }
        } else {
          res.send(500, {msg: 'Error.Username.Update'});
        }
      });
    }
  }

};

