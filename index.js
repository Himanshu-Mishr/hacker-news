const express     = require('express');
const app         = express();
const path        = require('path');
let   compression = require('compression');
require("dotenv").config();
const bodyParser = require("body-parser");

// autoredirect any request from http to https
// if(process.env.NODE_ENV !== 'localhost') {
//   app.use (function (req, res, next) {
//     var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
//     if (schema === 'https') {
//       next();
//     } else {
//       res.redirect('https://' + req.headers.host + req.url);
//     }
//   });
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

// static path for create app
app.use('/app', express.static(path.join(__dirname, '/app/build')));
app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname, '/app/build', 'index.html'));
});


app.get('/', function(request, response) {
  response.send('<code>Node.js App</code>')
});

app.post('/extract-content', require("./apipartials/extractor"));

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
