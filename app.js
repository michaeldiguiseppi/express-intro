var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.get('/', function(req, res) {
    res.send('testing home route');
});

app.get('/foo', function(req, res) {
    res.send('BAR!');
});

app.get('/movie/:moviename', function(req, res) {
    var url = 'http://www.omdbapi.com/?t=' + req.params.moviename;
    request.get(url, function(error, response, body) {
        res.send(body);
    });
});

app.post('/movies', function(req, res) {
    console.log(req.body);
    var title = req.body.moviename;
    var url = 'http://www.omdbapi.com/?t=' + title;
    request.get(url, function(error, response, body) {
        res.send('Rating: '+ JSON.parse(body).imdbRating);
    });
})



app.listen(8090, function() {
    console.log('Express app listening on port 8090');
});