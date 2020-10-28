
require('dotenv').config();
const { errorHandler } = require('./middleware/errorHandler');
const createError = require('http-errors');
const express = require('express');
const router = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Sorry, an error has occured, Requested page not found!'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log('App listening on http://localhost:' + port);
})
