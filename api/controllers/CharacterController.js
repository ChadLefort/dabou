/**
 * CharacterController
 *
 * @description :: Server-side logic for managing characters
 */

//var _ = require('lodash');

module.exports = {
	
  /**
   * Returns the all of the wow character's associated with a user's 
   * battle.net account
   *
   * @param {Object} req
   * @param {Object} res
   */
  //@TODO: Clean this up!
  account: function (req, res) {
    var user = req.user;
    var characters = [];

    Passport.findOne({
      user: user.id,
      provider: 'bnet'
    }).then(function (passport) {
      if (!passport) {
        res.send(404, { error: 'Error.Bnet.Passport.NotFound' });
      } else {
        var token = passport.tokens.accessToken;
        sails.wowAccount({
          origin: 'us',
          access_token: token
        }).then(function (data) {
          map(data);
        }).catch(function (error) {
          res.send(500);
          console.log(error);
        });
      }
    }).catch(function (error) {
      res.send(500);
      console.log(error);
    });


    function map (data) {
      sails.wowClasses({ origin: 'us' }).then(function (classes) {
        sails.Promise.map(data.characters, function (character) {
          return _.merge(character, { class: _.findWhere(classes.classes, { id: character.class }).name });
        }).each(function (character) {
          var obj = {
            name: character.name,
            class: character.class,
            level: character.level,
            guild: character.guild,
            realm: character.realm,
            race: character.race,
            gender: character.gender,
            thumbnail: character.thumbnail
          };

          if (character.class == 'Death Knight') {
            obj.color = '#C41F3B';
          } else if (character.class == 'Druid') {
            obj.color = '#FF7D0A';
          } else if (character.class == 'Hunter') {
            obj.color = '#ABD473';
          } else if (character.class == 'Mage') {
            obj.color = '#69CCF0';
          } else if (character.class == 'Monk') {
            obj.color = '#00FF96';
          } else if (character.class == 'Paladin') {
            obj.color = '#F58CBA';
          } else if (character.class == 'Priest') {
            obj.color = '#FFFFFF';
          } else if (character.class == 'Rogue') {
            obj.color = '#FFF569';
          } else if (character.class == 'Shaman') {
            obj.color = '#0070DE';
          } else if (character.class == 'Warlock') {
            obj.color = '#9482C9';
          } else if (character.class == 'Warrior') {
            obj.color = '#C79C6E';
          }

          characters.push(obj);
        }).then(function () {
          res.send(200, { characters: characters });
        });
      });
    }
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
        res.send(200, { success: 'Success.User.Character.Created', character: character });
      }).catch(function (error) {
        res.send(400, { error: 'Error.User.Character' });
      });
    }).catch(function (error) {
      res.send(409, { error: 'Error.User.Character' });
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
      res.send(200, { success: 'Success.User.Character.Update', character: character });
    }).catch(function (error) {
      res.send(409, { error: 'Error.User.Character.Update' });
    });
  }

};

