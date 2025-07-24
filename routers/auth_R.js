const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth_Mid');

router.get('/login', (req, res) => res.render('login'));
router.post('/login', auth.login);

router.get('/register', (req, res) => res.render('register'));
router.post('/register', auth.register);

router.get('/logout', auth.logout);

module.exports = router;
