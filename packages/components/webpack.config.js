const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const glob = require( "glob" );

module.exports = {
	mode: "production",
	entry: glob.sync( "./src/**/*.css" ),
	plugins: [
		new MiniCssExtractPlugin( {
			filename: "styles.css",
		} ),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					"css-loader",
				],
			},
		],
	},
};
