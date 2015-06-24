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
  itemIds = [];

program
  .version('0.0.1')
  .option('-g, --get', 'Get tabards then writes to a file')
  .parse(process.argv);

if (!program.get) {
  program.help();
} else {
  console.log('Getting Tabards');
  console.log('----------------------------------------------');

  var page1 = getItemIds(1);
  var page2 = getItemIds(2);

  Promise.settle([page1, page2]).then(function (results) {
    return results[0]._settledValue.sort(sortNumber);
  }).then(function (results) {
    generateFile(results);
  });


  function sortNumber(a, b) {
    return a.id - b.id;
  }

  function getItemIds(page) {
    return new Promise(function (resolve, reject) {
      request('http://wowdb.com/items/armor/tabards?page=' + page).then(function (response) {
        var $ = cheerio.load(response);

        $('.listing-icon').each(function () {
          var data = $(this);
          itemIds.push({id: parseInt(data.attr('href').match(/\d+/)[0])});
        });

        resolve(itemIds);
      }).catch(function (error) {
        reject(chalk.red('Error: ' + error));
      });
    });
  }

  function generateFile(results) {
    fs.writeFileAsync('tabardsIds.json', JSON.stringify(results, null, 2)).then(function () {
      console.log(chalk.green('File Generated!'));
    }).catch(function (error) {
      console.log(chalk.red('Error: ' + error));
    });
  }
}
