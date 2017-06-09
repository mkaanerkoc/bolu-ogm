//modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var session = require('express-session');

var db = require('./back-end/website/config/db');

// set our port
var port = process.env.PORT || 80;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);
mongoose.Promise = global.Promise;
mongoose.connection.on("open", function(){
  console.log("mongodb is connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('bower_components'));
app.use(express.static('front-end'));

require('./back-end/website/rest/upload')(app);

app.use(session(
        {secret: 'Okyanus1900'},
        {
          cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            resave : true,
            maxAge: 2 * 60 * 1000
          },
          rolling: true}
));


app.listen(port);
// shoutout to the user
console.log('Magic happens on port ' + port);
// expose app
exports = module.exports = app;
