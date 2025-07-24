const md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;
        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        db_pool.query(query, [username, md5(password)], (err, results) => {
            if (err || results.length !== 1) return res.send("שגיאת התחברות");

            const user = results[0];
            const token = jwt.sign({ id: user.id, username: user.username }, "secret", { expiresIn: "1h" });
            res.cookie("token", token);
            res.redirect('/tasks');
        });
    },

    register: (req, res) => {
        const { username, password } = req.body;
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";
        db_pool.query(query, [username, md5(password)], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.send("שם משתמש כבר קיים");
                return res.send("שגיאה בהרשמה");
            }
            res.redirect('/login');
        });
    },

    logout: (req, res) => {
        res.clearCookie("token");
        res.redirect('/login');
    }
};
