var express = require ('express');

var server = express ();

var port = 3000;

server.listen (port, function (error) {
    if (error !== undefined) {
        console.error ('***ERROR: Unable to start the server.');
        console.error (error);
    }
    else{
    console.log('-the server has successfully started on port: ' + port);
    }
});
