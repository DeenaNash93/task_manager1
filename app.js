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

let db_M = require('./database');
global.db_pool = db_M.pool;

const auth_R = require('./routers/auth_R');
app.use('/', auth_R);

const user_Mid = require('./middleware/user_Mid');
app.get('/protected', user_Mid.isLogged, (req, res) => {
    res.send("את מחוברת כ-" + req.user.username);
});
const categories_R = require('./routers/categories_R');
app.use('/categories', user_Mid.isLogged, categories_R);

const tasks_R = require('./routers/tasks_R');
app.use('/tasks', user_Mid.isLogged, tasks_R);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// דף בית זמני
app.get('/', (req, res) => {
    res.send('Personal Tasks Project');
});

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
