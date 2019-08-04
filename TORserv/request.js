var https = require('https');
var querystring = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// form data
var postData = JSON.stringify({
  status: "Active",
  url: "https://www.facebook.com/"
});
 
// request option
var options = {
  host: 'localhost',
  port: 443,
  method: 'POST',
  path: '/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  },
  rejectUnauthorized: false
};
 
// request object
var req = https.request(options, function (res) {
  var result = '';
  res.on('data', function (chunk) {
    result += chunk;
  });
  res.on('end', function () {
    console.log(result);
  });
  res.on('error', function (err) {
    console.log(err);
  })
});
 
// req error
req.on('error', function (err) {
  console.log(err);
});

//send request witht the postData form
req.write(postData);
req.end();