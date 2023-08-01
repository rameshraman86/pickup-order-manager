// Client facing scripts here

// Function to fetch new orders data from the server. These orders are in 'Pending Acceptance'
const fetchNewOrders = () => {
  return $.ajax({
    url: '/api/ordersQueue/new-orders',
    method: 'GET',
    dataType: 'json',
  });
};
// Function to update the HTML content with the fetched orders data
const updateNewOrdersContent = () => {
  const newOrdersDiv = $('.new-orders');

  fetchNewOrders()
    .then((orders) => {
      if (orders.length > 0) {
        // Clear existing content
        newOrdersDiv.empty();

        // Add the new orders to the "New Orders" section
        orders.forEach((order) => {
          const orderHTML = `
          <div>
              <span class="order-number">Order Number: </span> ${order.id}
              <span class="customer-id">Customer ID: </span> ${order.customer_id}
              <span class="status">Status: </span> ${order.status}

              <label for="eta">ETA</label>
              <input type="text" name="eta" id="eta"></input>
              <span class="total-amount">Total Amount: </span> ${order.total_amount}

              <button type="submit" id="btn-approve">Approve</button>
              <button type="submit" id="btn-decline">Decline</button>
            </div>
          `;
          newOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        newOrdersDiv.html('<p>No new orders available.</p>');
      }
    })
    .catch((error) => {
      console.error(error);
      newOrdersDiv.html('<p>Failed to fetch orders data.</p>');
    });
};

//accepted orders
const fetchAcceptedOrders = function() {
  return $.ajax({
    url: '/api/ordersQueue/accepted-orders',
    method: 'GET',
    dataType: 'json',
  });
};

// Function to update the HTML content with the fetched orders data
const updateAcceptedOrders = () => {
  const acceptedOrdersDiv = $('.accepted-orders div');

  fetchAcceptedOrders()
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


//accepted orders
const fetchCompletedOrders = function() {
  return $.ajax({
    url: '/api/ordersQueue/completed-orders',
    method: 'GET',
    dataType: 'json',
  });
};

// Function to update the HTML content with the fetched orders data
const updateCompletedOrders = () => {
  const completedOrdersDiv = $('.completed-orders div');

  fetchCompletedOrders()
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
              ETA: ${order.eta_minutes}
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
