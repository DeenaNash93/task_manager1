// middleware/user_Mid.js
const jwt = require('jsonwebtoken');

module.exports = {
    isLogged: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.redirect('/login');

        jwt.verify(token, "secret", (err, decoded) => {
            if (err) return res.redirect('/login');
            req.user = decoded; // מוסיפים את המשתמש לבקשה
            next();
        });
    }
};
