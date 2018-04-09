// Load the 'User' Mongoose model
var User = require('mongoose').model('User');
//// Create a new 'create' controller method
exports.create = function (req, res, next) {
    // Create a new instance of the 'User' Mongoose model    
    User.findOne({ email: req.body.email }, function (err, result) {
        if (result) {
            const message = "User already exists!";
            // Set the flash messages
            req.flash('error', message);
            return res.redirect('/signup');
        } else {
            var user = new User(req.body);
            // Use the 'User' instance's 'save' method to save a new user document
            user.save(function (err) {
                if (err) {
                    // Call the next middleware with an error message
                    return next(err);
                } else {
                    // Use the 'response' object to send a JSON response
                    //res.json(user);
                    var session = req.session;
                    session.Fname = req.body.firstName;
                    session.Lname = req.body.lastName;
                    res.redirect('/user-created');
                }
            });
        }
    });
}; 

exports.signin = function (req, res) {
    //read the username from body property of request object    
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, result) {
        if (result) {
            var email_get = req.body.email;
            //make a reference to the session object
            var session = req.session;
            //store username in session object
            session.email = email_get;
            session.userid = result._id;
            session.userType = result.userType;
            session.userNm = result.firstName + " " + result.lastName;
            console.log(result);
            //console.log("In index function - User name = " + session.email);
            //check if session object contains the username
            if (session.email) {
                res.redirect('/dashboard');
            }  
            //throw err;
        } else {
            const message = "Either User does not exists or password does not match!";
            // Set the flash messages
            req.flash('error', message);
            return res.redirect('/');
        }
    });
    //console.log("GET request - User name = " + session.email);
};