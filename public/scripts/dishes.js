// ADD TO HEAD OF EJS
// const fetchDishes = () => {
//   return $.ajax({
//     url: '/api/dishes',
//     method: 'GET',
//     dataType: 'json',
//   })
//     .then(() => {
//       //       //to create a new order when submit button is clicked. this will
//       //       //grab the submit button, total_amount and call the post request api to add a new order.
//       $('#submit-order-button').on('click', function () {
//         data = {
//           total_amount: 2000,
//           order_date: Date.now(),
//         }
//         $.post('/api/dishes/add-new-order', data);
//       })
//     });
// }


// const populateDishes = () => {
//   const showDishes = $('.show-dishes'); //Add to EJS

//   fetchDishes()
//     .then((dishes) => {
//       if (dishes.length > 0) {
//         // Clear existing content
//         showDishes.empty();

//         // Add the new orders to the "New Orders" section
//         dishes.forEach((dish) => {
//           dish.quantity = 0;
//           const dishHTML = `
//           <div>

//               <span class="dish-name">Name: </span> ${dish.name}
//               <span class="dish-description">Description: </span> ${dish.description}
//               <span class="dish-type">Type: </span> ${dish.dish_type}
//               <span class="dish-price">Price: </span> $${dish.price}
//               <span class="dish-rating">Rating: </span> ${dish.rating}
//             <span class="dish-quantity">Quantity: </span>
//             <p class="dish-id-${dish.id}"> ${dish.quantity} </p>
//             <button class="add-to-cart-button" data-dish-id="${dish.id}" dish-q = "${dish.quantity}">Add to Cart</button>
//             <button class="delete-button" data-dish-id="${dish.id}" dish-q = "${dish.quantity}">Delete</button>
//             </div>

//           `;
//           showDishes.append(dishHTML);
//         });
//       } else {
//         // Handle the case when there are no orders
//         showDishes.html('<p>No new orders available.</p>');
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       showDishes.html('<p>Failed to fetch orders data.</p>');
//     });

// };


//function that returns date in (YYYY-MM-DD HH:mm:ss) format
function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}




//Scripts go here to populate divs, make just the divs in the ejs, the fetchdishes is pulling from the api and is routed to the main server
$(document).ready(function () {
  let subtotal = 0;
  // Function to fetch dishes from the API and populate the UI
  // const fetchDishes = () => {
  // return $.ajax({
  //   url: '/api/dishes',
  //   method: 'GET',
  //   dataType: 'json',
  // })
  // .then(() => {
  //   //       //to create a new order when submit button is clicked. this will
  //   //       //grab the submit button, total_amount and call the post request api to add a new order.
  //   $('#submit-order-button').on('click', function () {
  //     data = {
  //       total_amount: 2000,
  //       order_date: Date.now(),
  //     }
  //     $.post('/api/dishes/add-new-order', data);
  //   })
  // });


  const populateDishes = () => {
    const showDishes = $('.show-dishes');

    // fetchDishes()
    return $.ajax({
      url: '/api/dishes',
      method: 'GET',
      dataType: 'json',
    })
      .then((dishes) => {
        if (dishes.length > 0) {
          showDishes.empty();

          dishes.forEach((dish) => {
            dish.quantity = 0;
            const dishHTML = `
              <div class="dish ${dish.id}">
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
      .then(() => {
        //       //to create a new order when submit button is clicked. this will
        //       //grab the submit button, total_amount and call the post request api to add a new order.
        $('#submit-order-button').on('click', function () {
          console.log('submit button pressed');
          data = {
            total_amount: 2001,
            order_date: getCurrentDateTime(),
          }
          $.post('/api/dishes/add-new-order', data);
        })
      })
      .catch((error) => {
        console.error(error);
        showDishes.html('<p>Failed to fetch orders data.</p>');
      });
  }
  // })

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
    let subtotal = 0
    const dishes = $(".dish-quantities")

    for (const dish of dishes) {
      const quantity = $(dish).text();
      const price = $(dish).attr('data-price')
      subtotal += (quantity * price)
    }

    $('#subtotal').text(subtotal.toFixed(2));
  };

  // Event listener for form submission
  // Event listener for form submission
  //Customer id, status pending, eta null, subtotla, date.now function
  // $('.order-form form').on('submit', function (e) {
  //   e.preventDefault();
  //   const phone = $('#phone').val();

  //   // Get the cart items and their quantities
  //   const cartItems = [];
  //   $('.show-dishes').find('.dish').each(function () {
  //     const dishId = $(this).find('.add-to-cart-button').attr('data-dish-id');
  //     const dishQuantity = parseInt($(this).find('.dish-quantity').text());
  //     if (dishQuantity > 0) {
  //       cartItems.push({ dishId, quantity: dishQuantity });
  //     }
  //   });

  //   // Make the API call to submit the order
  //   $.ajax({
  //     url: '/api/ordersQueue',
  //     method: 'POST',
  //     dataType: 'json',
  //     data: { phone, items: cartItems, subtotal: subtotal }, //
  //     success: function (response) {
  //       // Handle success response (e.g., show a success message)
  //       console.log('Order submitted successfully');
  //     },
  //     error: function (error) {
  //       // Handle error response (e.g., show an error message)
  //       console.error('Failed to submit order:', error);
  //     },
  //   });
  // });

  // Initial population of dishes
  populateDishes();
});


//in the dishes.js - a post request to create  a new order in orders table.$.post('/api/dishes/new-order).
//data : {
  // customer_id:
// }pass the customer_id,"Pending acceptance"
//in the api router.post('/new-order') {

//Create new customer id, new order with that customer id

//}
