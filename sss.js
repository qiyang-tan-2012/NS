var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./app/techglimpse.com.key'),
  cert: fs.readFileSync('./app/techglimpse.com.crt')
};

fs.readFile('./app/index.html', function(err, html){
	if (err){
		throw err;
	}
	https.createServer(options, function (req, res) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	}).listen(8000);
});