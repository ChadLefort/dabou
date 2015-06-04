module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'autoprefixer',
    'linkAssetsBuildProd',
    'clean:build',
    'copy:build'
  ]);
};
