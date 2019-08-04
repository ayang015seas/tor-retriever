const fetch = require('node-fetch');
const body = { a: 1 };

fetch('https://localhost', {
    method: 'POST',
    port: 443,
    path: '/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    rejectUnauthorized: false,
    body: "%7B%0A%20%20status%3A%20%22Passive%22%2C%0A%20%20url%3A%20%22https%3A%2F%2Fwww.facebook.com%2F%22%0A%7D"
  })
    .then(res => res.json())
    .then(json => console.log(json));
