
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var results = require('./routes/results');
var article = require ('./routes/article');
var external = require ('./routes/external');
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

// Add routes here
app.get('/', choosemood.view);
app.get('/experiment', choosemood.viewExperiment);
app.get('/results', results.view);
app.get('/resultsExperiment', results.viewExperiment);
app.get('/article/:id', article.view);
app.get('/articleExperiment/:id', article.viewExperiment);
app.get('/external/:id', external.view);
app.get('/externalExperiment/:id', external.viewExperiment);
app.post('/choosemood', choosemood.post);
app.post('/choosemoodExperiment', choosemood.postExperiment);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
