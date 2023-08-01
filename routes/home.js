const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/order', (req, res) => {
  res.render('order');
});

module.exports = router;
