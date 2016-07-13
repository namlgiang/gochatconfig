var express = require("express");
var app = express();

var gcloud = require('gcloud');
var datastore = gcloud.datastore();

// var geoip = require('geoip-lite');
// var requestIp = require('request-ip');
// app.use(requestIp.mw());

app.enable('trust proxy');

var servers = [];
servers.push({
  url: "http://146.148.71.1:8080/",
  region: "us"
});
servers.push({
  url: "http://192.158.30.135:8080/",
  region: "eu"
});
servers.push({
  url: "http://104.155.231.179:8080/",
  region: "asia"
});

app.get('/', function(req, res) {


  query = datastore.createQuery('Global Message');

  datastore.runQuery(query, function (err, messages) {
      res.send("Number of messages: " + messages.length);
  });


});

app.get('/servers', function(req, res) {
  res.send(servers);
});

app.get('/minversion', function(req, res) {
  res.send('1.0');
});

app.listen(8080, function(req, res) {
  console.log("Listening to 8080")
});
