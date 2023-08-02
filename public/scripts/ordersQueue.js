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
            <span class="status">Status: </span> ${order.status}

          <form>
            <label for="eta">ETA</label>
            <input type="number" name="eta" class = "eta" required></input>
            <span class="total-amount">Total Amount: </span> ${order.total_amount}

            <button type="submit" class="btn-accept">Accept</button>
            <button type="button" class="btn-decline">Decline</button>
            </div>
          </form>
          `;
          newOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        newOrdersDiv.html('<p>No new orders available.</p>');
      }
    })
    .then(() => {
      $(".btn-accept").click(function() {
        const parentDiv = $(this).closest('div');
        const orderNumberElement = parentDiv.find('.order-number');
        const orderId = orderNumberElement.data('order-id');

        const etaInputElement = parentDiv.find('.eta');
        const etaValue = etaInputElement.val();

        const data = {
          order_id: orderId,
          eta: etaValue
        };

        if (etaValue) {
          $.post('/api/ordersQueue/accept-order', data)
            .then(() => {
              console.log(`${data.order_id} Accepted`);
            });
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
            <p>
              Order Number: ${order.id}
              Customer ID: ${order.customer_id}
              Status: ${order.status}
              ETA: ${order.eta_minutes}
              Total Amount: ${order.total_amount}
            </p>
          `;
          acceptedOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        acceptedOrdersDiv.html('<p>No new orders available.</p>');
      }
    })
    .catch((error) => {
      console.error(error);
      acceptedOrdersDiv.html('<p>Failed to fetch orders data.</p>');
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
  updateCompletedOrders();
});
