var feedback = require('mongoose').model('feedback');
exports.render = function (req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    var feedback_insrt = new feedback(req.body);
    // Use the 'User' instance's 'save' method to save a new user document
    feedback_insrt.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
           // return next(err);
        } else {
            // Use the 'response' object to send a JSON response
           // res.json(feedback_insrt);
        }
    });
    var session = req.session;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    session.Fname = Fname;
    session.Lname = Lname;
    //check if session object contains the username
    res.render('thankayou', {
        title: 'Feedback Submitted Successfully!',
        FirstNm: session.Fname,
        LastNm: session.Lname,
    });
};

exports.usercreated = function (req, res, next) {
    var session = req.session;
    res.render('thankayou', {
        title: 'Registerd Successfully!',
        FirstNm: session.Fname,
        LastNm: session.Lname,
    });
};

