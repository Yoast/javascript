const path = require( "path" );
const webpack = require( "webpack" );
const CaseSensitivePathsPlugin = require( "case-sensitive-paths-webpack-plugin" );

const PORT = 3333;

module.exports = {
	devtool: "cheap-module-eval-source-map",
	entry: [
		// Polyfill
		"babel-polyfill",

		// Compile the @yoast/configuration-wizard scss
		// Needs to be fixed
		// "@yoast/components/src/configuration-wizard/configuration-wizard.css",

		// Compile the yoast-components standalone .scss
		"yoast-components/css/standalone.scss",

		// Activate HMR for React
		"react-hot-loader/patch",

		// Bundle the client for webpack-dev-server
		// And connect to the provided endpoint
		`webpack-dev-server/client?http://localhost:${PORT}`,

		// Bundle the client for hot reloading
		// 'Only-' means to only hot reload for successful updates
		"webpack/hot/only-dev-server",

		// Yoast components entry
		"./render.js",
	],
	output: {
		path: path.resolve( __dirname ),
		filename: "index.js",
	},
	devServer: {
		inline: true,
		host: "0.0.0.0",
		disableHostCheck: true,
		port: PORT,
		historyApiFallback: true,
		hot: true,
		contentBase: "./",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules[/\\](?!(yoastseo)|(yoast-components)[/\\]).*/,
				use: [ {
					loader: "babel-loader",
					options: {
						presets: [
							[ "es2015",
								// https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2
								{ modules: false },
							] ],

						env: {
							development: {
								plugins: [
									"react-hot-loader/babel",
									"babel-plugin-styled-components",
								],
							},

							production: {},
						},
					},
				} ],
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							insertAt: 'top'
						}
					},
					'css-loader',
					'sass-loader',
				]
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new CaseSensitivePathsPlugin(),
	],
	resolve: {
		extensions: [ ".json", ".jsx", ".js" ],
	},
};
