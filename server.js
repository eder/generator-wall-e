var express = require('express');
var app = express();
var glob = require('glob');
var fs = require('fs');
var content;

glob("./routes/*.json", function (er, files) {
  content = JSON.parse(fs.readFileSync(files[0], 'utf8'));
  app.get(content.route, function (req, res) {
    res.send('Hello World!');
  });
})

app.listen(3000, function () {
});

app.use(require('connect-livereload')({
  port: 3000
}));
