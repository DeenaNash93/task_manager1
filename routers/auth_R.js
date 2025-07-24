// routers/auth_R.js
const express = require('express');
const router = express.Router();
const md5 = require('md5');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db_pool.query(query, [username, md5(password)], (err, results) => {
        if (err) return res.send("שגיאת התחברות");

        if (results.length === 1) {
            const user = results[0];
            const token = jwt.sign({ id: user.id, username: user.username }, "secret", { expiresIn: "1h" });
            res.cookie("token", token);
            res.redirect('/tasks');
        } else {
            res.send("שם משתמש או סיסמה שגויים");
        }
    });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db_pool.query(query, [username, md5(password)], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.send("שם משתמש כבר קיים");
            }
            return res.send("שגיאה בהרשמה");
        }
        res.redirect('/login');
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
});

module.exports = router;
