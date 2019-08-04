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


https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cer')
}, app)
.listen(443, function () {
  console.log('HTTPS Listening on Port 443! Go to https://localhost:443/')
});

function connect(url) {
  return new Promise(function(resolve, reject) {
  tr.request(url, 
    function (err, res, body) {
    if (!err && res.statusCode == 200) {
      resolve(body);
      // console.log(body);
    }
    else {
      reject(err);
    }
  });
  
  });
}

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
    res.send("HTTP CONNECTION ESTABLISHED");
  });

  // POST http://localhost:8080/api/users
// parameters sent with 
	app.post('/', async function(req, res) {
    console.log("Post Recieved")
	    // var status = req.body.status;
      // var url = req.body.url;
      //var obj = JSON.parse(req.body);
      var obj = req.body
      console.log(obj);
      
      var json = Object.keys(obj)[0];
      var index = JSON.parse(json);
      console.log(index.url);
      
      try {
      var page = await connect(index.url).then((val) => {
        res.send(JSON.stringify(val));
        console.log("Response Sent");
      });
    }
    catch {
      console.log("Cannot connect to TOR")
	    res.send("Connection Denied");
    }
    
	});

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