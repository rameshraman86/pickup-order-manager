
const express = require('express');
const router = express.Router();
const dishes = require('../db/queries/menuDb');

router.get('/', (req, res) => {
  dishes.getDishes()
    .then(dishes => {
      console.log(dishes);
      res.send(dishes);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
