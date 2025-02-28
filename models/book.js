// Імпортуємо модуль sqlite3 з можливістю використання розширених функцій
const sqlite3 = require('sqlite3').verbose();

// Ініціалізуємо базу даних SQLite, вказуючи шлях до файлу бази даних
const db = new sqlite3.Database('./db/database.sqlite');

// Виконуємо ініціалізацію бази даних
db.serialize(() => {
    // Створюємо таблицю books, якщо вона не існує
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,                            
        author TEXT,                          
        year INTEGER,                          
        description TEXT,                     
        coverUrl TEXT                       
    )`);
});

// Клас Book, що представляє модель для роботи з таблицею books
class Book {
    // Метод для отримання всіх книг з бази даних
    static getAllBooks() {
        return new Promise((resolve, reject) => {
            // Виконуємо SQL-запит для отримання всіх записів у таблиці books
            db.all('SELECT * FROM books', [], (err, rows) => {
                if (err) {
                    reject(err);  // Відхиляємо проміс у випадку помилки
                }
                resolve(rows);   // Передаємо результат запиту у випадку успіху
            });
        });
    }

    // Метод для додавання нової книги до бази даних
    static addBook(title, author, year, description, coverUrl) {
        return new Promise((resolve, reject) => {
            // Виконуємо SQL-запит для вставки нового запису в таблицю books
            db.run(
                'INSERT INTO books (title, author, year, description, coverUrl) VALUES (?, ?, ?, ?, ?)',
                [title, author, year, description, coverUrl],  // Параметри запиту
                function (err) {
                    if (err) {
                        reject(err);  // Відхиляємо проміс у випадку помилки
                    }
                    resolve(this.lastID);  // Повертаємо ID доданого запису
                }
            );
        });
    }

    // Метод для видалення книги за її ID
    static deleteBook(id) {
        return new Promise((resolve, reject) => {
            // Виконуємо SQL-запит для видалення запису з таблиці books за ID
            db.run('DELETE FROM books WHERE id = ?', [id], (err) => {
                if (err) {
                    reject(err);  // Відхиляємо проміс у випадку помилки
                }
                resolve();  // Повертаємо успішний результат
            });
        });
    }

    // Метод для пошуку книги за ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            // Виконуємо SQL-запит для отримання книги за заданим ID
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);  // Відхиляємо проміс у випадку помилки
                } else {
                    resolve(row);  // Повертаємо знайдений запис
                }
            });
        });
    }

    // Метод для оновлення інформації про книгу за ID
    static update(id, { title, author, year, description, coverUrl }) {
        return new Promise((resolve, reject) => {
            // Виконуємо SQL-запит для оновлення даних книги за заданим ID
            db.run(
                'UPDATE books SET title = ?, author = ?, year = ?, description = ?, coverUrl = ? WHERE id = ?',
                [title, author, year, description, coverUrl, id],  // Параметри запиту
                function (err) {
                    if (err) {
                        reject(err);  // Відхиляємо проміс у випадку помилки
                    } else {
                        resolve();  // Повертаємо успішний результат
                    }
                }
            );
        });
    }
}

// Експортуємо клас Book для використання в інших модулях
module.exports = Book;
