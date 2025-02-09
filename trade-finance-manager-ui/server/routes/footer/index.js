const express = require('express');

const router = express.Router();

router.get('/accessibility-statement', (req, res) => res.render('accessibility-statement.njk', { user: req.session.user }));

router.get('/cookies', (req, res) => res.render('cookies.njk', { user: req.session.user }));

module.exports = router;
