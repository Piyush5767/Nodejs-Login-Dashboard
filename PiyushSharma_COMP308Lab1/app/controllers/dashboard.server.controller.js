//This code uses the CommonJS module pattern to define a function named render()
//You can require this module and use this function
//You'll need to use Express routing functionality to utilize the controller

var User = require('mongoose').model('User');
exports.render = function (req, res, next) {
    //make a reference to the session object
    var session = req.session;
    var userLists = "";
    //check if username is stored in session object
    if (session.userType) {
        if (session.userType == "Admin") {            //
            // Create a new 'list' controller method
                // Use the 'User' instance's 'find' method to retrieve a new user document
                    User.find({}, function (err, userslistss) {
                    if (err) {
                        console.log(next(err));
                    } else {  
                        res.render('dashboard', {
                            usertype: 'admin',
                            title: 'Register Customers',
                            users: userslistss,
                            nameUser: session.username,
                        });
                    }
                });
           // console.log(a);

        } else {
            var id;
            User.findOne({ email: session.email }, function (err, doc) {

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }

                today = dd + '-' + mm + '-' + yyyy;

                res.render('dashboard', {
                    usertype: 'customer',
                    users: userLists,
                    email: session.email,
                    date: today,
                    userid: doc._id,
                    title: 'Please complete your details',
                    nameUser: session.username,
                });
            });
        }
    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href=' + '/' + '>Login</a>');
    }
};