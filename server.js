// require express
const express = require('express');
// require mongoose
const mongoose = require('mongoose');
// require cors
const cors = require('cors');
// require the URI
const db = require('./config/db');

// 'Magic numbers' should always be declared at the top of the file and named in all caps
const PORT = 8000;

// To avoid the deprecation warning set `strictQuery` to true
mongoose.set('strictQuery', true);

// Create connection with the URI from config/db.js
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Using the express function create an express app
const app = express();

// before any request come in whitelist our front end localhost
app.use(cors({ origin: `http://127.0.0.1:5500` }));

// For Express to accept the content type of json we have to use `express.json()` middleware and pass it to `app.use`
app.use(express.json());

// To run the server you will always need `app.listen`
// Listening on PORT 8000
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});

// exporting app to use elsewhere
module.exports = app;
