/**
 * Starts BrowserSync.
 *
 * ---------------------------------------------------------------
 *
 * Starts the BrowserSync proxy and watches files.
 *
 */

module.exports = function (grunt) {

  grunt.config.set('browserSync', {
    bsFiles: {
      src: [
        'views/**/*.handlebars',
        'views/*.handlebars',
        'assets/**/*'
      ]
    },
    options: {
      open: false,
      watchTask: true,
      proxy: 'https://localhost:1337',
      socket: {
        path: '/socket.io'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browser-sync');
}
