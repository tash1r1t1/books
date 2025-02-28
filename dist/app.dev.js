"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var session = require('express-session');

var app = express(); // Подключение роутов

var indexRoutes = require('./routes/index');

var adminRoutes = require('./routes/admin');

var authRoutes = require('./routes/auth');

var bookRoutes = require('./routes/book'); // Настройка шаблонизатора EJS


app.set('view engine', 'ejs'); // Middleware

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
})); // Роуты

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes); // Запуск сервера

var PORT = 8080;
app.listen(PORT, function () {
  console.log("Server listening at http://localhost:".concat(PORT));
});
//# sourceMappingURL=app.dev.js.map
