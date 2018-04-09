// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var FeedbackSchema = new Schema({
    date: String,
    comment: String,
    userid: String,
});
// Create the 'User' model out of the 'UserSchema'
mongoose.model('feedback', FeedbackSchema);