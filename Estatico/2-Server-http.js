
var http = require('http');
var path = require("path");
var fs = require("fs");
var url = require('url');

http.createServer(function(request, response) {

    if (request.method != 'GET') {
	 	response.writeHead(405, {'Allow': 'GET'});    
		response.end();
		return;
    }

    var filename = url.parse(request.url).pathname;
    if (filename == '/') filename = '/index.html';
    filename = path.join("public", filename);

    var rs = fs.createReadStream(filename);

    rs.pipe(response);
	    
    rs.on('error',function(error) {
		response.end('Error leyendo '+request.url);
    });
  
}).listen(3000);
