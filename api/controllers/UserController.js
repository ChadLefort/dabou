/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 */

 var Gravatar = require('machinepack-gravatar');

module.exports = {

  /**
   * Updates a user's username and email. Also gets gravatar
   * based on user's email
   *
   * @param {Object} req
   * @param {Object} res
   */
  update: function (req, res) {
    var user = req.user,
      username = req.param('username'),
      email = req.param('email'),
      regex = /^[a-zA-Z0-9.\-_]{3,16}$/;

    User.findOne({id: user.id}).then(function (user) {
      if (_.isEmpty(email)) {
        email = user.email;
      }

      getGravatar(email).then(function (gravatarUrl) {
        if (!regex.test(username)) {
          res.send(403, {msg: 'Error.Username.Validation'});
        } else {
          updateUser(username, email, gravatarUrl);
        }
      });
    }).catch(function (error) {
      res.send(500);
    });

  /**
   * Get a user's gravatar
   *
   * @param {String} A user's email
   */
    function getGravatar(email) {
      return new sails.Promise(function (resolve, reject) {
        Gravatar.getImageUrl({
          emailAddress: email,
          gravatarSize: 2048,
          defaultImage: 'http://chadlefort.com/content/images/default_avatar.png',
          rating: 'g',
          useHttps: true
        }).exec({
          error: function (error) {
            reject(error);
          },
          success: function (gravatarUrl) {
            resolve(gravatarUrl);
          }
        });
      });
    }

  /**
   * Updates the user model
   *
   * @param {String} The user's new username
   * @param {String} The user's new email
   * @param {String} The user's new gravatar
   */
    function updateUser(username, email, gravatarUrl) {
      User.update(user.id, {
        username: username,
        email: email,
        gravatar: gravatarUrl,
        setUsername: true
      }).then(function (user) {
        User.publishUpdate(user[0].id, {user: user[0]});
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

