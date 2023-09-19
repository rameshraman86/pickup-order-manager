
const express = require('express');
const router = express.Router();
const dishes = require('../db/queries/menuDb');
const client = require('twilio')();

router.get('/', (req, res) => {
  dishes.getDishes()
    .then(dishes => {
      //Adding quantity
      const dishesWithQuantity = dishes.map(dish => ({ ...dish, quantity: 0 }));
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
  dishes.addNewOrder(total_amount, order_date)
    .then((result)=>{
      console.log("Insert was successful ", result);
      //We need to send the response to the client who made the AJAX Call
      // ****************TWILLIO****************
      //send sms about order decline
      client.messages
        .create({
          body: `New order has been submitted, please refresh the page to see details and approve/deny.`,
          to: '+14165748446', // Text your number
          from: '+18506167208', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
      // .done();
      // ****************TWILLIO****************

      res.json({result: true});
    })
    .catch((err) => {
      console.log('error adding a new order: ', err);
      res.json({result: false})
    });
});



module.exports = router;
