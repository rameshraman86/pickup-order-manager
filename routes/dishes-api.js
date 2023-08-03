
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
    .then((result)=>{
      console.log("Insert was successful ", result);
      //We need to send the response to the client who made the AJAX Call
      res.json({result: true});
    })
    .catch((err) => {
      console.log('error adding a new order: ', err);
      res.json({result: false})
    });
});



module.exports = router;
