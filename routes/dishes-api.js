
const express = require('express');
const router = express.Router();
const dishes = require('../db/queries/menuDb');

router.get('/', (req, res) => {
  dishes.getDishes()
    .then(dishes => {
      //Adding quantity
      const dishesWithQuantity = dishes.map(dish => ({ ...dish, quantity: 0 }));
      console.log(dishesWithQuantity);
      res.send(dishesWithQuantity);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
