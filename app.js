/**
 * Module dependencies.
 */
var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
//load gumball route
var gumball = require('./routes/gumball'); 
var app = express();
var connection  = require('express-myconnection'); 
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({ keepExtensions: true, uploadDir:'/Users/prashantyadav/Documents/images/uploads' }));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//route
app.get('/grails/signup', gumball.signup);
app.get('/list', gumball.list);
app.get('/getDetails/:id', gumball.getDetails);
app.post('/signup/save', gumball.save);
app.get('/delete/:id', gumball.del);
app.post('/update/:id', gumball.update);

app.use(app.router);
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var address =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port, address);
//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});