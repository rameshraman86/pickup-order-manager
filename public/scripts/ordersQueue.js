// Client facing scripts here

//NEW orders
const updateNewOrdersContent = () => {
  const newOrdersDiv = $('.new-orders');

  return $.ajax({
    url: '/api/ordersQueue/new-orders',
    method: 'GET',
    dataType: 'json',
  })
    .then((orders) => {
      if (orders.length > 0) {
        // Clear existing content
        newOrdersDiv.empty();

        // Add the new orders to the "New Orders" section
        orders.forEach((order, index) => {
          const orderHTML = `
          <div class="test ${order.id}">
            <span class="order-number" data-order-id="${order.id}">Order Number: </span> ${order.id}
            <span class="customer-id">Customer ID: </span> ${order.customer_id}
            <span class="total-amount">Total Amount: </span> ${order.total_amount}


          <form>
            <label for="eta">ETA</label>
            <input type="number" name="eta" class = "eta" required></input>
            <button type="submit" class="btn-accept">Accept</button>
            </div>
            </form>

          <form>
            <button type="submit" class="btn-decline">Decline</button>
            <button type="submit" class="btn-details">Order Details</button>
          </form>
          <br>
          `;
          newOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        newOrdersDiv.html('<p>No new orders available.</p>');
      }
    })
    .then(() => {
      $(".new-orders button").click(function() {
        const parentDiv = $(this).closest('div');
        const orderNumberElement = parentDiv.find('.order-number');
        const orderId = orderNumberElement.data('order-id');

        const etaInputElement = parentDiv.find('.eta');
        const etaValue = etaInputElement.val();


        //order declined
        if ($(this)[0].className === "btn-decline") {
          const data = {
            order_id: orderId
          };
          $.post('/api/ordersQueue/decline-order', data);
        }

        //if order was accepted
        if ($(this)[0].className === "btn-accept" && etaValue) {
          const data = {
            order_id: orderId,
            eta: etaValue
          };
          $.post('/api/ordersQueue/accept-order', data);
        }

        //show details of order
        if ($(this)[0].className === "btn-details") {
          //CODE TO SHOW DETAILS OF ORDER.TBD
        }

      });
    })
    .catch((error) => {
      console.error(error);
      newOrdersDiv.html('<p>Failed to fetch orders data.</p>');
    });



};

//Accepted orders
const updateAcceptedOrders = () => {
  const acceptedOrdersDiv = $('.accepted-orders div');

  return $.ajax({
    url: '/api/ordersQueue/accepted-orders',
    method: 'GET',
    dataType: 'json',
  })
    .then((orders) => {
      if (orders.length > 0) {
        // Clear existing content
        acceptedOrdersDiv.empty();

        // Add the accepted orders to the "Accepted Orders" section
        orders.forEach((order) => {
          const orderHTML = `
            <div class="test ${order.id}">
            <span class="order-number" data-order-id="${order.id}">Order Number: </span> ${order.id}
            <span class="customer-id">Customer ID: </span> ${order.customer_id}
            <span class="status">Status: </span> ${order.status}

            <form>
              <label for="eta">ETA</label>
              <input type="number" name="eta" class = "eta" required placeholder = ${order.eta_minutes}></input>
              <button type="submit" class="btn-update-eta">Update</button>
            </form>
            <span class="total-amount">Total Amount: </span> ${order.total_amount}
            <form>
            <button type="submit" class="btn-details">Details</button>
            <button type="submit" class="btn-ready-to-pickup">Ready to Pickup</button>
            <button type="submit" class="btn-cancel">Cancel Order</button>
            </div>
          </form>
          <br>
          `;
          acceptedOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        acceptedOrdersDiv.html('<p>No new orders available.</p>');
      }
    })
    .then(() => {
      $(".accepted-orders button").click(function() {
        const parentDiv = $(this).closest('div');

        //update the eta
        const orderNumberElement = parentDiv.find('.order-number');
        const orderId = orderNumberElement.data('order-id');

        const etaInputElement = parentDiv.find('.eta');
        const etaValue = etaInputElement.val();

        if ($(this)[0].className === "btn-update-eta" && etaValue) {
          const data = {
            order_id: orderId,
            eta_minutes: etaValue
          };

          $.post('/api/ordersQueue/update-eta', data);

        }
        //change status to 'ready for pickup'



        //cancel order

      });
    })

    .catch((error) => {
      console.error(error);
      acceptedOrdersDiv.html('<p>Failed to fetch orders data.</p>');
    });
};


//waiting to pickup orders
const updateReadyToPickupOrders = () => {
  const readyToPickupOrdersDiv = $('.waiting-to-pickup-orders div');

  return $.ajax({
    url: '/api/ordersQueue/waitingToPickup-orders',
    method: 'GET',
    dataType: 'json',
  })
    .then((orders) => {
      if (orders.length > 0) {
        // Clear existing content
        readyToPickupOrdersDiv.empty();


        orders.forEach((order) => {
          const orderHTML = `
            <div class="test ${order.id}">
            <span class="order-number" data-order-id="${order.id}">Order Number: </span> ${order.id}
            <span class="customer-id">Customer ID: </span> ${order.customer_id}
            <span class="status">Status: </span> ${order.status}

            <span class="total-amount">Total Amount: </span> ${order.total_amount}
            <form>
              <button type="submit" class="btn-details">Details</button>
              <button type="submit" class="btn-pickedup">Picked Up</button>
            </div>
          </form>
          <br>
          `;
          readyToPickupOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        readyToPickupOrdersDiv.html('<p>No new orders available.</p>');
      }
    })


    .catch((error) => {
      console.error(error);
      readyToPickupOrdersDiv.html('<p>Failed to fetch orders data.</p>');
    });
};



//Completed orders
const updateCompletedOrders = () => {
  const completedOrdersDiv = $('.completed-orders div');

  return $.ajax({
    url: '/api/ordersQueue/completed-orders',
    method: 'GET',
    dataType: 'json',
  })
    .then((orders) => {
      if (orders.length > 0) {
        // Clear existing content
        completedOrdersDiv.empty();

        // Add the completed orders to the "Completed Orders" section
        orders.forEach((order) => {
          const orderHTML = `
            <p>
              Order Number: ${order.id}
              Customer ID: ${order.customer_id}
              Status: ${order.status}
              Total Amount: ${order.total_amount}
            </p>
          `;
          completedOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        completedOrdersDiv.html('<p>No new orders available.</p>');
      }
    })
    .catch((error) => {
      console.error(error);
      completedOrdersDiv.html('<p>Failed to fetch orders data.</p>');
    });
};


// Update the orders content on page load
$(document).ready(() => {
  updateNewOrdersContent();
  updateAcceptedOrders();
  updateReadyToPickupOrders();
  updateCompletedOrders();
});
