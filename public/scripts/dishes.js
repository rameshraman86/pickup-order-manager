

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
  let data = {
    total_amount: 0, // Initialize total_amount to 0
    order_date: getCurrentDateTime(),
  };

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
        //to create a new order when submit button is clicked. this will
        //grab the submit button, total_amount and call the post request api to add a new order.
        $('#submit-order-button').on('click', function (event) {
          event.preventDefault(); // Prevent the default form submission

          console.log('submit button pressed');

          // Get the updated subtotal from the <span> element with id 'subtotal'
          const subtotal = parseFloat($('#subtotal').text());

          // Get the phone number from the input field
          const phoneNumber = $('#phone').val();

          const data = {
            total_amount: subtotal,
            order_date: getCurrentDateTime(),
            phone: phoneNumber, // Include the phone number in the data object
          };

          console.log("data", data);

          $.post('/api/dishes/add-new-order', data)
            .then((data) => {
              //console.log('pre alert ')
              //alert('Your order has been placed! You should receive a text soon.');
              console.log("We made post ajax call and result is ", data.result);
              if(data.result){
                  alert("Your order has been placed");
              } else {
                alert("Your order was not placed. Please try again!");
              }
            })
            .catch((error) => {
              console.error('Error submitting order:', error);
            });
        });

      })
      .catch((error) => {
        console.error(error);
        showDishes.html('<p>Failed to fetch orders data.</p>');
      });
    }

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

  function showNotification(message) {
    const popup = document.getElementById('popup-notification');
    const notificationMessage = document.getElementById('notification-message');

    notificationMessage.textContent = message;
    popup.classList.add('show');

    // Hide the notification after a few seconds (adjust the delay as needed)
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  }


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
