var express = require('express');

var routes = function(Book) {
    var bookRouter = express.Router();
    bookRouter.route('/')
        .post(function(req, res) {
            //mongoose model for our book

            //it's going to look at the body and see if it has any JSON objects in it,
            // and if it does it's going to take that JSON object and it's going to add it 
            //to req.body, so down here we can do req.body and use that to create our new book. 
            var book = new Book(req.body);
            book.save(); //save book in mongo db using mongoose
            res.status(201).send(book); // status as 201 means record created

        })
        .get(function(req, res) { // set up get route

            var query = req.query;

            Book.find(query, function(err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            })
        });

    bookRouter.use('/:bookId', function(req, res, next) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                //so req.book = book, and what that's going to do is it's going to then make it available 
                //to everything down stream from here,  and then we 'll call next.
                //All I need to add is a req. in front of book  and now basically what it's 
                //doing is everything that's in req.book is being modified with whatever's 
                // in req.body, and then we're going to save that and then we're going to return it.

                next();
            } else {
                res.status(404).send('book not found')

            }
        })
    })
    bookRouter.route('/:bookId')
        .get(function(req, res) { // set up get route

            res.json(req.book);

        })
        .put(function(req, res) {
            Book.findById(req.params.bookId, function(err, book) {

                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                req.book.save();
                res.json(req.book);
            })
        })
        .patch(function(req, res) {
            // if(req.body.title){
            //     req.book.title =  req.body.title
            // }
            if (req.body._id) {
                delete req.body._id
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save();
            res.json(req.book);
        })
        .delete(function(req, res) {

            req.book.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed'); //204- No Content- It does not exists
                }
            })
        });

    return bookRouter;

}
module.exports = routes;
