'use strict';

const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const locationRouter = require('./routes/locationRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// app.use(morgan('dev'));

// -- ROUTES --

app.use('/', locationRouter);

module.exports = app;
