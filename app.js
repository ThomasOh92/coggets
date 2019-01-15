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


/* ascasxadcdac
  app.get('/scrape', function(req, res){

    request(articleToScrape, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);

        var title, release, rating;
        var json = { title : "", image : "", content : ""};

        $('.header').filter(function(){
          var data = $(this);
          title = data.children().first().text();  //to check (This is the DOM travesal, need to learn more)
          image = data.children().first().image(); // to check (This is the DOM travesal, need to learn more)
          content = data.children().first().content(); //to check (This is the DOM travesal, need to learn more)

          json.title = title;
          json.image = image;
          json.content = content;
        })
      }
    })

  })
*/

app.listen(3000, function(){
  console.log('Server started on port 3000')
});
