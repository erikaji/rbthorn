
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

//mysql reference - https://github.com/felixge/node-mysql
var mysql      = require('mysql');
var pool = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "bcb5f0b4b28f7b", 
    password: "511459f4",
    database: "heroku_446c4262d4a3a8f"
});

var edit = require('./routes/edit');
var feed = require('./routes/feed');
var profile = require('./routes/profile');

var app = express();
var hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        getValueByKey: function (array, key) {
        	if (key in array) return array[key];
        	return null;
        },
        eachExcept: function (context, exclude, options) {
        	var ret = "";
            var counter = 0;

            for(var i=0, j=context.length; i<j; i++) {
            	if (exclude.indexOf(context[i]) == -1) {
            	  ret = ret + options.fn(context[i]);
                  counter = counter + 1;
                  if (counter == 2) break;
                }   
            }
            return ret;
            }
    }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('pool', pool);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('readbymood secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', feed.view);
app.get('/profile', profile.view);
app.get('/edit', edit.view);
app.post('/profile', profile.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
