require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');
const { doesNotMatch } = require('assert');
const { redirect } = require('express/lib/response');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  // dns.lookup(url, function(err, data) {
  //   console.log(data);
  // });
  short_url = 1;
  res.json({original_url: url, short_url: short_url});
  app.get('/api/shorturl/1', function(req, res) {
    console.log(redirect);
    res.redirect(url);
  });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
