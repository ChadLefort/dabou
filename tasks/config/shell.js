/**
 * Runs sails lift.
 *
 * ---------------------------------------------------------------
 *
 * Starts the express web server.
 *
 */

module.exports = function(grunt) {

  grunt.config.set('shell', {
      server:{
        command: 'sails lift'
      }
  });

  grunt.loadNpmTasks('grunt-shell');
};
