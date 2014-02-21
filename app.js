
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var results = require('./routes/results');
var article = require ('./routes/article');
var choosemood = require('./routes/choosemood');

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

				  for(var i=0, j=context.length; i<j; i++) {
				  	if (exclude.indexOf(context[i]) == -1)
				  	  ret = ret + options.fn(context[i]);
				  }
				  return ret;
        }
    }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.engine('handlebars', handlebars());
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

/*
// Register helpers
handlebars.registerHelper('getValueByKey', function(array, key) {
    return array[key];
});
*/

// Add routes here
//app.get('/', index.view);
app.get('/results', results.viewResults);
app.get('/article/:id', article.view);
app.get('/', choosemood.view);
app.post('/choosemood', choosemood.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
