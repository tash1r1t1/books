"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var bookForm = document.getElementById('book-form');
  var bookList = document.getElementById('book-list'); // Fetch books and render them

  fetchBooks();
  bookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(bookForm);
    fetch('/admin', {
      method: 'POST',
      body: new URLSearchParams(formData)
    }).then(function () {
      fetchBooks();
      bookForm.reset();
    });
  });

  function fetchBooks() {
    fetch('/admin/books').then(function (response) {
      return response.json();
    }).then(function (books) {
      bookList.innerHTML = '';
      books.forEach(function (book) {
        var li = document.createElement('li');
        li.innerHTML = "\n                        <strong>".concat(book.title, "</strong> by ").concat(book.author, " (").concat(book.year, ") - ").concat(book.description, "\n                        <button data-id=\"").concat(book.id, "\" class=\"delete-button\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n                        <button data-id=\"").concat(book.id, "\" class=\"edit-button\">\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438</button>\n                    ");
        bookList.appendChild(li);
      });
      document.querySelectorAll('.delete-button').forEach(function (button) {
        button.addEventListener('click', function (e) {
          var id = e.target.getAttribute('data-id');
          fetch('/admin/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              id: id
            })
          }).then(function () {
            return fetchBooks();
          });
        });
      });
      document.querySelectorAll('.edit-button').forEach(function (button) {
        button.addEventListener('click', function (e) {
          var id = e.target.getAttribute('data-id'); // Here you can add functionality for editing books
          // You might want to display a form with the current book data for editing
        });
      });
    });
  }
});
//# sourceMappingURL=logic.dev.js.map
