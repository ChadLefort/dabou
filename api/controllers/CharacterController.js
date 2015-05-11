/**
 * CharacterController
 *
 * @description :: Server-side logic for managing characters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
	
  /**
   * Returns the all of the wow character's associated with a user's battle.net account
   *
   * @param {Object} req
   * @param {Object} res
   */
  account: function (req, res) {
    var user = req.user;

    Passport.findOne({
      user: user.id,
      provider: 'bnet'
    }, function (err, passport) {
      if (err) {
        res.send(500);
      } else if (!passport) {
        res.send(404, {error: 'Error.Bnet.Passport.NotFound'});
      } else {
        var token = passport.tokens.accessToken;
        
        sails.bnet.account.wow({
          origin: 'us', 
          access_token: token
        }, function (err, account) {
          if (err) {
            res.send(500);
            console.log(err);
          } else {
            res.send(200, account);
          }
        }); 
      }
    });
  },
  
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
    }, function (err, character) {
      if (err) {
        res.send(409, {error: 'Error.User.Character'});
      } else {
        User.update(user.id, {
          character: character.id
        }, function (err, user) {
          if (err) {
            res.send(400, {error: 'Error.User.Character'})
          } else {
            res.send(200, {success: 'Success.User.Character.Created', character: character});
          }
        });
      }         
    });
  },
  
  item: function (req, res) {
    sails.bnet.wow.item.item({
      origin: 'us', 
      id: 18810
    }, function (err, item) {
        res.send(200, {item: item});
    });
  },
  
  update: function (req, res) {
    var user = req.user,
        name = req.param('name'),
        realm = req.param('realm'),
        region = req.param('region');
    
    Character.update(user.id, {
      name: name,
      realm: realm,
      region: region
    }, function (err, character) {
      if (err) {
        res.send(409, {error: 'Error.User.Character.Update'});
      } else {
        res.send(200, {success: 'Success.User.Character.Update', character: character});
      }         
    });
  },
};

