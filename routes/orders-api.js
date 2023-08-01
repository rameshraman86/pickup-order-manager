//my orders page of restaurant to view orders, manage the order queue


const express = require('express');
const router = express.Router();
const orders = require('../db/queries/orders');

//CRUD
//create


//readall
router.get('/', (req, res) => {

  orders.getOrders()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      res.status(500)
        .json({ error: err.message });
    });
});


//readone


//update


//delete



module.exports = router;
