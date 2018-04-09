var fs = require('fs');

fs.writeFile('demo.txt', "this is NodeJS Demo", function (err){
	if(err){
		return consol.log(err);
	}
	console.log("File created")
})