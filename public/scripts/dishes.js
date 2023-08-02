//ADD TO HEAD OF EJS
const fetchDishes = () => {
  return $.ajax({
    url: '/api/dishes',
    method: 'GET',
    dataType: 'json',
  });
};

const populateDishes = () => {
  const showDishes = $('.show-dishes'); //Add to EJS

  fetchDishes()
    .then((dishes) => {
      if (dishes.length > 0) {
        // Clear existing content
        showDishes.empty();



        // Add the new orders to the "New Orders" section
        dishes.forEach((dish) => {
          dish.quantity = 0;
          const dishHTML = `
          <div>

              <span class="dish-name">Name: </span> ${dish.name}
              <span class="dish-description">Description: </span> ${dish.description}
              <span class="dish-type">Type: </span> ${dish.dish_type}
              <span class="dish-price">Price: </span> $${dish.price}
              <span class="dish-rating">Rating: </span> ${dish.rating}
            <span class="dish-quantity">Quantity: </span>
            <p class="dish-id-${dish.id}"> ${dish.quantity} </p>
            <button class="add-to-cart-button" data-dish-id="${dish.id}" dish-q = "${dish.quantity}">Add to Cart</button>
            <button class="delete-button" data-dish-id="${dish.id}" dish-q = "${dish.quantity}">Delete</button>
            </div>

          `;
          showDishes.append(dishHTML);
        });
      } else {
        // Handle the case when there are no orders
        showDishes.html('<p>No new orders available.</p>');
      }
    })
    .catch((error) => {
      console.error(error);
      showDishes.html('<p>Failed to fetch orders data.</p>');
    });





};


//Scripts go here to populate divs, make just the divs in the ejs, the fetchdishes is pulling from the api and is routed to the main server
$(document).ready(function () {
  let subtotal = 0;
  // Function to fetch dishes from the API and populate the UI
  const fetchDishes = () => {
    return $.ajax({
      url: '/api/dishes',
      method: 'GET',
      dataType: 'json',
    });
  };

  const populateDishes = () => {
    const showDishes = $('.show-dishes');

    fetchDishes()
      .then((dishes) => {
        if (dishes.length > 0) {
          showDishes.empty();

          dishes.forEach((dish) => {
            dish.quantity = 0;
            const dishHTML = `
              <div class="dish">
                <span class="dish-name">Name: </span> ${dish.name}
                <span class="dish-description">Description: </span> ${dish.description}
                <span class="dish-type">Type: </span> ${dish.dish_type}
                <span class="dish-price">Price: </span> ${dish.price}
                <span class="dish-rating">Rating: </span> ${dish.rating}
                <span class="dish-quantity" data-dish-id="${dish.id}" dish-q="${dish.quantity}">Quantity: </span>
                <p class="dish-quantities dish-id-${dish.id}" data-price="${dish.price}"> ${dish.quantity} </p>
                <button class="add-to-cart-button" data-dish-id="${dish.id}" dish-q="${dish.quantity}">Add to Cart</button>
                <button class="delete-button" data-dish-id="${dish.id}" dish-q="${dish.quantity}">Delete</button>
              </div>
            `;
            showDishes.append(dishHTML);
          });
        } else {
          showDishes.html('<p>No new orders available.</p>');
        }
      })
      .catch((error) => {
        console.error(error);
        showDishes.html('<p>Failed to fetch orders data.</p>');
      });
  };

  // Event listener for "Add to Cart" button using event delegation
  $(document).on('click', '.add-to-cart-button', function () {
    const dishId = $(this).attr('data-dish-id');
    const dishQElement = $(`.dish-id-${dishId}`);
    let dishQ = dishQElement.text();
    dishQ = parseInt(dishQ);
    dishQ += 1;
    $(`.dish-id-${dishId}`)[0].innerHTML = dishQ;
    // Calculate subtotal and update the display
    updateSubtotal();
  });

  // Event listener for "Delete" button using event delegation
  $(document).on('click', '.delete-button', function () {
    const dishId = $(this).attr('data-dish-id');
    const dishQElement = $(`.dish-id-${dishId}`);
    let dishQ = dishQElement.text();
    dishQ = parseInt(dishQ);
    if (dishQ > 0) {
      dishQ -= 1;
      console.log(dishQ);
      $(`.dish-id-${dishId}`).text(dishQ);
      // Calculate subtotal and update the display
      updateSubtotal();
    } else {
      alert('Quantity cannot be less than 0');
    }
  });

  // Function to calculate subtotal
  const updateSubtotal = () => {

    // subtotal = 0;

    // // Loop through each dish and calculate the subtotal
    // $('.dish-quantity').each(function () {
    //   const dishId = $(this).attr('data-dish-id');
    //   const dishQuantity = $(this).attr('dish-q');
    //   console.log(this);
    //   console.log(dishQuantity, "dishQuantity");
    //   const dishQ = parseInt($(this).text());
    //   const dishPrice = parseFloat($(`.dish-price[data-dish-id="${dishId}"]`).text().replace('$', ''));

    //   subtotal += dishQ * dishPrice;
    // });

    // // Update the subtotal in the DOM
    // $('#subtotal').text(subtotal.toFixed(2));
    let subtotal = 0
    const dishes = $(".dish-quantities")

    for (const dish of dishes) {
      const quantity = $(dish).text();
      const price = $(dish).attr('data-price')
      subtotal += (quantity * price)
    }

    $('#subtotal').text(subtotal.toFixed(2));
  };

  // Event listener for "Clear Cart" button
  // $('#clear-cart-button').on('click', function () {
  //   $('.dish-quantity').each(function () {
  //     const dishId = $(this).prev('.add-to-cart-button').attr('data-dish-id');
  //     const dishQ = 0; // Set the quantity to 0
  //     $(`.dish-id-${dishId}`).text(dishQ); // Update the quantity in the DOM
  //   });

  //   // Calculate subtotal and update the display
  //   updateSubtotal();
  // });


  // Event listener for form submission
 // Event listener for form submission
$('.order-form form').on('submit', function (e) {
  e.preventDefault();
  const phone = $('#phone').val();

  // Get the cart items and their quantities
  const cartItems = [];
  $('.show-dishes').find('.dish').each(function () {
    const dishId = $(this).find('.add-to-cart-button').attr('data-dish-id');
    const dishQuantity = parseInt($(this).find('.dish-quantity').text());
    if (dishQuantity > 0) {
      cartItems.push({ dishId, quantity: dishQuantity });
    }
  });

  // Make the API call to submit the order
  $.ajax({
    url: '/api/ordersQueue',
    method: 'POST',
    dataType: 'json',
    data: { phone, items: cartItems, subtotal: subtotal.toFixed(2) }, // Include the subtotal in the data object
    success: function (response) {
      // Handle success response (e.g., show a success message)
      console.log('Order submitted successfully');
      // Optionally, you can clear the cart after the order is submitted:
      $('.dish-quantity').text('0');
      // Calculate subtotal and update the display
      updateSubtotal();
    },
    error: function (error) {
      // Handle error response (e.g., show an error message)
      console.error('Failed to submit order:', error);
    },
  });
});


  // Initial population of dishes
  populateDishes();
});


