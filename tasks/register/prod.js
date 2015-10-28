module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'autoprefixer',
    'sails-linker:prodJs',
    'sails-linker:prodStyles'
  ]);

  grunt.registerTask('heroku:production', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'autoprefixer',
    'sails-linker:prodJs',
    'sails-linker:prodStyles'
  ]);
};
