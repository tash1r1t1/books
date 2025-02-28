"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Імпортуємо bcryptjs для хешування паролів
var bcrypt = require('bcryptjs'); // Імпортуємо sqlite3 з можливістю використання розширених функцій


var sqlite3 = require('sqlite3').verbose(); // Ініціалізуємо базу даних SQLite, вказуючи шлях до файлу бази даних


var db = new sqlite3.Database('./db/database.sqlite'); // Виконуємо ініціалізацію бази даних

db.serialize(function () {
  // Створюємо таблицю users, якщо вона не існує
  db.run("CREATE TABLE IF NOT EXISTS users (\n        id INTEGER PRIMARY KEY AUTOINCREMENT, \n        username TEXT UNIQUE,                 \n        password TEXT                     \n    )");
}); // Клас User для роботи з користувачами у базі даних

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "register",
    // Метод для реєстрації нового користувача
    value: function register(username, password) {
      var hashedPassword;
      return regeneratorRuntime.async(function register$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

            case 2:
              hashedPassword = _context.sent;
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                // Виконуємо SQL-запит для вставки нового користувача в таблицю users
                db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], // Вставляємо ім'я користувача та хеш пароля
                function (err) {
                  if (err) {
                    reject(err); // Відхиляємо проміс у випадку помилки
                  }

                  resolve(this.lastID); // Повертаємо ID нового користувача
                });
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    } // Метод для пошуку користувача за його ім'ям

  }, {
    key: "findByUsername",
    value: function findByUsername(username) {
      return regeneratorRuntime.async(function findByUsername$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                // Виконуємо SQL-запит для отримання користувача за заданим ім'ям
                db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
                  if (err) {
                    reject(err); // Відхиляємо проміс у випадку помилки
                  }

                  resolve(row); // Повертаємо знайдений запис (користувача)
                });
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // Метод для перевірки валідності пароля користувача

  }, {
    key: "validatePassword",
    value: function validatePassword(user, password) {
      return regeneratorRuntime.async(function validatePassword$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", bcrypt.compare(password, user.password));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return User;
}(); // Експортуємо клас User для використання в інших модулях


module.exports = User;
//# sourceMappingURL=user.dev.js.map
