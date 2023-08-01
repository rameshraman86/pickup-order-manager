//my orders page of restaurant to view orders, manage the order queue


const express = require('express');
const router = express.Router();
const orders = require('../db/queries/ordersDb');

//CRUD

//************CREATE************
//create a new order when restaurant clicks 'Accept' button in /orders -->New Orders
// POST '/orders_queue/accept_order'
router.post('', (req, res) => {
  res.send('accepted');
});




//*********READ************
//readallorders
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

//readNewOrders
router.get('/new-orders', (req, res) => {
  orders.getOrdersByStatus()
    .then(newOrders => {
      res.send(newOrders);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


//readAcceptedOrders
router.get('/accepted-orders', (req, res) => {
  orders.getAcceptedOrders()
    .then(acceptedOrders => {
      res.send(acceptedOrders);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//readCompletedOrders
router.get('/completed-orders', (req, res) => {
  orders.getCompletedOrders()
    .then(completedOrders => {
      res.send(completedOrders);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



//************update************


//************delete************



module.exports = router;
