'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const locationRouter = require('./routes/locationRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// -- ROUTES --

app.use('/', locationRouter);

module.exports = app;
