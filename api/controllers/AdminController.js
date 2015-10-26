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
        }).map(function(item) {
            var params = {
                id: item.id,
                reqLevel: item.reqLevel,
                attainable: item.attainable,
                faction: item.faction,
                sourceType: item.sourceType
            };

            sails.promiseThrottle.add(function() {
                return createTabard(params);
            });
        }).then(function() {
            res.send(200, 'All tabards have been imported!');
        }).catch(function(error) {
            res.send(400, {
                msg: error
            });
        });

        function createTabard(params) {
            return new sails.Promise(function(resolve) {
                sails.getItem({
                    origin: 'us',
                    id: params.id
                }).then(function(item) {
                    var description = null,
                        spellId = null,
                        questId = null,
                        achievementId = null;

                    // Check is the tabard has a description
                    if (!_.isEmpty(item.description)) {
                        description = item.description;
                    }

                    // Create source types for every tabard
                    sourceType(params.sourceType, item.id);

                    // If the tabard has a spell associated to it
                    if (!_.isEmpty(item.itemSpells)) {
                        itemSpells(item.itemSpells, item.id);
                    }

                    // If the tabard has a quest associated to it
                    if (item.itemSource.sourceType == 'REWARD_FOR_QUEST') {
                        questId = item.itemSource.sourceId;
                        quest(questId, item.id);
                    }

                    // If the tabard has a achievement associated to it
                    if (item.itemSource.sourceType == 'ACHIEVEMENT_REWARD') {
                        achievementId = item.itemSource.sourceId;
                        achievement(achievementId, item.id);
                    }

                    // Finally create the tabard
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
                        reqLevel: params.reqLevel,
                        faction: params.faction,
                        attainable: params.attainable,
                        spell: spellId,
                        minReputation: item.minReputation,
                        quest: questId,
                        achievement: achievementId
                    }).then(function(item) {
                        resolve(item.id);
                    }).catch(function(error) {
                        console.log(error);
                    });
                }).catch(function(error) {
                    console.log(error);
                });
            });
        }

        function sourceType(sourceTypes, tabardId) {
            _.each(sourceTypes, function(value) {
                SourceType.create({
                    value: value.id,
                    name: value.name,
                    tabard: tabardId
                }).catch(function(error) {
                    console.log(error);
                });
            });
        }

        function itemSpells(itemSpells, tabardId) {
            _.each(itemSpells, function(value) {
                if (!_.isEmpty(value.spell.description)) {
                    Spell.create({
                        id: value.spell.id,
                        name: value.spell.name,
                        icon: value.spell.icon,
                        description: value.spell.description,
                        castTime: value.spell.castTime,
                        tabard: tabardId
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            });
        }

        function quest(id, tabardId) {
            sails.wowQuest({
                origin: 'us',
                id: id
            }).then(function(quest) {
                Quest.create({
                    id: quest.id,
                    title: quest.title,
                    reqLevel: quest.reqLevel,
                    category: quest.category,
                    level: quest.level,
                    tabard: tabardId
                }).catch(function(error) {
                    console.log(error);
                });
            });
        }

        function achievement(id, tabardId) {
            sails.wowAchievement({
                origin: 'us',
                id: id
            }).then(function(achievement) {
                Achievement.create({
                    id: achievement.id,
                    title: achievement.title,
                    points: achievement.points,
                    description: achievement.description,
                    accountWide: achievement.accountWide,
                    tabard: tabardId
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
            return _.uniq(data.races, 'id');
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

        _.each(genders, function(gender) {
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

        _.each(reputations, function(reputation) {
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

        _.each(itemBinds, function(itemBind) {
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

        _.each(qualities, function(quality) {
            Quality.create({
                id: quality.id,
                name: quality.name
            }).catch(function(error) {
                console.log(error);
            });
        });

        // For faction
        var factions = [{
            id: 1,
            name: 'Alliance'
        }, {
            id: 2,
            name: 'Horde'
        }, {
            id: 3,
            name: 'Neutral'
        }];

        _.each(factions, function(faction) {
            Faction.create({
                id: faction.id,
                name: faction.name
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

        res.send(200, 'Folder structure created!');
    }

};
