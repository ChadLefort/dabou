/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  'get /': {view: 'layouts/layout'},

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   *  If a request to a URL doesn't match any of the custom routes above, it  *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

  /**
   * Admin Routes
   *
   * @description :: These routes are all associated with a admin access level
   * end points
   */
  'get /admin/tabards': 'AdminController.tabards',
  'get /admin/lookup': 'AdminController.lookup',
  'get /admin/folders': 'AdminController.folders',

  /**
   * Authenication Routes
   *
   * @description :: These routes are all associated with passport or to see
   * if a user is authenicated
   */
  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',
  'get  /logout': 'AuthController.logout',
  'get  /auth': 'AuthController.authenticated',
  'get  /auth/:provider': 'AuthController.provider',
  'get  /auth/:provider/callback': 'AuthController.callback',
  'get  /auth/:provider/:action': 'AuthController.callback',
  'get  /subscribe': 'AuthController.subscribe',

  /**
   * Lookup Routes
   *
   * @description :: These routes are all associated with lookup tables
   */
   'get  /api/lookup': 'LookupController.lookup',

  /**
   * Profile Routes
   *
   * @description :: These routes are all associated with profiles
   */
   'get  /profile/:username': 'ProfileController.username',
};
