module.exports = function(grunt) {

  grunt.config.set('open', {
    dev : {
      path: 'http://localhost:1337'
    }
  });

  grunt.loadNpmTasks('grunt-open');
};
