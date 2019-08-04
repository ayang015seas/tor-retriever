// grab the packages we need
// URL: http://localhost:8080/

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var https = require('https');
var fs = require('fs');
var tr = require('tor-request');

/*
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cer')
}, app)
.listen(443, function () {
  console.log('Example HTTPS listening on port 443! Go to https://localhost:443/')
});
*/


app.listen(8080, function () {
    console.log('Example app listening on port 8080.');
});

// routes will go here

// start the server
// app.listen(port);
// console.log('Server started! At http://localhost:' + port);


// routes will go here
// http://localhost:8080/api/1
  app.get('/', function(req, res) {
    res.sendFile('/Users/alexyang/Desktop/adserver/html/ad3.html');
  });

  // POST http://localhost:8080/api/users
// parameters sent with 

/*
  app.param('name', function(req, res, next, name) {

    // check if the user with that name exists
    // do some validations
    // add -dude to the name
    var modified = name + '-dude';

    // save name to the request
    req.name = modified;

    next();
});


// http://localhost:8080/api/users/chris
app.get('/api/users/:name', function(req, res) {
    // the user was found and is available in req.user
    res.send('What is up ' + req.name + '!');
});

*/