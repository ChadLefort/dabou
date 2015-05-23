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
};
