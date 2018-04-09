// Set the 'NODE_ENV' variable
process.env.NODE_ENV = 'development';

// Load the 'express' module
//const configureExpress = require('./config/express');

// Create a new Express application instance
//const app = configureExpress();

var mongoose = require('./config/mongoose'),
    express = require('./config/express');
var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');
// Use the module.exports property to expose our Express application instance for external usage
