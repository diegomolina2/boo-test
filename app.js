'use strict';

const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const db = require('./src/database');

// set the view engine to ejs
app.set('view engine', 'ejs');

//Accept Json Requests
app.use(express.json());

// routes
app.use('/', require('./src/routes/profile')());
app.use('/', require('./src/routes/user')());
app.use('/', require('./src/routes/comment')());
app.use('/', require('./src/routes/like')());
app.use('/', require('./src/routes/vote')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

//start database
db.createConnection();