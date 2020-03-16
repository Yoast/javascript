const sass = require( "node-sass" );

// See https://github.com/sindresorhus/grunt-sass
module.exports = {
	options: {
		implementation: sass,
		outputStyle: "compressed",
	},
	build: {
		files: {
			"dist/css/yoast-components.min.css": "src/css/all.scss",
			"dist/css/yoast-components-standalone.min.css": "src/css/standalone.scss",
		},
	},
	example: {
		files: {
			"examples/browserified/style.css": "examples/browserified/style.scss",
		},
	},
};
