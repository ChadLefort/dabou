/**
 * ProfileController
 *
 * @description :: Server-side logic for managing user's profiles
 */
module.exports = {

    /**
     * Create a profile for a user if they don't already have one
     *
     * @param {Object} req
     * @param {Object} res
     */
    create: function(req, res) {
        var user = req.user,
            name = req.param('name'),
            gender = req.param('gender'),
            location = req.param('location'),
            bio = req.param('bio');

        Profile.create({
            name: name,
            gender: gender,
            location: location,
            bio: bio,
            user: user.id
        }).then(function(profile) {
            User.update(user.id, {
                profile: profile.id
            }).then(function(user) {
                User.publishUpdate(user[0].id, {
                    user: user[0]
                });
                res.send(200, {
                    msg: 'Success.User.Profile.Created',
                    profile: profile
                });
            }).catch(function() {
                res.send(500, {
                    msg: 'Error.User.Profile'
                });
            });
        }).catch(function() {
            res.send(500, {
                msg: 'Error.User.Profile'
            });
        });
    },

    /**
     * Updates a user's profile
     *
     * @param {Object} req
     * @param {Object} res
     */
    update: function(req, res) {
        var user = req.user,
            id = req.param('id'),
            name = req.param('name'),
            gender = req.param('gender'),
            location = req.param('location'),
            bio = req.param('bio');

        Profile.update(id, {
            name: name,
            gender: gender,
            location: location,
            bio: bio
        }).then(function(profile) {
            res.send(200, {
                msg: 'Success.User.Profile.Updated',
                profile: profile[0]
            });
        }).catch(function() {
            res.send(500, {
                msg: 'Error.User.Profile.Updated'
            });
        });
    },

    /**
     * Find a user's profile by username
     *
     * @param {Object} req
     * @param {Object} res
     */
    username: function(req, res) {
        var username = req.param('username');

        User.findOne({
                username: username
            })
            .then(function(user) {
                Profile.findOne(user.profile)
                    .then(function(profile) {
                        res.send(200, {
                            profile: profile,
                            user: user
                        });
                    }).catch(function() {
                        res.send(500);
                    });
            }).catch(function() {
                res.send(404);
            });
    }
};
