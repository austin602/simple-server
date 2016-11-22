// Bring in express.
var express = require ('express');
//create an express router.
var router = express.Router ();
//define routes.
router.get ('/login', function (request, response){
    // response.send ('You are now on the login page.');

    response.render ('login');
});

router.post ('/login', function (request, response){
    response.send ('You are now on the login route.');
//   Run a query to pull the user from the database using
//   the'username' field sent down by the post data.
    db.collection ('users').findOne ({ username: request.body.username}, {}, function (error, result) {
        console.log ('This is the result: ', result);
    });
    // response.render ('login');
});

router.get ('/reset', function (request, response) {
    response.send ('You have now posted');
});

//exporting the router from this module.
module.exports = router;
