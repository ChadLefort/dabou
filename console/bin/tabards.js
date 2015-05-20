#!/usr/bin/env node

var program = require('commander'),
    request = require('request-promise'),
    chalk = require('chalk'),
    sleep = require('sleep'),
    Promise = require("bluebird"),
    fs = Promise.promisifyAll(require('fs')),
    converter = require('json-2-csv'),
    lupus = require('lupus'),
    json2csv = Promise.promisify(converter.json2csv),
    bnetkey = '',
    tabardArray = [],
    newTabardArray = [];

program
    .version('0.0.1')
    .option('-g, --get', 'Get tabards then writes to a file')
    .parse(process.argv);

if (!program.get) {
    program.help();
} else {
    console.log('Getting Tabards');
    console.log('----------------------------------------------');

    //    fs.readFileAsync('tabards.json', 'utf8').then(function (results) {
    //        var tabards = JSON.parse(results);
    //
    //        for (var i = 0; i < 100; i++) {
    //            tabardArray.push(getTabards(tabards.items[i].id));
    //        }
    //
    //        return Promise.all(tabardArray);
    //
    //    }).then(function (results) {
    //        generateFile(results);
    //    }).catch(function (error) {
    //        console.log(chalk.red('Error: ' + error));
    //    });

    activate();

    function activate() {
        lupus(119133, 119900, function (id) {
            if (id % 100 == 0) {
                sleep.sleep(1);
                console.log(chalk.yellow('Pausing'));
            }
            
            tabardArray.push(tabard(id).catch(function (error) {
                console.log(error);
            }));
        }, function () {
                Promise.all(tabardArray).then(function (results) {
                    return results;
                }).each(function (item) {
                    if (item != undefined) {
                        newTabardArray.push(item);
                    }
                }).then(function () {
                    generateFile(newTabardArray);
                }).catch(function (error) {
                    console.log(chalk.red('Error: ' + error));
                });
            });
    }

    function generateFile(results) {
        json2csv(results).then(function (csv) {
            fs.writeFileAsync('tabards.csv', csv);
        }).then(function () {
            console.log(chalk.green('File Generated!'));
        }).catch(function (error) {
            console.log(chalk.red('Error: ' + error));
        });
    }

    function tabard(id) {
        return new Promise(function (resolve, reject) {
            request('https://us.api.battle.net/wow/item/' + id + '?locale=en_US&apikey=3bnppqbsssuhe9mt39mv2x7vzd8f6ke9').then(function (response) {
                var data = JSON.parse(response),
                    item = {
                        id: data.id,
                        name: data.name
                    };

                if (data.inventoryType == 19) {
                    resolve(item);
                } else {
                    reject(chalk.red('Error: Not a tabard'));
                }

            }).catch(function (error) {
                reject(chalk.red('Error: ' + error));
            });
        });
    }
}