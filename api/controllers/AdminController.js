/**
 * AdminController
 *
 * @description :: Server-side logic for managing admin end points
 */

var cases = require('../services/cases');

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
                        var description = null,
                            spellId = null,
                            questId = null,
                            achievementId = null,
                            vendorId = null;

                        if (!_.isEmpty(item.description)) {
                            description = item.description;
                        }

                        // If the tabard has a spell associated to it
                        if (!_.isEmpty(item.itemSpells)) {
                            _.each(item.itemSpells, function(value, key) {
                                if (!_.isEmpty(value.spell.description)) {
                                    spellId = value.spell.id;

                                    Spell.create({
                                        id: value.spell.id,
                                        name: value.spell.name,
                                        icon: value.spell.icon,
                                        description: value.spell.description,
                                        castTime: value.spell.castTime,
                                        tabard: item.id
                                    }).catch(function(error) {
                                        console.log(error);
                                    });
                                };
                            });
                        }

                        // If the tabard has a quest associated to it
                        if (item.itemSource.sourceType == 'REWARD_FOR_QUEST') {
                            questId = item.itemSource.sourceId;
                            sails.wowQuest({
                                origin: 'us',
                                id: questId
                            }).then(function(quest) {
                                Quest.create({
                                    id: quest.id,
                                    title: quest.title,
                                    reqLevel: quest.reqLevel,
                                    category: quest.category,
                                    level: quest.level,
                                    tabard: item.id
                                }).catch(function(error) {
                                    console.log(error);
                                });
                            });
                        }

                        // If the tabard has a achievement associated to it
                        if (item.itemSource.sourceType == 'ACHIEVEMENT_REWARD') {
                            achievementId = item.itemSource.sourceId;
                            sails.wowAchievement({
                                origin: 'us',
                                id: achievementId
                            }).then(function(achievement) {
                                Achievement.create({
                                    id: achievement.id,
                                    title: achievement.title,
                                    points: achievement.points,
                                    description: achievement.description,
                                    accountWide: achievement.accountWide,
                                    tabard: item.id
                                }).catch(function(error) {
                                    console.log(error);
                                });
                            });
                        }

                        // If the tabard has a vendor associated to it
                        if (item.itemSource.sourceType == 'VENDOR') {
                            vendorId = item.itemSource.sourceId;
                        }

                        Tabard.create({
                            id: item.id,
                            name: item.name,
                            description: description,
                            icon: item.icon,
                            itemBind: item.itemBind,
                            quality: item.quality,
                            buyPrice: item.buyPrice,
                            sellPrice: item.sellPrice,
                            itemLevel: item.itemLevel,
                            spell: spellId,
                            minReputation: item.minReputation,
                            sourceType: cases.toTitleCase(item.itemSource.sourceType.replace(/_/g, ' ')),
                            quest: questId,
                            achievement: achievementId,
                            vendor: vendorId
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
     * Populate all the look up tables
     *
     * @param {Object} req
     * @param {Object} res
     */
    lookup: function(req, res) {

        // For races based on the WoW API
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
        }).catch(function(error) {
            res.send(400, {
                msg: error
            });
        });

        // For genders
        var genders = [{
            value: 0,
            name: 'Male'
        }, {
            value: 1,
            name: 'Female'
        }];

        _.each(genders, function(gender, key) {
            Gender.create({
                value: gender.value,
                name: gender.name
            }).catch(function(error) {
                console.log(error);
            });
        });

        // For reputations
        var reputations = [{
            id: 1,
            name: 'Hated'
        }, {
            id: 2,
            name: 'Unfriendly'
        }, {
            id: 3,
            name: 'Neutral'
        }, {
            id: 4,
            name: 'Friendly'
        }, {
            id: 5,
            name: 'Honored'
        }, {
            id: 6,
            name: 'Revered'
        }, {
            id: 7,
            name: 'Exalted'
        }];

        _.each(reputations, function(reputation, key) {
            Reputation.create({
                id: reputation.id,
                name: reputation.name
            }).catch(function(error) {
                console.log(error);
            });
        });

        // For item binding propteries
        var itemBinds = [{
            id: 1,
            name: 'Binds when picked up'
        }, {
            id: 2,
            name: 'Binds when equipped'
        }, {
            id: 3,
            name: 'Binds on use'
        }, {
            id: 4,
            name: 'Quest Item'
        }];

        _.each(itemBinds, function(itemBind, key) {
            ItemBind.create({
                id: itemBind.id,
                name: itemBind.name
            }).catch(function(error) {
                console.log(error);
            });
        });

        // For quality
        var qualities = [{
            id: 1,
            name: 'Common'
        }, {
            id: 2,
            name: 'Uncommon'
        }, {
            id: 3,
            name: 'Rare'
        }, {
            id: 4,
            name: 'Epic'
        }, {
            id: 5,
            name: 'Legendary'
        }];

        _.each(qualities, function(quality, key) {
            Quality.create({
                id: quality.id,
                name: quality.name
            }).catch(function(error) {
                console.log(error);
            });
        });

        res.send(200, 'All lookup tables have been imported!');
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
