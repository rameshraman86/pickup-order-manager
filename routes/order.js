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

router.get('/api', (req, res) => {
  return res.status(200).json({ dishes }); // Pass the 'dishes' array to the 'order.ejs' view
});

router.post('/delete', (req, res) => {
  const { dishId } = req.body;
  res.redirect('/order'); // Redirect back to the order page after deletion
});

router.post('api/ordersQueue', (req, res) => {
  const { phone, items, subtotal } = req.body;
  console.log('Phone:', phone);
  console.log('Items:', items);
  console.log('Subtotal:', subtotal);
  res.redirect('/order');
});

module.exports = router;
