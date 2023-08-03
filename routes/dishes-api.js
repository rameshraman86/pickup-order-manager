
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


//this will add a neworder to orders table
router.post('/add-new-order', (req, res) => {
  const { total_amount, order_date } = req.body;
  console.log('node is running: ', total_amount, order_date);

  dishes.addNewOrder(total_amount, order_date)
    .catch((err) => {
      console.log('error adding a new order: ', err);
    });
});


//Post to create the order
// router.post('/create-dish', (req, res) => {
//   const { order_id, eta } = req.body;

//   orders.createOrder(order_id, eta)
//     .catch((err) => {
//       res.send(`couldn't accept, ` + err);
//     });
// });

// router.post('api/ordersQueue', (req, res) => {
//   const { phone, items, subtotal } = req.body;
//   console.log('Phone:', phone);
//   console.log('Items:', items);
//   console.log('Subtotal:', subtotal);
//   res.redirect('/order');
// });

module.exports = router;
