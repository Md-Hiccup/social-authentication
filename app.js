var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'content-type':'text/plain'});
    res.end("hello World!!!!");
}).listen('1337');
console.log("Server is running on 8080");