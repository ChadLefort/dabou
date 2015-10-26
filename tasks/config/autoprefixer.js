/**
 * Autoprefixer
 *
 * ---------------------------------------------------------------
 *
 * Autoprefix all the things, for the last 2 versions of major browsers
 *
 */

module.exports = function (grunt) {

  grunt.config.set('autoprefixer', {
    options: {
      silent: true, // suppress logging
      map: true, // Use and update the sourcemap
      browsers: ['last 2 versions', '> 1%', 'Explorer 10']
    },
    site: {
      src: '.tmp/public/min/site.min.css',
      dest: '.tmp/public/min/site.min.css'
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
};
