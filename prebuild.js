const ncp = require('ncp').ncp;
ncp.limit = 16;

const source = './src/assets/'
const destination = './dist/'

ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('kmls e shp copiados!');
});