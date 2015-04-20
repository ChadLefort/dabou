module.exports = function(grunt) {

  grunt.config.set('shell', {
      server:{
        command: 'sails lift'
      }
  });

  grunt.loadNpmTasks('grunt-shell');
};
