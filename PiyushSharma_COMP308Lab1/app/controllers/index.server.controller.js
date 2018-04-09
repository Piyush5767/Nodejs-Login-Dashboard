//This code uses the CommonJS module pattern to define a function named render()
//You can require this module and use this function
//You'll need to use Express routing functionality to utilize the controller
exports.render = function (req, res) {
    //read the username from body property of request object
    //var email = req.body.email;
    //make a reference to the session object
   // var session = req.session;
    //store username in session object
    //session.email = email;
    //check if session object contains the username
    if (req.session.email) {
        res.redirect('/dashboard');
    }else{
        //display the ejs page
        res.render('index', {
            title: 'Login page',
            messages: req.flash('error'),
        });
    }
};


// Create a new 'list' controller method
exports.signup = function (req, res, next) { 
    //make a reference to the session object
    //var session = req.session;
    //check if session object contains the username
    if (req.session.email) {
        res.redirect('/dashboard');
    } else {
        //display the ejs page
        res.render('signup', {
            title: 'Register with us! ',
            messages: req.flash('error')
        });
    }
};