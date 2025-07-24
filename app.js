// app.js
const port = 7777;
const express = require('express');
const app = express();
const path = require("path");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// דף בית זמני
app.get('/', (req, res) => {
    res.send('Personal Tasks Project');
});

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
