var http = require('http');

var body = '<html><head><title>Hola Mundo</title></head>'+
           '<body>Hola Mundo</body></html>';

http.createServer(function(request, response) {
    
    console.log('Nueva peticion.');

    if (request.method != 'GET') {
        response.writeHead(405, {'Allow': 'GET'});    
        response.end();
        return;
    }

    response.writeHead(200, {
       'Content-Type': 'text/html',
       'Content-Length': body.length
    });    
    
    response.end(body);
    
})
.listen(3000);
