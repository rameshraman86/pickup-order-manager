//my orders page of restaurant to view orders, manage the order queue


const express = require('express');
const router = express.Router();
const orders = require('../db/queries/ordersDb');

//CRUD

//************CREATE************


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

//readWaitingToPickUpOrders
router.get('/waitingToPickup-orders', (req, res) => {
  orders.getWaitingToPickupOrders()
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
//When restaurant user clicks 'Accept', grab the order_id from the clicked element object and update the ETA(from input text field), status(to 'Preparing') fields of the order_id.
// Also need to refresh the '/orders_queue' page so that the accepted order appears in the 'Accepted orders' section of the page.
router.post('/accept-order', (req, res) => {
  const { order_id, eta } = req.body;

  orders.acceptOrder(order_id, eta)
    .catch((err) => {
      res.send(`couldn't accept, ` + err);
    });
});


router.post('/decline-order', (req, res) => {
  const { order_id } = req.body;

  orders.declineOrder(order_id)
    .catch((err) => {
      res.send(`couldn't decline, ` + err);
    });
});

router.post('/cancel-order', (req, res) => {
  const { order_id } = req.body;

  orders.cancelOrder(order_id)
    .catch((err) => {
      res.send(`couldn't cancel, ` + err);
    });
});


router.post('/update-eta', (req, res) => {
  const { order_id, eta_minutes } = req.body;

  orders.udpdateEta(eta_minutes, order_id)
    .catch((err) => {
      res.send('Error updating eta: ', err);
    });
});


router.post('/ready-to-pickup-orer', (req, res) => {
  const { order_id } = req.body;
  orders.orderPickedUp(order_id)
    .catch((err) => {
      res.send('Error updating status to waiting for pickup: ', err);
    });
});

router.post('/order-picked-up', (req, res) => {
  const { order_id } = req.body;
  orders.orderPickedUp(order_id)
    .catch((err) => {
      res.send('Error updating order to picked up: ', err);
    });
});


//************delete************



module.exports = router;
