// server.js

// init project
var express = require('express');
var app = express();
var rp = require("request-promise");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

app.get("/chordify", function(request, response) {
  rp(`https://chordify.net/song/data/youtube:${request.query.youtube_id}?vocabulary=extended_inversions`).
    then((result) => {
      console.log('got result', result);
      response.send(result)
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
