require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');
const URL = require('url').URL;
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
  try {
    const hn = new URL(url);
    
    short_url = 1;
    res.json({original_url: url, short_url: short_url});
  } catch(err) {
    res.json({error: 'invalid url'});
  }
    // app.get('/api/shorturl/1', function(req, res) {
  //   console.log(redirect);
  //   res.redirect(302, url);
  // });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
