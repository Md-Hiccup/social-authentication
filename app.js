var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'content-type':'text/plain'});
    res.end("hello World!!!!");
}).listen('3000');
console.log("Server is running on 3000");