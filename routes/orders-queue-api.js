//my orders page of restaurant to view orders, manage the order queue


const express = require('express');
const router = express.Router();
const orders = require('../db/queries/ordersDb');
const client = require('twilio')();

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


//get order details
router.post('/getOrderDetails', (req, res) => {
  const { order_id } = req.body;
  console.log(`order id is : ${order_id}`);

  orders.getOrderDetails(order_id)
    .then((orderDetails) => {
      console.log(orderDetails);
      res.json(orderDetails);
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
    .then(() => {
      console.log('TWILLIO RUNNING');
      // ****************TWILLIO****************
      //send sms about order accept
      client.messages
        .create({
          body: `Restaurant has confirmed your order. ETA for pickup is ${eta} minutes. Your order number is ${order_id}. We'll let you know when your order is ready for pickup!`,
          to: '+14165748446', // Text your number
          from: '+18506167208', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
        .done();
      // ****************TWILLIO****************
    })
    .catch((err) => {
      res.send(`couldn't accept, ` + err);
    });
});


router.post('/decline-order', (req, res) => {
  const { order_id } = req.body;

  orders.declineOrder(order_id)
    .then(() => {
      console.log('TWILLIO RUNNING');
      // ****************TWILLIO****************
      //send sms about order decline
      client.messages
        .create({
          body: `Your order ${order_id} is declined. Please contact us or reorder. Sorry for the inconvenience.`,
          to: '+14165748446', // Text your number
          from: '+18506167208', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
      // .done();
      // ****************TWILLIO****************
    })
    .catch((err) => {
      res.send(`couldn't decline, ` + err);
    });
});

router.post('/cancel-order', (req, res) => {
  const { order_id } = req.body;

  orders.cancelOrder(order_id)
    .then(() => {
      // ****************TWILLIO****************
      //send sms about order cancel
      client.messages
        .create({
          body: `Unfortunately, the Restaurant has cancelled your order. Apologies for inconvenience. Your refund will be processed immediately.`,
          to: '+14165748446', // Text your number
          from: '+18506167208', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
        .done();
      // ****************TWILLIO****************
    }).catch((err) => {
      res.send(`couldn't cancel: ` + err);
    });
});


router.post('/update-eta', (req, res) => {
  const { order_id, eta_minutes } = req.body;

  let delayInMinutes = 0;

  orders.getEta(order_id)
    .then((data) => {
      delayInMinutes = eta_minutes - data.eta_minutes;
    });

  const messageBody = function(delayInMinutes) {
    if (delayInMinutes > 0) {
      return `Apologies. Your order ${order_id} is delayed by ${delayInMinutes} minutes. We will text you when the order is ready for pickup.`;
    }
    if (delayInMinutes < 0) {
      return `Great News! Your order ${order_id} is early by ${delayInMinutes} minutes. We will text you when the order is ready for pickup.`;
    }
  };

  orders.udpdateEta(eta_minutes, order_id)
    .then(() => {
      // ****************TWILLIO****************
      //send sms about new eta
      client.messages
        .create({
          body: messageBody(delayInMinutes),
          to: '+14165748446', // Text your number
          from: '+18506167208', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
        .done();
      // ****************TWILLIO****************
    })
    .catch((err) => {
      res.send(`Error updating eta: ` + err);
    });
});


router.post('/ready-to-pickup-orer', (req, res) => {
  const { order_id } = req.body;

  orders.orderPickedUp(order_id)
    .then(() => {
      // ****************TWILLIO****************
      //send sms about order ready to pickup
      client.messages
        .create({
          body: `Great news!!! Your order ${order_id} is ready. Please stop by the front desk to pickup your order.`,
          to: '+14165748446', // Text your number
          from: '+18506167208', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
        .done();
      // ****************TWILLIO****************
    })
    .catch((err) => {
      res.send(`Error updating status to waiting for pickup: ` + err);
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
