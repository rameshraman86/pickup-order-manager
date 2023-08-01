// Client facing scripts here

// Function to fetch the orders data from the server
const fetchOrders = () => {
  return $.ajax({
    url: '/api/orders',
    method: 'GET',
    dataType: 'json',
  });
};

// Function to update the HTML content with the fetched orders data
const updateOrdersContent = () => {
  const newOrdersDiv = $('.new-orders div');

  fetchOrders()
    .done((orders) => {
      if (orders.length > 0) {
        // Clear existing content
        newOrdersDiv.empty();

        // Add the new orders to the "New Orders" section
        orders.forEach((order) => {
          const orderHTML = `
            <p>
              Customer ID: ${order.customer_id}
              Status: ${order.status}
              ETA: ${order.eta_minutes}
              Total Amount: ${order.total_amount}
            </p>
          `;
          newOrdersDiv.append(orderHTML);
        });
      } else {
        // Handle the case when there are no orders
        newOrdersDiv.html('<p>No new orders available.</p>');
      }
    })
    .fail((error) => {
      console.error(error);
      newOrdersDiv.html('<p>Failed to fetch orders data.</p>');
    });
};

// Update the orders content on page load
$(document).ready(() => {
  updateOrdersContent();
});
