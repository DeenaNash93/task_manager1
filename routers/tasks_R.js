const express = require('express');
const router = express.Router();
const tasks = require('../middleware/tasks_Mid');

router.get('/', tasks.list);
router.post('/add', tasks.add);
router.get('/toggle/:id', tasks.toggle);

module.exports = router;
