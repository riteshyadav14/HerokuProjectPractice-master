var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//get reference to schema, after that we're going to layout in JSON what a book looks like
var bookModel = new Schema({
    title: {
        type: String
    },
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
});

module.exports= mongoose.model('Book', bookModel);

//it tells Mongoose that we have a new model or 
// a new schema called book, and then we're going to return that in our module.exports, so that back over in our app.js we now 
// have an instance of that book model