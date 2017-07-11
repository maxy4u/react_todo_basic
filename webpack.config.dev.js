import webpack from 'webpack'; // pulling webpack from node_modules
import path from 'path';
//webpack configuration begins 
export default {
	debug:true, // this enable displaying debug information
	devtool:'cheap-module-eval-source-map', // to create source map files
	noInfo:false, // this means webpack will display all the files that it is bundling
	entry:[ // defining entry points for our application below
			'eventsource-polyfill', //necessary for hot reloading with IE
			'webpack-hot-middleware/client?reload=true', //Note that reloads the page if hot module reloading fails
			path.resolve(__dirname, 'src/index')// its important that our application entry point js is last the orer is critical
	],
	target:'web', // we can set this to value 'node' thsi tell webpack to bundle the node way or web browser way
	// here below we tell webpack where it should contain the bundle Caveat :- webpack isn't gonna generate any file for dev enviorment
	// it creates bundle in the memore and serve it to the browser. But we do need to define the path and a name so that it can simulate
	// the physical files existance So as said this ownt generate any file.
	// we will setup the build process which will really generate files physically when we set up or production build process
	output:{
		path:__dirname + '/dist',// note physical files are only output by production build task npm run build
		publicPath:'/',
		filename:'bundle.js' 
	},
	devServer:{ // we need to tell webpack wher eour code is
		contentBase:'./src'
	},
	plugins:[ // plugins we need to enhance webpack power
		new webpack.ProvidePlugin({
          Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
          fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
     	}),
		new webpack.HotModuleReplacementPlugin(), // enable us to replace modules without doing full browser refresh
		new webpack.NoErrorsPlugin
	],
	module:{ // tell webpack the types of file that we want it to handle
		loaders: [
		{test:/\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']}, // loader transpile your code 
		{test:/(\.css)$/, loaders: ['style', 'css']},
		{test: /\.(png|jpg)$/,loader: 'url-loader'},
			// below fils bootstrap using for fonts and styling
		{test:/\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
		{test:/\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?prefix=font/&limit=5000'},
		{test:/\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
		{test:/\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
		]
	}
};