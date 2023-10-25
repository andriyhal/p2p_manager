const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
	{
		mode: 'development',
		devtool: 'source-map',
		entry: {
			background: path.join(
				__dirname,
				'src',
				'background_script',
				'index.js'
			),
			popup: path.join(__dirname, 'src', 'popup_script', 'index.js')
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react'
							]
						}
					}
				},
				{
					test: /\.css$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								esModule: false
							}
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: {
									localIdentName:
										'[name]_[local]_[hash:base64:5]'
								}
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['', '.js', '.jsx']
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(
					__dirname,
					'src',
					'popup_script',
					'public',
					'popup.html'
				),
				filename: 'popup.html',
				chunks: ['popup']
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			}),
			new Dotenv(),
			new NodePolyfillPlugin()
		]
	},
	{
		mode: 'development',
		devtool: 'source-map',
		entry: './src/content_script/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react'
							]
						}
					}
				},
				{
					test: /\.css$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								esModule: false
							}
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: {
									localIdentName:
										'[name]_[local]_[hash:base64:5]'
								}
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['', '.js', '.jsx']
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					{
						from: 'manifest.json',
						to: path.join(__dirname, 'dist'),
						force: true,
						transform: function (content, path) {
							// generates the manifest file using the package.json informations
							return Buffer.from(
								JSON.stringify({
									description:
										process.env.npm_package_description,
									version: process.env.npm_package_version,
									...JSON.parse(content.toString())
								})
							);
						}
					},
					{
						from: 'src/resources/p2p.png',
						to: path.join(__dirname, 'dist'),
						force: true
					}
				]
			}),
			new Dotenv(),
			new NodePolyfillPlugin()
		]
	}
];
