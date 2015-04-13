/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

	grunt.config.set('watch', {
		api: {
			options: {
                livereload: true
            },
			// API files to watch:
			files: ['api/**/*', '!**/node_modules/**']
		},
		views: {
			options: {
                livereload: true
            },
            // Views to watch
            files: ['views/**/*']
        },
		assets: {
			options: {
                livereload: true
            },

			// Assets to watch:
			files: ['assets/**/*', 'tasks/pipeline.js', '!**/node_modules/**'],

			// When assets are changed:
			tasks: ['syncAssets' , 'linkAssets']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
