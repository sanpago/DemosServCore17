var net = require("net");
var path = require("path");
var fs = require("fs");
var url = require('url');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

// Crear socket de servidor
net.createServer(function(socket) {

  console.log("Cliente conectado");

  socket.on('data', function(data){

    // Extraer metodo, url y version HTTP:
    var request = data.toString();

    console.log("Peticion HTTP: " + request);

    var matches = request.match(/^(\S+)\s(\S+)\s(\S+)\s/);

    var req_method = matches[1];
    var req_url = matches[2];
    var req_version = matches[3];

    console.log("METODO: " + req_method);
    console.log("URL: " + req_url);
    console.log("Version: " + req_version);

    // solo acepto GET
    if (req_method != 'GET') {
        console.log("Metodo no soportado: " + req_method);
        socket.write(req_version + ' 405 Method Not Allowed\n');
        socket.write('Allow: GET\n\n');
        socket.end();
        return;
    }

    console.log("METODO: " + req_method);
    console.log("URL: " + req_url);
    console.log("Version: " + req_version);

    var filename = url.parse(req_url).pathname;

    if (filename == '/') filename = '/index.html';

    filename = path.join("public", filename);

    console.log("Fichero a enviar: "+filename);

    fs.exists(filename, function(exists) {
      if (!exists) {

        console.log("not exists: " + filename);
        socket.write(req_version + ' 404 Not Found\n\n');
        socket.end();

      } else {
        var mt = mimeTypes[path.extname(filename).split(".")[1]];
        console.log("Tipo mime: "+mimeType);

        socket.write(req_version + ' 200 OK\n');
        socket.write('Content-Type: '+mt+'; charset=UTF-8\n\n');

        var rs = fs.createReadStream(filename);
        rs.pipe(socket);

        rs.on('error',function(error) {
            condole.log('Error leyendo ' + filename);
            socket.close();
        });
      }
    });
  });
})
.listen(3000);

