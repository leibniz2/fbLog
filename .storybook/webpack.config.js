var path = require('path');

module.exports = {
 module: {
   loaders: [
     {
       test: /.js$/,
       loaders: [ 'babel' ],
       include:  __dirname,
     },
     {
       test: /.css?$/,
       loaders: ['style','raw'],
       include: path.resolve( __dirname, '../')
     },
     {
       test: /.(png|jpg|gif)$/,
       loader: "file-loader?name=img/[hash:6].[ext]"
     },
     {
       test: /.woff(2)?(\?v=\d+.\d+.\d+)?$/,
       loader: 'file-loader?limit=10000&mimetype=application/font-woff'
     },
     {
       test: /.ttf(\?v=\d+.\d+.\d+)?$/,
       loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
     },
     {
       test: /.eot(\?v=\d+.\d+.\d+)?$/,
       loader: 'file'
     },
     {
       test: /.svg(\?v=\d+.\d+.\d+)?$/,
       loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
     }
   ]
 }
};
