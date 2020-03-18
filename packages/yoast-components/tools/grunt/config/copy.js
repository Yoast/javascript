// See https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
	publish: {
		files: [ {
			src: [
				".babelrc",
				"src/**/*",
				"!dist/**/*",
				"!node_modules/**/*",
			],
			dest: "dist/",
		} ],
	},
};
