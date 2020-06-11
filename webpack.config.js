const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = ({ mode, publicPath }) => {

	const config = {
		mode,
		entry: './src/main.js',
		output: {
			filename: 'main.min.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath
		},
		plugins: [
			new VueLoaderPlugin(),
			new DefinePlugin({
				'process.env.PUBLIC_PATH': JSON.stringify(publicPath)
			}),
			new CleanWebpackPlugin()
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
				 loader: 'file-loader',
					options: {
						name: './[name].[ext]',
					}
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

	if (mode === 'development' || mode === 'homolog') {
		config.plugins.push(new HtmlWebpackPlugin({
				title: 'PIU Monitoramento',
				scriptLoading: 'defer',
				template:'index.html'
			})
		)
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
