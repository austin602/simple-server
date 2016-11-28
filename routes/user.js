// Bring in express.
var express = require ('express');
//create an express router.
var router = express.Router ();

//load the user schema object.
var User = require ('../model/user.js');

//define routes.
router.get ('/logout', function (request, response){
    // response.render ('logout');
    request.session.destroy ();

    response.redirect ('/user/login');

});
router.get ('/register', function (request, response){

    response.render ('register');
});


router.get ('/login', function (request, response){
    // response.send ('You are now on the login page.');
    //check to see if user session exists and the user is defined.
    if (request.session.user) {
        response.redirect ('/user/dashboard');
    }
    else {
        response.render ('login');
    }
});

router.post ('/register', function (request, response){
    // response.send ('You are now on the register page.');
    db.collection ('users').insertOne (
        //data to save to collection.
        {
            username: request.body.username,
            password: request.body.password,
            email: request.body.email
        },
        //the call back function to run once the save is complete.
        function (error, result) {
            if (error) {
                console.error ('***ERROR: Unable to register user.');
                response.send ('Server error, unable to register user.');
            }
            else {

                console.log('Test')
                //redirect to the login page.
                response.redirect ('/user/login');
            }
        }
    )
});

router.post ('/login', function (request, response){
    // response.send ('You are now on the login route.');
    //   Run a query to pull the user from the database using
    //   the'username' field sent down by the post data.
    db.collection ('users').findOne (
        {
            username: request.body.username,
            password: request.body.password
        },

        {},

        function (error, result) {
            //check for errors.
            if (error) {
                console.error ('***ERROR: Problem finding the user');
                console.error (error);

                response.redirect ('/user/login');
            }
            else if (!result) {
                // The query was run but did NOT find a matching
                // object

                //create a flash message to let the user know there was a
                //Problem with ther credentials.
                request.flash ('error', 'Your username or password is not correct');
                //redirect back to the login page.
                response.redirect ('/user/login');

            }
            else {
                // response.send ('Found the user by the name: ' + result.username);

                //save the user to the session.
                console.log ('This is the found user: ', result);

                request.session.user = {
                    username: result.username,
                    email:result.email
                }


                response.redirect ('/user/dashboard');
            }
            console.log ('This is the result: ', result);
        });
        // response.render ('login');
    });

    router.get ('/reset', function (request, response) {
        response.send ('You have now posted');
    });
    router.get ('/dashboard', function (request, response) {
        // response.send ('You are now on the dashboard page.');
        console.log ('session: ');

        response.render ('dashboard', {
            data:{
                user: request.session.user
            }
        });
    });


router.get ('/test', function (request, response) {
    //now that we have our model, we will try and create a new user object based on the model.
    var newUser = User ({
        username:'bobbie',
        password:'bertha'
    });

    //save the user to the database.
    newUser.save (function (error) {
        if (error) {
            console.error ('*** ERROR: Unable to save the user.');
            console.error (error);
        }
        else {
            console.log ('User was successfully saved to db: ', newUser);
            //run a query to find a User object.
            User.find ({ username: 'ronbravo' }, function (error, foundUser) {
                if (error) {
                    console.error ('*** ERROR: Unable to find the user.');
                    console.error (error);
                }
                else{
                    console.log ('User found: ', foundUser);
                }
            });

            //run a query where we search by the user object's id.
            User.findById ('583c73c15ee5e1142040798f', function (error, foundUser) {
                if (error) {
                    console.error ('*** ERROR: Unable to find the user by id.');
                    console.error (error);
                }
                else{
                    console.log ('User found by id: ', foundUser);
                }
            })
        }
    });

    console.log('Test: ', User);

})
    //exporting the router from this module.
    module.exports = router;
