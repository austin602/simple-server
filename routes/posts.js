var express = require ('express');

var router = express.Router ();




router.get ('/', function (request, response) {
    response.render ('posts', {
        data: {
            name: 'bob',
            value: 42,
            phrase: 'lorem ipsum...',
        }
    });
})

router.post ('/save', function (request, response) {
    response.send ('post was working' + 'title: ' + request.body.title);
    // console.log ('body content: ', request.body);
});

router.get ('/redirect', function (request, response) {
    response.redirect ('/about');
});

module.exports = router;
