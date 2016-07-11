var express = require("express");
var app = express();
var geoip = require('geoip-lite');

app.enable('trust proxy');

var servers = [];
servers.push({
  url: "http://104.199.146.157:8080/",
  region: "asia"
});

app.get('/', function(req, res) {
  res.send("Go Chat Server");
});

app.get('/servers', function(req, res) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  var geo = geoip.lookup(ip);
  console.log(ip);
  console.log(geo);
  res.send(geo);
});

app.listen(8080, function(req, res) {
  console.log("Listening to 8080")
});
