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
    account: function(req, res) {
        var user = req.user;
        var characters = [];

        Passport.findOne({
            user: user.id,
            provider: 'bnet'
        }).then(function(passport) {
            if (!passport) {
                res.send(404, {
                    msg: 'Error.Bnet.Passport.NotFound'
                });
            } else {
                var token = passport.tokens.accessToken;
                sails.wowAccount({
                    origin: 'us',
                    access_token: token
                }).then(function(data) {
                    map(data);
                }).catch(function() {
                    res.send(500, {
                        msg: 'Error.Bnet.Account'
                    });
                });
            }
        }).catch(function() {
            res.send(500, {
                msg: 'Error.Bnet.Passport'
            });
        });


        function map(data) {
            sails.wowClasses({
                origin: 'us'
            }).then(function(classes) {
                sails.Promise.map(data.characters, function(character) {
                    return _.merge(character, {
                        class: _.findWhere(classes.classes, {
                            id: character.class
                        }).name
                    });
                }).each(function(character) {
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
                    characters.push(obj);
                }).then(function() {
                    res.send(200, {
                        characters: characters
                    });
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
    create: function(req, res) {
        var user = req.user,
            name = req.param('name'),
            realm = req.param('realm'),
            region = req.param('region'),
            race = req.param('race'),
            gender = req.param('gender'),
            thumbnail = req.param('thumbnail');

        Character.create({
            name: name,
            realm: realm,
            region: region,
            race: race,
            gender: gender,
            thumbnail: thumbnail,
            user: user.id
        }).then(function(character) {
            User.update(user.id, {
                character: character.id
            }).then(function(user) {
                User.publishUpdate(user[0].id, {
                    user: user[0]
                });
                res.send(200, {
                    msg: 'Success.User.Character.Created',
                    character: character
                });
            }).catch(function() {
                res.send(500, {
                    msg: 'Error.User.Character'
                });
            });
        }).catch(function() {
            res.send(500, {
                msg: 'Error.User.Character'
            });
        });
    },

    /**
     * Updates a user's preferred character
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function(req, res) {
        var user = req.user,
            name = req.param('name'),
            realm = req.param('realm'),
            region = req.param('region'),
            race = req.param('race'),
            gender = req.param('gender'),
            thumbnail = req.param('thumbnail');

        Character.update(user.id, {
            name: name,
            realm: realm,
            region: region,
            race: race,
            gender: gender,
            thumbnail: thumbnail
        }).then(function(character) {
            res.send(200, {
                msg: 'Success.User.Character.Update',
                character: character
            });
        }).catch(function() {
            res.send(500, {
                msg: 'Error.User.Character.Update'
            });
        });
    }
};
