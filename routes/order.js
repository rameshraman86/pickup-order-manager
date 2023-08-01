const express = require('express');
const router = express.Router();

// Placeholder array to simulate dishes data
const dishes = [
  {
    id: 1,
    name: 'Dish 1',
    description: 'This is the first dish.',
    price: 10.99,
  },
  {
    id: 2,
    name: 'Dish 2',
    description: 'This is the second dish.',
    price: 15.99,
  },
];

router.get('/', (req, res) => {
  res.render('order', { dishes }); // Pass the 'dishes' array to the 'order.ejs' view
});

router.post('/delete', (req, res) => {
  const { dishId } = req.body;
  res.redirect('/order'); // Redirect back to the order page after deletion
});

module.exports = router;
