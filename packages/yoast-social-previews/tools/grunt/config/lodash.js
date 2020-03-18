// See https://github.com/lodash-archive/grunt-lodash
module.exports = {
	templates: {
		dest: "src/js/templates.js",
		options: {
			exports: [ "node" ],
			template: "<%= files.templates %>",
			flags: [ "--development" ],
			moduleId: "none",
		},
	},
};
