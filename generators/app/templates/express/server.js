var debug = require('debug')('cli-app');
var express = require('express');
var app = express();
var glob = require('glob');
var fs = require('fs');
var PORT = 4000;
var content;

glob("./routes/*.json", function (er, files) {
  for(var i=0; i < files.length; i++) {
    content = JSON.parse(fs.readFileSync(files[i], 'utf8'));
    for(var k=0; k < content.app.routes.length; k++){
      console.log(content.app.routes[k])
      app.get(content.app.routes[k], function (req, res) {
        res.send('route name ' + content.app.routes[k]);
      });
    }
  }
});

app.use('/apps', express.static(__dirname + '/public'));

app.listen(PORT, function () {
  debug('Wall-e server listening on port ' + PORT);
});
