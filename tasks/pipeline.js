/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/importer.css',
  'vendor/angular-toastr/css/*.css',
  'styles/toastr.css',
  'vendor/font-awesome/css/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load these before everything else
  'js/dependencies/sails.io.js',
  'js/site.js',
  'js/dependencies/three.js',

  //From grunt-bower-task
  'vendor/jquery/js/jquery.min.js',
  'vendor/angular/js/angular.min.js',

  //Others
  'vendor/**/js/*.js',

  // Dependencies
  'js/dependencies/*.js',

  //Three
  'spa/tabards/three/scene.js',
  'spa/tabards/three/setup.js',
  'spa/tabards/three/camera.js',
  'spa/tabards/three/wrangler.js',

  //Angular Spa
  'spa/**/dabou.module.js',
  'spa/**/*.module.js',
  'spa/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.handlebars'
];


// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function (path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function (path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function (path) {
  return 'assets/' + path;
});
