require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const isURL = require('is-url');
const mon = require('mongoose');
// Basic Configuration
const port = process.env.PORT || 3000;

mon.connect("mongodb+srv://fccdb:fccdb@cluster0.teunbos.mongodb.net/fccdb?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
const urlS = mon.Schema ({
  og_url: String,
  s_url: String
});
const urlM = mon.model("urlM", urlS);
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
  if (isURL(url)) {
    short_url = Math.floor(Math.random() * 100000).toString();
    var currurl = new urlM ({
      og_url: url,
      s_url: short_url
    });
    currurl.save();
    res.json({original_url: url, short_url: short_url});
  } else {
    res.json({error: 'invalid url'});
  }
});

app.get('/api/shorturl/:surl?', function(req, res) {
  const surl = req.params.surl;
  console.log(surl);
  urlM.findOne({s_url: surl})
  .then(function(data) {
    const ogurl = data.og_url;
    if (ogurl === null)
      console.log("Does not exist");
    console.log(ogurl);
    res.redirect(ogurl);
  })
  .catch(function(err) {
    console.log(err);
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
