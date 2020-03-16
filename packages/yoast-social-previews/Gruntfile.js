var path = require( "path" );
var loadGruntConfig = require( "load-grunt-config" );

module.exports = function( grunt ) {
	// Define project configuration.
	var project = {
		paths: {
			grunt: "tools/grunt/",
			js: "src/js/",
			css: "src/css/",
			get config() {
				return this.grunt + "config/";
			},
		},
		files: {
			js: [
				"src/js/**/*.js",
				"tools/grunt/config/*.js",
				"!src/js/config/*.js",
				"<%= files.grunt %>",
			],
			jsDontLint: [
				"!src/js/templates.js",
			],
			scss: "src/css/*.scss",
			templates: "src/templates/**/*.jst",
			jed: "node_modules/jed/jed.js",
			get config() {
				return project.paths.config + "*.js";
			},
			grunt: "Gruntfile.js",
		},
		pkg: grunt.file.readJSON( "package.json" ),
	};

	// Load Grunt configurations and tasks
	loadGruntConfig( grunt, {
		configPath: path.join( process.cwd(), project.paths.config ),
		data: project,
	} );
};
