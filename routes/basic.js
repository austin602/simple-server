var express = require ('express');

var router = express.Router ();


//home or root route.
router.get ('/', function (request, response) {
    // response.send ('<h1>Hello World!</h1>');


response.render ('home');
});

router.get ('/', function (request, response){
    response.render ('home');
});

router.get ('/about', function (request, response){
    response.render ('about');
});

router.get ('/contact', function (request, response){
    response.render ('contact');
});

router.get ('/faq', function (request, response){
    response.render ('faq');
});



//export the router from this file that is seen
//by nodeJs as its own module.
module.exports = router;
