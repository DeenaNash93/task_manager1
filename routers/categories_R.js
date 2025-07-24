// routers/categories_R.js
const express = require('express');
const router = express.Router();

// הצגת כל הקטגוריות של המשתמש המחובר
router.get('/', (req, res) => {
    const query = "SELECT * FROM categories WHERE user_id = ?";
    db_pool.query(query, [req.user.id], (err, results) => {
        if (err) return res.send("שגיאה בשליפת קטגוריות");
        res.render("categories", { categories: results });
    });
});

// הוספת קטגוריה
router.post('/add', (req, res) => {
    const { name } = req.body;
    const query = "INSERT INTO categories (name, user_id) VALUES (?, ?)";
    db_pool.query(query, [name, req.user.id], (err, result) => {
        if (err) return res.send("שגיאה בהוספה");
        res.redirect('/categories');
    });
});

// מחיקת קטגוריה
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM categories WHERE id = ? AND user_id = ?";
    db_pool.query(query, [id, req.user.id], (err, result) => {
        if (err) return res.send("שגיאה במחיקה");
        res.redirect('/categories');
    });
});

module.exports = router;
