// Functions that accepts and decline a new order coming to the restaurant

// Function to handle the accept button click
const handleAcceptButtonClick = function(event) {
  event.preventDefault();

  // const $form = $(this).closest('');
  // const orderID = $form.find('.order-number').text().trim();
  // const eta = $form.find('#eta').val();

  // const data = {
  //   order_id: orderID,
  //   eta: eta
  // };


  // Send the POST request to the server
  // $.post('/api/ordersQueue/accept-order', data)
  //   .then(() => {
  //     alert(`Order ${orderID} accepted.`);
  //     // You may also want to update the UI here if needed
  //   })
  //   .catch((err) => {
  //     console.error(`Error accepting order: ${orderID}`, err);
  //   });
};

// Attach the click event handler to the accept buttons
$(document).ready(function() {
  // console.log($('.btn-accept').html());

  // $("#btn-accept").click(function() {
  //   console.log("test");
  // });
});
