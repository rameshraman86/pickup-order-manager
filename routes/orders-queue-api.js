//my orders page of restaurant to view orders, manage the order queue


const express = require('express');
const router = express.Router();
const orders = require('../db/queries/ordersDb');

//CRUD

//************CREATE************
//When restaurant user clicks 'Accept', grab the order_id from the clicked element object and update the ETA(from input text field), status(to 'Preparing') fields of the order_id.
// Also need to refresh the '/orders_queue' page so that the accepted order appears in the 'Accepted orders' section of the page.
router.post('/accept-order', (req, res) => {
  const { order_id, eta } = req.body;
  orders.acceptOrder(order_id, eta)
    .catch((err) => {
      res.send(`couldn't accept, ` + err);
    });
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
