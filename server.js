var express = require ('express');

var server = express ();




var bodyParser = require ('body-parser');

server.use (bodyParser.urlencoded ({ extended: true }));

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
