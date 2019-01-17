var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

var app = express();

var metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])

var got = require('got')

//view engine middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Path - a middleware to access static resources like html, css, etc.
app.use(express.static(path.join(__dirname, 'public')))

app.post('/', function(req, res) {
    var targetUrl = req.body.newArticle;
    console.log(targetUrl);


    (async () => {
    try {
        var { body: html, url } = await got(targetUrl)
        var metadata = await metascraper({ html, url })
        console.log(metadata)
      }
    catch (err) {
        console.log('fetch failed', err);
      }
      })

    ()

  })

app.listen(3000, function(){
  console.log('Server started on port 3000')
});
