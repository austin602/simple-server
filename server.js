// Load in the express nodejs module.
var express = require ('express');

// Create the express server app.
var server = express ();

//set the public folder that can be accessed by any public user.
server.use (express.static ('public'));

// Make sure the body-parser has been installed (npm install body-parser --save).
// Load the body-parser module.
var bodyParser = require ('body-parser');

// Set express to use the body parser to pull the
// data out of any POST requests from the browser.
server.use (bodyParser.urlencoded ({ extended: true }));


var session = require ('express-session');

server.use (session ({
    secret:'This is my secret phrase',
    resave: false,
    saveUninitialized: true
}));

//load in the connect-flash express middleware module.
var flash = require ('connect-flash');

//set our server app to use the flash message object.
server.use (flash());

server.use (function (request, response, next) {
    response.locals.user = request.session.user;

    //set flash object to be set and used before running any other routes or functions.
    response.locals.message = request.flash ();
//move to the next route.
    next ();

});
// Set the port that our server will run on.
var port = 3000;

//configure the render engine handlebars.
var handlebars = require ('express-handlebars');
server.engine ('.hbs', handlebars ({
    layoutsDir: 'templates',            //the directory of layout files.
    // partialsdir:'templates/partials',   //the directory for partial files.
    defaultLayout:'index',              //the base / main template to always load.
    extname:'.hbs'                      //the file extention to use.

}));



server.set ('views', __dirname + '\\templates\\partials');

server.set ('view engine', '.hbs');

//bring in the mongo db client driver and connect to the database.
var mongoClient = require ('mongodb').MongoClient;

global.db;

mongoClient.connect ('mongodb://localhost:27017/sample_database', function (error,database) {
    //check for error .
    if (error) {
        console.error ('**ERROR: Unable to connect to the mongo database.');
        console.error(error);

    }
    else {
        server.listen (port, function (error) {
            if (error !== undefined) {
                console.error ('***ERROR: Unable to start the server.');
                console.error (error);
            }
            else{
                db = database;
            console.log('-the server has successfully started on port: ' + port);
            }
        });
    }
});




//setthe url routes that the server can use.

var basicRoutes = require ('./routes/basic.js');

server.use ('/', basicRoutes);

var postsRoutes = require ('./routes/posts.js');
server.use ('/post', postsRoutes)

var userRoutes = require ('./routes/user.js');
server.use ('/user', userRoutes);


server.get ('/test', function (request, response) {

    // db.collection ('users').find().toArray (function (error, result) {
    //     console.log('This is the result of the query: ', result);
    // });

    db.collection ('users').findOne ({ username:'ronbravo'}, {}, function (error, result) {
        console.log ('This is the result of the query: ', result);
    });
    response.send ('db test was run.');
});
