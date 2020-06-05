const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = ({ mode }) => {

	const config = {
		mode,
		entry: './src/main.js',
		output: {
			filename: 'main.min.js',
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'PIU Monitoramento',
				scriptLoading: 'defer',
				template:'index.html'
			}),
			new VueLoaderPlugin(),
			new Dotenv()
		],
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						'vue-style-loader',
						'style-loader',
						'css-loader',
						'sass-loader',
					],
				},
				{
				 test: /\.(png|svg|jpg|gif|kml|rar)$/,
					use: [
						'file-loader'
					]
			 },
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						loaders: {
							'scss': [
								'vue-style-loader',
								'css-loader',
								'sass-loader'
							],
							'sass': [
								'vue-style-loader',
								'css-loader',
								'sass-loader?indentedSyntax'
							]
						}
					}
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		}
	}

	if (mode === 'development') {
		config.devServer = {
			port: 3000,
			contentBase: '.',
			clientLogLevel: 'silent',
			historyApiFallback: true,
			overlay: true
		}
		config.devtool = 'source-map'
		config.mode = mode
	}

	return config
}
