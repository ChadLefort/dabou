/**
 * LookupController
 *
 * @description :: Server-side logic for lookup tables
 */
module.exports = {

    /**
     * Display all of the look up tables
     *
     * @param {Object} req
     * @param {Object} res
     */
    lookup: function(req, res) {

        var races = lookupModel('race'),
            genders = lookupModel('gender'),
            reputations = lookupModel('reputation'),
            itemBinds = lookupModel('itembind'),
            qualities = lookupModel('quality');

        function lookupModel(model) {
            return sails.models[model].find()
                .then(function(data) {
                    return data;
                }).catch(function(error) {
                    console.log(error);
                });
        }

        sails.Promise.all([races, genders, reputations, itemBinds, qualities])
            .spread(function(races, genders, reputations, itemBinds, qualities) {
                var lookups = {
                    races: races,
                    genders: genders,
                    reputations: reputations,
                    itemBinds: itemBinds,
                    qualities: qualities
                };

                res.send(200, {
                    lookups: lookups
                });
            }).catch(function(error) {
                console.log(error);
            });
    }
};
