/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
  var PromiseThrottle = require('promise-throttle');
  
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  sails.Promise = require('bluebird');
  sails.promiseThrottle = new PromiseThrottle({
      requestsPerSecond: 10,
      promiseImplementation: sails.Promise
  });
  sails.fs = sails.Promise.promisifyAll(require('fs'));
  sails.bnet = require('battlenet-api')(sails.config.bnet.key);
  sails.getItem = sails.Promise.promisify(sails.bnet.wow.item.item);
  sails.services.passport.loadStrategies();
  cb();
};
