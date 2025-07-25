const express = require('express');
const router = express.Router();
const categories = require('../middleware/categories_Mid');

router.get('/', categories.list);
router.post('/add', categories.add);
router.get('/delete/:id', categories.remove);

module.exports = router;
