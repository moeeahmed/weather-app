'use strict';

const morgan = require('morgan');
const express = require('express');

const app = express();

const locationRouter = require('./routes/locationRoutes');

app.use(express.json());
app.use(morgan('dev'));

// -- ROUTES --

app.use('/', locationRouter);

module.exports = app;
