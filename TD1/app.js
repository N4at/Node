const express = require('express')
const app = express()

app.get('/', function (req, res) {
  console.log('call HTTP GET /');
  res.send('Hello World')
})

app.listen(3000)