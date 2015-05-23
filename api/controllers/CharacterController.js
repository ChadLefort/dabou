/**
 * CharacterController
 *
 * @description :: Server-side logic for managing characters
 */
module.exports = {
	
  /**
   * Returns the all of the wow character's associated with a user's 
   * battle.net account
   *
   * @param {Object} req
   * @param {Object} res
   */
  account: function (req, res) {
    var user = req.user;
    
    Passport.findOne({
      user: user.id,
      provider: 'bnet'
    }).then(function (passport) {
      if (!passport) {
        res.send(404, {error: 'Error.Bnet.Passport.NotFound'});
      } else {
        var token = passport.tokens.accessToken;
        
        sails.wowAccount({
          origin: 'us', 
          access_token: token
        }).then(function (account) {
          res.send(200, account);
        }).catch(function (error) {
          res.send(500);
          console.log(error);
        }); 
      }
    }).catch(function (error) {
      res.send(500);
      console.log(error);
    });
  },
  
  /**
   * Creates a preferred character if none has been already created
   *
   * @param {Object} req
   * @param {Object} res
   */
  create: function (req, res) {
    var user = req.user,
        name = req.param('name'),
        realm = req.param('realm'),
        region = req.param('region');
        
    Character.create({
      name: name,
      realm: realm,
      region: region,
      user: user.id
    }).then(function (character) {
      User.update(user.id, {
          character: character.id
        }).then(function (user) {
          res.send(200, {success: 'Success.User.Character.Created', character: character});
        }).catch(function (error) {
          res.send(400, {error: 'Error.User.Character'});
        });
    }).catch(function (error) {
        res.send(409, {error: 'Error.User.Character'});
    });
  },
  
  /**
   * Updates a user's preferred character
   *
   * @param {Object} req
   * @param {Object} res
   */
  update: function (req, res) {
    var user = req.user,
        name = req.param('name'),
        realm = req.param('realm'),
        region = req.param('region');
        
    Character.update(user.id, {
      name: name,
      realm: realm,
      region: region
    }).then(function (character) {
      res.send(200, {success: 'Success.User.Character.Update', character: character});
    }).catch(function (error) {
      res.send(409, {error: 'Error.User.Character.Update'});
    });
  }
  
};

