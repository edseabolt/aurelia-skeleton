import path from 'path';
import merge from 'webpack-merge';
import AureliaWebpackPlugin from 'aurelia-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const resolvedSrcDir = path.resolve(__dirname, 'src');
const resolvedDistDir = path.resolve(__dirname, 'dist');
const isDev = process.argv.find(arg => arg === '-d');

const baseConfig = {
	entry: {
		main: [
			'babel-polyfill',
			'aurelia-framework',
			'aurelia-logging-console',
			'aurelia-templating-binding',
			'aurelia-templating-resources',
			`${resolvedSrcDir}/main.js`
		]
	},
	output: {
		path: resolvedDistDir,
		filename: '[name]-[hash].js',
		chunkFilename: '[id]-[hash].js'
	},
	plugins: [
		new AureliaWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.template.html'),
			filename: 'index.html'
		})
	],
	module: {
		loaders: [
			{
				loader: 'babel',
				test: /\.js$/,
				exclude: /node_modules/,
				query: {
					presets: ['async-to-bluebird', 'es2015', 'stage-0']
				}
			},
			{
				loader: 'html',
				test: /\.html$/
			}
		]
	}
}

const devConfig = {
	devServer: {
		host: 'localhost',
		port: 3000,
		contentBase: './src'
	}
}

const prodConfig = {
}

export default isDev ?
	merge.smart(baseConfig, devConfig) :
	merge.smart(baseConfig, prodConfig);
