var express = require('express');

var app = exp.createServer(exp.logger(), exp.bodyParser(), exp.static(__dirname + '/client')),

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/client/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});