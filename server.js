var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

var options = {
  key: fs.readFileSync('./app/techglimpse.com.key'),
  cert: fs.readFileSync('./app/techglimpse.com.crt')
};

https.createServer(options, function (request, response) {
    console.log('request starting...');
	
	var filePath = './app' + request.url;
	if (filePath == './app/') {
		filePath = './app/index.html';
	}

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	console.log(filePath);
	fs.exists(filePath, function(exists) {
	
		if (exists) { 
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHeader(500);
					response.end();
				}
				else {
					response.writeHeader(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHeader(404);
			response.end();
		}
	});
	
}).listen(8000);
console.log('Server running at http://localhost:8000/');