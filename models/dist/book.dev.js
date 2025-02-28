"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Імпортуємо модуль sqlite3 з можливістю використання розширених функцій
var sqlite3 = require('sqlite3').verbose(); // Ініціалізуємо базу даних SQLite, вказуючи шлях до файлу бази даних


var db = new sqlite3.Database('./db/database.sqlite'); // Виконуємо ініціалізацію бази даних

db.serialize(function () {
  // Створюємо таблицю books, якщо вона не існує
  db.run("CREATE TABLE IF NOT EXISTS books (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        title TEXT,                            \n        author TEXT,                          \n        year INTEGER,                          \n        description TEXT,                     \n        coverUrl TEXT                       \n    )");
}); // Клас Book, що представляє модель для роботи з таблицею books

var Book =
/*#__PURE__*/
function () {
  function Book() {
    _classCallCheck(this, Book);
  }

  _createClass(Book, null, [{
    key: "getAllBooks",
    // Метод для отримання всіх книг з бази даних
    value: function getAllBooks() {
      return new Promise(function (resolve, reject) {
        // Виконуємо SQL-запит для отримання всіх записів у таблиці books
        db.all('SELECT * FROM books', [], function (err, rows) {
          if (err) {
            reject(err); // Відхиляємо проміс у випадку помилки
          }

          resolve(rows); // Передаємо результат запиту у випадку успіху
        });
      });
    } // Метод для додавання нової книги до бази даних

  }, {
    key: "addBook",
    value: function addBook(title, author, year, description, coverUrl) {
      return new Promise(function (resolve, reject) {
        // Виконуємо SQL-запит для вставки нового запису в таблицю books
        db.run('INSERT INTO books (title, author, year, description, coverUrl) VALUES (?, ?, ?, ?, ?)', [title, author, year, description, coverUrl], // Параметри запиту
        function (err) {
          if (err) {
            reject(err); // Відхиляємо проміс у випадку помилки
          }

          resolve(this.lastID); // Повертаємо ID доданого запису
        });
      });
    } // Метод для видалення книги за її ID

  }, {
    key: "deleteBook",
    value: function deleteBook(id) {
      return new Promise(function (resolve, reject) {
        // Виконуємо SQL-запит для видалення запису з таблиці books за ID
        db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
          if (err) {
            reject(err); // Відхиляємо проміс у випадку помилки
          }

          resolve(); // Повертаємо успішний результат
        });
      });
    } // Метод для пошуку книги за ID

  }, {
    key: "findById",
    value: function findById(id) {
      return new Promise(function (resolve, reject) {
        // Виконуємо SQL-запит для отримання книги за заданим ID
        db.get('SELECT * FROM books WHERE id = ?', [id], function (err, row) {
          if (err) {
            reject(err); // Відхиляємо проміс у випадку помилки
          } else {
            resolve(row); // Повертаємо знайдений запис
          }
        });
      });
    } // Метод для оновлення інформації про книгу за ID

  }, {
    key: "update",
    value: function update(id, _ref) {
      var title = _ref.title,
          author = _ref.author,
          year = _ref.year,
          description = _ref.description,
          coverUrl = _ref.coverUrl;
      return new Promise(function (resolve, reject) {
        // Виконуємо SQL-запит для оновлення даних книги за заданим ID
        db.run('UPDATE books SET title = ?, author = ?, year = ?, description = ?, coverUrl = ? WHERE id = ?', [title, author, year, description, coverUrl, id], // Параметри запиту
        function (err) {
          if (err) {
            reject(err); // Відхиляємо проміс у випадку помилки
          } else {
            resolve(); // Повертаємо успішний результат
          }
        });
      });
    }
  }]);

  return Book;
}(); // Експортуємо клас Book для використання в інших модулях


module.exports = Book;
//# sourceMappingURL=book.dev.js.map
