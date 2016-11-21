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


server.listen (port, function (error) {
    if (error !== undefined) {
        console.error ('***ERROR: Unable to start the server.');
        console.error (error);
    }
    else{
    console.log('-the server has successfully started on port: ' + port);
    }
});

//setthe url routes that the server can use.

var basicRoutes = require ('./routes/basic.js');

server.use ('/', basicRoutes);


var postsRoutes = require ('./routes/posts.js');
server.use ('/post', postsRoutes)
