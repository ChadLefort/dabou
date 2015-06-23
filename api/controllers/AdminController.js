/**
 * AdminController
 *
 * @description :: Server-side logic for managing admin end points
 */
module.exports = {

    /**
     * Scrapes WoWDB tabard pages and grabs the rest of the tabard
     * information from the battle.net api and insert that data
     * into our database to create an tabard item cache
     *
     * @param {Object} req
     * @param {Object} res
     */
    tabards: function(req, res) {

        sails.fs.readFileAsync('console/tabardsIds.json', 'utf8').then(function(data) {
            var items = JSON.parse(data);
            return items;
        }).map(function(item, index) {
            sails.promiseThrottle.add(function() {
                return create(item.id);
            });
        }).then(function() {
            res.send(200, 'All tabards have been imported!');
        }).catch(function(error) {
            res.send(400, {
                msg: error
            });
        });

        function create(id) {
            return new sails.Promise(function(resolve, reject) {
                sails.getItem({
                    origin: 'us',
                    id: id
                }).then(function(item) {
                    if (item.inventoryType == 19) {
                        Tabard.create({
                            id: item.id,
                            name: item.name,
                            icon: item.icon,
                            quality: item.quality
                        }).then(function(item) {
                            resolve(item.id);
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            });
        }

    },

    /**
     * Populate all the races based upon the WoW API
     *
     * @param {Object} req
     * @param {Object} res
     */
    races: function(req, res) {
        sails.wowRaces({
            origin: 'us'
        }).then(function(data) {
            return _.uniq(data.races, 'id')
        }).each(function(race) {
            Race.create({
                id: race.id,
                name: race.name
            }).catch(function(error) {
                console.log(error);
            });
        }).then(function() {
            res.send(200, 'All races have been imported!');
        }).catch(function(error) {
            res.send(400, {
                msg: error
            });
        });
    },

    /**
     * Populate all the genders
     *
     * @param {Object} req
     * @param {Object} res
     */
    genders: function(req, res) {
        Gender.create({
            value: 0,
            name: 'Male'
        }).catch(function(error) {
            console.log(error);
        });

        Gender.create({
            value: 1,
            name: 'Female'
        }).catch(function(error) {
            console.log(error);
        });

        res.send(200, 'All genders have been imported!');
    },


    /**
     * Creates all the folders for the tabard models
     *
     * @param {Object} req
     * @param {Object} res
     */
    folders: function(req, res) {
        Tabard.find().then(function(tabards) {
            return tabards;
        }).each(function(tabard) {
            Race.find().then(function(races) {
                return races;
            }).each(function(race) {
                Gender.find().then(function(genders) {
                    return genders;
                }).each(function(gender) {
                    sails.mkdirp('F:/webdev/git/dabou/assets/tabards/' + tabard.id + '/' + race.id + '/' + gender.value, function(error) {
                        if (error) {
                            console.log(error);
                        }
                    });
                });
            });
        });

        res.send(200, 'Folder structure created!')
    }

};
