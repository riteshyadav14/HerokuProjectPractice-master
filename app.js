var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var urlServer = 'mongodb://demo:river808@ds053216.mlab.com:53216/standupmettingphenocare';
var url = 'mongodb://localhost/bookAPI';

var db = mongoose.connect(urlServer);
var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 3000;

//let our app know that we're going to use that bodyParser, and so we're going to have
//to do an app.use statement
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/Books', bookRouter);
//do app.use and setup a base for where our API route is going to be, so let's do /api


app.get('/', function(req, res) {
    res.send('welcome to my API!'); // send back simple string
});

app.listen(port, function() {
    console.log('Gulp is running my app on  PORT: ' + port);
});