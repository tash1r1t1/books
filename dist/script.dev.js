"use strict";

var express = require('express');

var path = require('path');

var app = express();
var books = []; // Middleware to serve static files from the current directory

app.use(express["static"](__dirname)); // Middleware to parse URL-encoded data from forms

app.use(express.urlencoded({
  extended: true
})); // Route for the home page

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}); // Route for the admin page

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, 'admin.html'));
}); // Route for the login page

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'));
}); // Route for the registration page

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'register.html'));
}); // Route to handle the registration form submission

app.post('/register', function (req, res) {
  // Here you can process the form data, for example:
  console.log('Form Data:', req.body); // Redirect to the admin page after registration

  res.redirect('/admin');
});
app.post('/login', function (req, res) {
  // Here you can process the login data, for example:
  console.log('Login Form Data:', req.body); // Redirect to the admin page after login

  res.redirect('/admin');
});
app.post('/admin', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      author = _req$body.author,
      description = _req$body.description,
      year = _req$body.year; // Create a new book object

  var newBook = {
    title: title,
    author: author,
    description: description,
    year: year,
    id: Date.now() // Use timestamp as a unique ID

  }; // Add the new book to the in-memory store

  books.push(newBook); // Redirect back to the admin page

  res.redirect('/admin');
}); // Route to handle deleting a book

app.post('/admin/delete', function (req, res) {
  var id = req.body.id; // Remove the book with the given ID

  books = books.filter(function (book) {
    return book.id !== parseInt(id);
  }); // Redirect back to the admin page

  res.redirect('/admin');
}); // Route to handle updating a book

app.post('/admin/update', function (req, res) {
  var _req$body2 = req.body,
      id = _req$body2.id,
      title = _req$body2.title,
      author = _req$body2.author,
      description = _req$body2.description,
      year = _req$body2.year; // Update the book with the given ID

  books = books.map(function (book) {
    if (book.id === parseInt(id)) {
      return {
        id: id,
        title: title,
        author: author,
        description: description,
        year: year
      };
    }

    return book;
  }); // Redirect back to the admin page

  res.redirect('/admin');
}); // Route to get the list of books

app.get('/admin/books', function (req, res) {
  res.json(books); // Send the list of books as JSON
});
var PORT = 8080;
app.listen(PORT, function () {
  console.log("Server listening: http://localhost:".concat(PORT));
});
//# sourceMappingURL=script.dev.js.map
