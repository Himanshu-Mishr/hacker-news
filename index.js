const express     = require('express');
const app         = express();
const path        = require('path');
let   compression = require('compression');
require("dotenv").config();
const bodyParser = require("body-parser");

// autoredirect any request from http to https
if(process.env.NODE_ENV !== 'localhost') {
  app.use (function (req, res, next) {
    var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
    if (schema === 'https') {
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.set('port', (process.env.PORT || 5000));

// static path for create app
app.use('/app', express.static(path.join(__dirname, '/app/build')));

app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname, '/app/build', 'index.html'));
});


app.use('/', express.static(path.join(__dirname, '/public')));
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.post('/extract-content', require("./apipartials/extractor"));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
