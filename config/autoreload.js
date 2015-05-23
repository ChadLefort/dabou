/**
 * Autoreload
 * (sails.config.autoreload)
 *
 * Just lift your app as normal, and when you add / change / remove a model, controller or service file, 
 * all controllers, models, and services will be reloaded without having to lower / relift the app. 
 * This includes all blueprint routes.
 *
 * For more information on autoreload, check out:
 * https://github.com/sgress454/sails-hook-autoreload
 */

module.exports.autoreload = {
  active: true,
  usePolling: false,
  dirs: [
    'api/**/*'
  ]
};
