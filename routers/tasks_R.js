// routers/tasks_R.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const userId = req.user.id;
    const status = req.query.status || 'all'; // all, done, not_done
    const category = req.query.category || 'all';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    let query = "SELECT tasks.*, categories.name AS category_name FROM tasks LEFT JOIN categories ON tasks.category_id = categories.id WHERE tasks.user_id = ?";
    let params = [userId];

    if (status === 'done') {
        query += " AND is_done = true";
    } else if (status === 'not_done') {
        query += " AND is_done = false";
    }

    if (category !== 'all') {
        query += " AND category_id = ?";
        params.push(category);
    }

    query += " ORDER BY due_date ASC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    db_pool.query(query, params, (err, tasks) => {
        if (err) return res.send("שגיאה בשליפת משימות");

        // שליפת קטגוריות עבור הסינון
        db_pool.query("SELECT * FROM categories WHERE user_id = ?", [userId], (err, categories) => {
            if (err) return res.send("שגיאה בקטגוריות");

            res.render("tasks", {
                tasks,
                categories,
                filters: { status, category, page }
            });
        });
    });
});

// הוספת משימה
router.post('/add', (req, res) => {
    const { description, due_date, category_id } = req.body;
    const query = "INSERT INTO tasks (description, due_date, category_id, user_id) VALUES (?, ?, ?, ?)";
    db_pool.query(query, [description, due_date, category_id || null, req.user.id], (err, result) => {
        if (err) return res.send("שגיאה בהוספת משימה");
        res.redirect('/tasks');
    });
});

// סימון משימה כהושלמה
router.get('/toggle/:id', (req, res) => {
    const taskId = req.params.id;
    const query = "UPDATE tasks SET is_done = NOT is_done WHERE id = ? AND user_id = ?";
    db_pool.query(query, [taskId, req.user.id], (err) => {
        if (err) return res.send("שגיאה בעדכון משימה");
        res.redirect('/tasks');
    });
});

module.exports = router;
