var debug = require('debug')('cli-app');
var express = require('express');
var app = express();
var glob = require('glob');
var fs = require('fs');
var PORT = 4000;
var content;

glob("./routes/*.json", function (er, files) {
  content = JSON.parse(fs.readFileSync(files[0], 'utf8'));
  app.get(content.route, function (req, res) {
    res.send('Hello World!');
  });
})

app.use('/apps', express.static(__dirname + '/public'));

app.listen(PORT, function () {
  debug('Wall-e server listening on port ' + PORT);
});
