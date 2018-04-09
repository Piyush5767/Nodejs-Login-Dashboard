//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument 
//Then it requires the index controller and uses its render() method
//as a middleware to GET requests made to the root path.
var User = require('mongoose').model('User');
var Feedback = require('mongoose').model('feedback');
module.exports = function (app) {
    //load the controllers
    var index = require('../controllers/index.server.controller');
    var dashboard = require('../controllers/dashboard.server.controller');
    var authenticated = require('../controllers/authenticated.server.controller');
    var thankyou = require('../controllers/thankyou.server.controller');
    /*var login = require('../controllers/login.server.controller');
    var logout = require('../controllers/logout.server.controller');
    var admin = require('../controllers/admin.server.controller');
    *///handle the routing of get and post request
    // Displaying user login page
    app.get('/', function (req, res, next) {
        index.render(req,res);
    });

    // Handling user login details 
    app.post('/', authenticated.signin); 

    // display dashboard to authenticated user
    app.get('/dashboard', dashboard.render);
    app.post('/dashboard', function (req, res) {
        //console.log("POST request - User name = " + req.body.username);
        dashboard.render(req, res);
    });

    /*app.get('/login', index.render);
    app.post('/login', login.render);
    app.get('/logout', logout.render);*/



    app.get('/thankyou', thankyou.render);
    app.post('/thankyou', function (req, res) {
        //console.log("POST request - User name = " + req.body.username);
        thankyou.render(req, res);
    });

    // user created routing
    app.get('/user-created', function (req, res) {
        thankyou.usercreated(req, res);
    });



    // displaying signup page
    app.route('/signup').get(index.signup);
    //creating new user
    app.post('/signup', authenticated.create); 

    app.get('/signout', function (req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });
    // Feedback Routing
    app.get('/dashboard/user/feedback/:id', function (req, res, next) {
        let requestSegments = req.path.split('/');        
        var id = requestSegments[4];
        Feedback.find({ userid: id }, function (err, feeds) {
            res.render('view_feedback', {
                title: 'User Feedbacks',
                feedbacks: feeds,
            });
        });
    });

    app.get('/dashboard/comment-history', function (req, res, next) {        
        var session = req.session;
        var id = session.userid;
        console.log(id);
        Feedback.find({ userid: id }, function (err, feeds) {
            res.render('view_feedback', {
                title: 'User Feedbacks',
                feedbacks: feeds,
            });
        });
    });
};
