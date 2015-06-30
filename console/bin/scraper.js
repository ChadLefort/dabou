#!/usr/bin/env node

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var program = require('commander'),
    request = require('request-promise'),
    chalk = require('chalk'),
    Promise = require("bluebird"),
    fs = Promise.promisifyAll(require('fs')),
    converter = require('json-2-csv'),
    cheerio = require('cheerio'),
    json2csv = Promise.promisify(converter.json2csv),
    _ = require('lodash'),
    tabards = [];

program
    .version('0.0.1')
    .option('-g, --get', 'Get tabards then writes to a file')
    .parse(process.argv);

if (!program.get) {
    program.help();
} else {
    console.log('Getting Tabards');
    console.log('----------------------------------------------');


    getItemIds().then(function (results) {
      generateFile(results);
    });

    function getItemIds() {
        return new Promise(function(resolve, reject) {
            request('http://www.wowhead.com/items=4.-7').then(function(response) {
                var $ = cheerio.load(response);

                var text = $($('script')).text();
                var findAndClean = findTextAndReturnRemainder(text, 'var listviewitems = ');
                var objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g;
                var newQuotedKeysString = findAndClean.replace(objKeysRegex, "$1\"$2\":");
                var items = JSON.parse(newQuotedKeysString);

                _.each(items, function(value, key) {
                    var tabard = {
                        id: value.id,
                        attainable: 1,
                        sourceType: []
                    };

                    _.each(value.source, function (value, key) {
                      var sourceType = {
                        id: value
                      }

                      if (value == 2) {
                        sourceType.name = 'Drop';
                      } else if (value == 3) {
                        sourceType.name = 'PvP';
                      } else if (value == 4) {
                        sourceType.name = 'Quest';
                      } else if (value == 5) {
                        sourceType.name = 'Vendor';
                      } else if (value == 8) {
                        sourceType.name = 'Redemption'
                      } else if (value == 11) {
                        sourceType.name = 'World Event'
                      } else if (value == 12) {
                        sourceType.name = 'Achievement'
                      }

                      tabard.sourceType.push(sourceType);
                    });

                    if (_.has(value, 'attainable') && value.attainable == 2) {
                        tabard.attainable = 0;
                    }

                    if (_.has(value, 'reqlevel')) {
                        tabard.reqLevel = value.reqlevel;
                    }

                    if (_.has(value, 'side')) {
                        if (value.side == 1) {
                          tabard.faction = 'Alliance';
                        } else {
                          tabard.faction = 'Horde';
                        }
                    }

                    tabards.push(tabard);
                });

                resolve(tabards);
            }).catch(function(error) {
                reject(chalk.red('Error: ' + error));
            });
        });
    }

    function findTextAndReturnRemainder(target, variable) {
        var chopFront = target.substring(target.search(variable) + variable.length, target.length);
        var result = chopFront.substring(0, chopFront.search(";"));
        return result;
    }

    function generateFile(results) {
      fs.writeFileAsync('tabardsIds.json', JSON.stringify(results, null, 2)).then(function () {
        console.log(chalk.green('File Generated!'));
      }).catch(function (error) {
        console.log(chalk.red('Error: ' + error));
      });
    }
}
