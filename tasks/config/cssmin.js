/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

	grunt.config.set('cssmin', {
		dist: {
			src: ['.tmp/public/concat/site.css'],
			dest: '.tmp/public/min/site.min.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
