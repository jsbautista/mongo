const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');

const contentRouter = require('./routes/content');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/chat/api/messages", contentRouter);

module.exports = app;
